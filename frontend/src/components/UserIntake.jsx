import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserIntake = ({ onQuestionsGenerated, onBackHome }) => {
  const { currentUser, token, updateUser } = useAuth();
  const hasProfile = currentUser?.age && currentUser?.gender;
  const submittingRef = useRef(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [userText, setUserText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill if user already has age/gender saved
  useEffect(() => {
    if (currentUser?.age) setAge(String(currentUser.age));
    if (currentUser?.gender) setGender(currentUser.gender);
  }, [currentUser]);

  const suggestions = [
    "I can't sleep well and feel exhausted all day...",
    "I'm constantly stressed about bills and expenses...",
    "My family conflicts are affecting my mental peace...",
  ];

  const handleSubmit = async () => {
    if (submittingRef.current) return;

    if (!hasProfile) {
      if (!age || parseInt(age) < 5 || parseInt(age) > 120) {
        setError('Please enter a valid age.');
        return;
      }
      if (!gender) {
        setError('Please select your gender.');
        return;
      }
    }
    if (userText.trim().length < 20) {
      setError('Please write at least a couple of sentences so we can personalize your assessment.');
      return;
    }

    setLoading(true);
    setError('');
    submittingRef.current = true;

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      // Save age and gender to profile only if not already saved
      if (!hasProfile) {
        await fetch(`${API_URL}/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ age: parseInt(age), gender })
        });

        // Update local user state
        updateUser({ age: parseInt(age), gender });
      }

      const response = await fetch(`${API_URL}/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userResponse: userText })
      });

      if (!response.ok) {
        let errMsg = 'Failed to generate questions';
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch {
          errMsg = `Server error (${response.status}). Ensure backend is running on port 5000.`;
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid response: no questions received');
      }
      onQuestionsGenerated(data.questions, data.primaryCategory, data.keywords, userText);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. The AI service is responding slowly. Please try again.');
      } else {
      console.error('Error generating questions:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      }
    }
    finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
          Before we begin...
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          {hasProfile ? "Tell us what's been on your mind." : "A few quick details, then tell us what's on your mind."}
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 shadow-sm"
      >
        {/* Age & Gender Row - only show if not already saved */}
        {!hasProfile && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
              Age
            </label>
            <input
              type="number"
              min="5"
              max="120"
              value={age}
              onChange={(e) => { setAge(e.target.value); if (error) setError(''); }}
              placeholder="e.g. 22"
              className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 text-[15px] transition-all"
              disabled={loading}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => { setGender(e.target.value); if (error) setError(''); }}
              className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/40 text-[15px] transition-all appearance-none"
              disabled={loading}
            >
              <option value="" className="text-slate-400">Select</option>
              {genderOptions.map(g => (
                <option key={g} value={g} className="text-slate-900 dark:text-white">{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-700/50 my-6" />
          </>
        )}

        {/* Textarea label */}
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
          What's been stressing you?
        </label>

        {/* Textarea */}
        <textarea
          value={userText}
          onChange={(e) => {
            setUserText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Describe what's been stressing you out lately..."
          className="w-full h-40 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 resize-none text-[15px] leading-relaxed transition-all"
          disabled={loading}
        />

        {/* Character count */}
        <div className="flex items-center justify-between mt-2 mb-5">
          <span className={`text-xs ${userText.length >= 20 ? 'text-green-500' : 'text-slate-400'}`}>
            {userText.length < 20 ? `${20 - userText.length} more characters needed` : 'Ready'}
          </span>
        </div>

        {/* Quick suggestions */}
        {userText.length < 10 && (
          <div className="mb-5">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Quick start:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  onClick={() => setUserText(text)}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-yellow-500/10 hover:text-yellow-600 dark:hover:text-yellow-500 border border-slate-200 dark:border-slate-600/50 transition-all"
                >
                  {text.slice(0, 40)}...
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg mb-5"
          >
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || userText.trim().length < 20}
          className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating your assessment...
            </>
          ) : (
            <>
              Generate Assessment
              <Send size={16} />
            </>
          )}
        </button>

        {/* Loading detail */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-slate-400 dark:text-slate-500 text-center mt-3"
          >
            AI is analyzing your concerns and crafting personalized questions...
          </motion.p>
        )}
      </motion.div>

      {/* Privacy note */}
      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-600 mt-6">
        <Lock size={12} />
        Your response is not stored and remains private.
      </p>
    </div>
  );
};

export default UserIntake;
