import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  User, 
  ChevronRight, 
  Activity,
  HeartPulse,
  Wallet,
  Users,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

// Create axios instance with enhanced configuration for network reliability
const createAxiosInstance = () => {
  const instance = axios.create({
    timeout: 30000, // 30 seconds timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor with retry logic
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;

      // If no retry attempt has been made yet
      if (!config._retry) {
        config._retry = 0;
      }

      // Retry up to 3 times on network errors
      if (
        config._retry < 3 &&
        (error.code === 'ECONNABORTED' ||
          error.code === 'ETIMEDOUT' ||
          error.message.includes('Network Error') ||
          error.message.includes('timeout'))
      ) {
        config._retry += 1;
        console.log(`Retrying request (${config._retry}/3)...`);
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * config._retry));
        
        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const Dashboard = ({ onViewResult }) => {
  const { currentUser, token } = useAuth();
  const { isDarkMode } = useTheme();
  const [history, setHistory] = useState({ results: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(false);
  const [view, setView] = useState('overview'); // 'overview', 'tests', 'appointments'
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setError(null);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const axiosInstance = createAxiosInstance();
        
        const response = await axiosInstance.get(`${API_URL}/history`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 30000,
        });
        
        setHistory(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.message || 'Failed to load data. Please check your connection.');
        // Set empty data on error to prevent crashes
        setHistory({ results: [], appointments: [] });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && token) {
      fetchHistory();
    }
  }, [currentUser, token]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score) => {
    if (score <= 30) return 'text-green-500';
    if (score <= 60) return 'text-blue-400';
    if (score <= 90) return 'text-yellow-500';
    return 'text-red-500';
  };

  const graphData = [...history.results].reverse().map(r => ({
    date: formatDate(r.timestamp),
    score: r.score,
    medical: r.categoricalScores?.medical || 0,
    financial: r.categoricalScores?.financial || 0,
    relationship: r.categoricalScores?.relationship || 0,
  }));

  // Debug: Log the graph data
  console.log("Graph data:", graphData);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Connection Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Navigation / Back Button */}
      {view !== 'overview' && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView('overview')}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <ArrowLeft size={18} />
          Back to Overview
        </motion.button>
      )}

      {/* Header Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2.5rem] p-8 mb-10 flex flex-col md:flex-row items-center gap-8 border border-slate-200 dark:border-white/10"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 shadow-2xl">
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900" />
          ) : (
            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl font-black text-slate-900 dark:text-white border-4 border-white dark:border-slate-900">
              {currentUser?.displayName?.charAt(0) || <User size={48} />}
            </div>
          )}
        </div>
        <div className="text-center md:text-left flex-grow">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-1">{currentUser?.displayName || 'Wellness Seeker'}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">{currentUser?.email}</p>
          {(currentUser?.age || currentUser?.gender) && (
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
              {currentUser?.gender}{currentUser?.age && currentUser?.gender ? ', ' : ''}{currentUser?.age ? `${currentUser.age} years old` : ''}
            </p>
          )}
          {!currentUser?.age && !currentUser?.gender && <div className="mb-4" />}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => setView('tests')}
              className={`bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl transition-all text-left group ${view === 'tests' ? 'ring-2 ring-yellow-500 bg-yellow-500/10' : 'hover:bg-yellow-500/10 hover:border-yellow-500/30'}`}
            >
              <span className="text-xs text-slate-500 block uppercase font-bold tracking-widest group-hover:text-yellow-500 transition-colors">Tests Taken</span>
              <span className="text-xl font-black text-yellow-500">{history.results.length}</span>
            </button>
            <button 
              onClick={() => setView('appointments')}
              className={`bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl transition-all text-left group ${view === 'appointments' ? 'ring-2 ring-blue-500 bg-blue-500/10' : 'hover:bg-blue-500/10 hover:border-blue-500/30'}`}
            >
              <span className="text-xs text-slate-500 block uppercase font-bold tracking-widest group-hover:text-blue-400 transition-colors">Appointments</span>
              <span className="text-xl font-black text-blue-400">{history.appointments.length}</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            {/* Assessment History Preview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <Activity className="text-yellow-500" />
                  Recent Assessments
                </h3>
                <button onClick={() => setView('tests')} className="text-yellow-600 dark:text-yellow-500 text-xs font-bold uppercase hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {history.results.length === 0 ? (
                  <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-slate-200 dark:border-white/10">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">No assessments attended yet.</p>
                  </div>
                ) : (
                  history.results.slice(0, 3).map((result) => (
                    <div key={result.id} onClick={() => onViewResult(result)} className="glass-card rounded-[2rem] p-6 hover:bg-yellow-500/5 cursor-pointer transition-all border border-slate-200 dark:border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 ${getScoreColor(result.score)}`}>
                            <span className="text-2xl font-black leading-none">{result.score}</span>
                            <span className="text-[10px] font-bold uppercase mt-1">Score</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className={`text-sm font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 ${getScoreColor(result.score)}`}>
                                {result.level} Stress
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(result.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 dark:text-slate-700" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar Preview */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <Clock className="text-blue-400" />
                Next Appointment
              </h3>
              {history.appointments.length > 0 ? (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-5 rounded-3xl shadow-sm">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-1">{history.appointments[0].doctorName}</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">{history.appointments[0].slot}</p>
                </div>
              ) : (
                <div className="glass-card rounded-3xl p-8 text-center border-dashed border-2 border-slate-200 dark:border-white/10">
                  <p className="text-slate-500 dark:text-slate-500 text-sm">No bookings.</p>
                </div>
              )}
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowGraph(true)}
                className="cursor-pointer bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 border border-yellow-500/20 rounded-3xl p-6"
              >
                <h4 className="text-yellow-600 dark:text-yellow-500 font-black mb-2 flex items-center gap-2"><TrendingUp size={18} /> Progress</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs">View your stress trends over time.</p>
              </motion.div>
            </div>
          </motion.div>
        ) : view === 'tests' ? (
          <motion.div
            key="tests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Activity className="text-yellow-500" />
              All Test Assessments
            </h3>
            {history.results.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-slate-200 dark:border-white/10">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No assessments found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.results.map((result) => (
                  <div key={result.id} onClick={() => onViewResult(result)} className="glass-card rounded-[2rem] p-6 hover:bg-yellow-500/5 cursor-pointer border border-slate-200 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 ${getScoreColor(result.score)}`}>
                          <span className="text-2xl font-black leading-none">{result.score}</span>
                        </div>
                        <div>
                          <span className={`text-sm font-black uppercase tracking-widest ${getScoreColor(result.score)}`}>{result.level} Stress</span>
                          <p className="text-xs text-slate-500">{new Date(result.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-400 dark:text-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Clock className="text-blue-400" />
              Your Appointments
            </h3>
            {history.appointments.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-slate-200 dark:border-white/10">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No appointments found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {history.appointments.map((appt) => (
                  <div key={appt.id} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] shadow-sm">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{appt.doctorName}</h4>
                    <p className="text-yellow-600 dark:text-yellow-500 font-bold text-sm mb-4">{appt.slot}</p>
                    <span className="px-4 py-1 bg-green-500/10 text-green-600 dark:text-green-500 rounded-full text-xs font-bold border border-green-500/20">{appt.status}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Graph Modal */}
      <AnimatePresence>
        {showGraph && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-white dark:bg-slate-800 glass-card rounded-[3rem] p-8 md:p-12 relative border border-slate-200 dark:border-white/10"
            >
              <button 
                onClick={() => setShowGraph(false)}
                className="absolute top-8 right-8 p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Stress Level Trends</h3>
                <p className="text-slate-500 dark:text-slate-400">Visualizing your last {history.results.length} assessments</p>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff10" : "#00000010"} vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 120]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
                        border: isDarkMode ? '1px solid #ffffff10' : '1px solid #00000010',
                        borderRadius: '16px',
                        color: isDarkMode ? '#fff' : '#000'
                      }}
                      itemStyle={{ color: '#eab308' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#eab308" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Avg Score</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    {Math.round(graphData.reduce((acc, curr) => acc + curr.score, 0) / (graphData.length || 1))}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Peak Stress</span>
                  <span className="text-xl font-black text-rose-500">
                    {Math.max(...graphData.map(d => d.score), 0)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Current</span>
                  <span className="text-xl font-black text-emerald-500">
                    {graphData[graphData.length - 1]?.score || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
