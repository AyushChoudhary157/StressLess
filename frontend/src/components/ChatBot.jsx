import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Create axios instance with retry logic
const createChatAxiosInstance = () => {
  const instance = axios.create({
    timeout: 60000, // 60 seconds for AI responses
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (!config._retry) config._retry = 0;

      if (
        config._retry < 2 &&
        (error.code === 'ECONNABORTED' ||
          error.code === 'ETIMEDOUT' ||
          error.message.includes('Network Error') ||
          error.message.includes('timeout'))
      ) {
        config._retry += 1;
        console.log(`Retrying chat request (${config._retry}/2)...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * config._retry));
        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const ChatBot = () => {
  const { currentUser, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: 'Hello! I am CalmBot, your wellness assistant. How can I help you find your calm today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const axiosInstance = createChatAxiosInstance();
      
      // Convert our history format to Gemini format
      const historyForAI = chatHistory.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await axiosInstance.post(`${API_URL}/chat`, {
        message: userMessage.text,
        history: historyForAI
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000,
      });

      setChatHistory(prev => [...prev, { role: 'model', text: response.data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = error.response?.data?.error || "I'm sorry, I'm having a bit of trouble connecting. Please try again in a moment.";
      setChatHistory(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show chatbot if user is logged in
  if (!currentUser) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] glass-card rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-500 flex items-center justify-center text-slate-900 shadow-lg">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight">CalmBot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">AI Wellness Coach</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50 dark:bg-transparent"
            >
              {chatHistory.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white shadow-md ${msg.role === 'user' ? 'bg-blue-500' : 'bg-yellow-500 text-slate-900'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-500/20 text-blue-800 dark:text-blue-100 border border-blue-500/20 rounded-tr-none' 
                        : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-yellow-500 flex items-center justify-center text-slate-900 shadow-md">
                      <Loader2 size={16} className="animate-spin" />
                    </div>
                    <div className="p-4 rounded-3xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10">
              <div className="relative">
                <input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-5 pr-14 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-sm"
                />
                <button 
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 rounded-xl flex items-center justify-center text-slate-900 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${isOpen ? 'bg-rose-500 rotate-90' : 'bg-yellow-500 text-slate-900 shadow-yellow-500/20'}`}
      >
        {isOpen ? <X size={32} /> : (
          <div className="relative">
            <MessageSquare size={32} />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
