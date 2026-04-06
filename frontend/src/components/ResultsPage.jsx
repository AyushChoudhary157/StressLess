import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TherapyCard from './TherapyCard';
import { therapiesData } from './data/therapiesData';
import { RefreshCcw, TrendingUp, ShieldCheck, AlertCircle, HeartPulse, Wallet, Users, CheckCircle2, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Create axios instance with retry logic
const createResultsAxiosInstance = () => {
  const instance = axios.create({
    timeout: 60000, // 60 seconds for AI analysis
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
        console.log(`Retrying results request (${config._retry}/2)...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * config._retry));
        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const ResultsPage = ({ stressScore, categoricalScores, resultId, savedAnalysis, onRetakeTest, onSelectTherapy, onNavigate }) => {
  const { token } = useAuth();
  const [aiAnalysis, setAiAnalysis] = useState(savedAnalysis || '');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(null);
  // Track the last resultId we processed to detect new assessments
  const [lastProcessedResultId, setLastProcessedResultId] = useState(resultId);

  // Function to fetch AI analysis - can be called for initial fetch or regeneration
  const fetchAIAnalysis = async (forceRegenerate = false) => {
    if (!token) {
      setAiError('Please log in to get AI analysis');
      return;
    }
    if (!resultId) {
      setAiError('Waiting for result to be saved...');
      return;
    }
    
    setLoadingAI(true);
    setAiError(null);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const axiosInstance = createResultsAxiosInstance();
      const { level } = getStressLevel(stressScore);
      
      console.log("Fetching AI Analysis for result:", resultId, "Force regenerate:", forceRegenerate);
      
      const response = await axiosInstance.post(`${API_URL}/ai-analysis`, {
        score: stressScore,
        categoricalScores,
        level,
        resultId,
        forceRegenerate // Tell backend to regenerate even if cached
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 90000, // 90 seconds for AI generation
      });
      
      if (response.data.analysis) {
        setAiAnalysis(response.data.analysis);
        setAiError(null);
      } else {
        setAiError('AI returned empty response. Click regenerate to try again.');
      }
    } catch (err) {
      console.error("Failed to fetch AI analysis:", err);
      setAiError(err.response?.data?.error || 'Failed to generate AI analysis. Click regenerate to try again.');
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    // Check if this is a NEW assessment (different resultId than last time)
    const isNewAssessment = resultId && resultId !== lastProcessedResultId;
    
    // If this is a new assessment, clear old analysis and fetch new one
    if (isNewAssessment) {
      console.log("New assessment detected! Old ID:", lastProcessedResultId, "New ID:", resultId);
      setAiAnalysis(''); // Clear old analysis
      setAiError(null);
      setLastProcessedResultId(resultId);
      
      // If there's a saved analysis for this result (viewing from history), use it
      if (savedAnalysis) {
        setAiAnalysis(savedAnalysis);
        return;
      }
      
      // Otherwise fetch new analysis
      fetchAIAnalysis(false);
      return;
    }
    
    // If we have a saved analysis from props (viewing history), use it
    if (savedAnalysis && !aiAnalysis) {
      setAiAnalysis(savedAnalysis);
      setLastProcessedResultId(resultId);
      return;
    }

    // If we already have an analysis for this result, don't fetch again
    if (aiAnalysis) return;

    // If we don't have a resultId yet (waiting for DB save), wait
    if (!resultId) return;

    // First time loading with a resultId - fetch AI analysis
    setLastProcessedResultId(resultId);
    fetchAIAnalysis(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultId, savedAnalysis]);
  const getStressLevel = (score, max = 120) => {
    if (score <= 30) return { 
      level: 'Low Stress', 
      color: 'text-green-500', 
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      icon: <ShieldCheck className="text-green-500" size={48} />,
      message: 'Great job! You are managing stress well.',
      recommendations: [
        "Maintain healthy routine",
        "Light exercise / walking",
        "Balanced sleep",
        "Journaling"
      ]
    };
    if (score <= 60) return { 
      level: 'Mild Stress', 
      color: 'text-blue-400', 
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
      icon: <ShieldCheck className="text-blue-400" size={48} />,
      message: 'You are experiencing mild stress.',
      recommendations: [
        "Daily breathing exercises",
        "Reduce screen time",
        "Talk with trusted person",
        "Time-management techniques"
      ]
    };
    if (score <= 90) return { 
      level: 'Moderate Stress', 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      icon: <TrendingUp className="text-yellow-500" size={48} />,
      message: 'You are experiencing moderate stress.',
      recommendations: [
        "Guided meditation / yoga",
        "Lifestyle changes",
        "Stress-relief activities",
        "Counseling (optional)"
      ]
    };
    return { 
      level: 'High Stress', 
      color: 'text-red-500', 
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      icon: <AlertCircle className="text-red-500" size={48} />,
      message: 'You are experiencing high stress.',
      recommendations: [
        "Professional counseling recommended",
        "Medical consultation (if physical symptoms)",
        "Emotional support system",
        "Structured stress-management"
      ]
    };
  };

  const getCategoryLevel = (score, max = 20) => {
    const lowThreshold = max / 3;
    const mediumThreshold = (2 * max) / 3;

    if (score <= lowThreshold) {
      return {
        level: 'Low',
        color: 'text-green-500',
        bg: 'bg-green-500/10'
      };
    }

    if (score <= mediumThreshold) {
      return {
        level: 'Medium',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10'
      };
    }

    return {
      level: 'High',
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    };
  };

  const { level, color, bg, icon, message, recommendations } = getStressLevel(stressScore, 60);

  const breakdown = [
    { 
      id: 'medical', 
      label: 'Medical Stress', 
      score: categoricalScores?.medical || 0, 
      icon: <HeartPulse size={24} />,
      color: 'text-rose-400',
      accent: 'bg-rose-400/10'
    },
    { 
      id: 'financial', 
      label: 'Financial Stress', 
      score: categoricalScores?.financial || 0, 
      icon: <Wallet size={24} />,
      color: 'text-emerald-400',
      accent: 'bg-emerald-400/10'
    },
    { 
      id: 'relationship', 
      label: 'Relationship Stress', 
      score: categoricalScores?.relationship || 0, 
      icon: <Users size={24} />,
      color: 'text-sky-400',
      accent: 'bg-sky-400/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-[3rem] p-12 mb-20 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-10 text-slate-900 dark:text-white">Your Assessment Results</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
            {/* Score Circle */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={553}
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * stressScore) / 60 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={color}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-slate-900 dark:text-white">{stressScore}</span>
                <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs">Total</span>
              </div>
            </div>

            <div className="text-left flex-1">
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${bg} ${color} font-bold mb-4`}>
                {icon}
                <span className="text-2xl">{level}</span>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Your overall stress assessment indicates a <strong>{level.toLowerCase()}</strong> profile. 
                Below is a detailed breakdown of your stress across key areas of life.
              </p>
              
              {/* Category Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {breakdown.map((cat) => {
                  const catData = getCategoryLevel(cat.score, 20); // 5 questions * 4 = 20 max per category
                  return (
                    <motion.div 
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl ${cat.accent} ${cat.color}`}>
                          {cat.icon}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{cat.label}</h4>
                      </div>
                      
                      <div className="flex items-end justify-between mb-2">
                        <span className={`text-xs font-black uppercase tracking-wider ${catData.color}`}>
                          {catData.level}
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{cat.score}<span className="text-xs text-slate-400 dark:text-slate-500">/20</span></span>
                      </div>
                      
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.score / 20) * 100}%` }}
                          className={`h-full ${catData.color.replace('text', 'bg')}`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Personalized Recommendations */}
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 mb-10 overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Sparkles className="text-yellow-500" />
                    AI-Powered Review
                  </h4>
                  <div className="flex items-center gap-3">
                    {loadingAI && <Loader2 className="animate-spin text-yellow-500" size={20} />}
                    {!loadingAI && aiAnalysis && (
                      <button
                        onClick={() => fetchAIAnalysis(true)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 transition-colors font-semibold flex items-center gap-1"
                        title="Regenerate AI analysis"
                      >
                        <RefreshCcw size={14} />
                        Regenerate
                      </button>
                    )}
                  </div>
                </div>

                {loadingAI ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Generating personalized review...</p>
                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-full w-3/4 animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-full w-full animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-full w-2/3 animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-full w-5/6 animate-pulse" />
                  </div>
                ) : aiAnalysis ? (
                  <div className="text-left whitespace-pre-wrap text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {aiAnalysis}
                  </div>
                ) : aiError ? (
                  <div className="text-center py-6">
                    <AlertCircle className="mx-auto mb-3 text-red-400" size={32} />
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{aiError}</p>
                    <button
                      onClick={() => fetchAIAnalysis(false)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                      <RefreshCcw size={16} />
                      Generate AI Review
                    </button>
                  </div>
                ) : !resultId ? (
                  <div className="text-center py-6">
                    <Loader2 className="animate-spin mx-auto mb-3 text-yellow-500" size={32} />
                    <p className="text-slate-500 dark:text-slate-400">Saving your results...</p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Click below to get your personalized AI review</p>
                    <button
                      onClick={() => fetchAIAnalysis(false)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Sparkles size={16} />
                      Generate AI Review
                    </button>
                  </div>
                )}
                
                {/* Background Sparkle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 blur-[50px] pointer-events-none rounded-full" />
              </div>

              <button
                onClick={onRetakeTest}
                className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold transition border border-slate-300 dark:border-slate-700"
              >
                <RefreshCcw size={20} />
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
        
        {/* Background glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] opacity-20 pointer-events-none ${bg}`} />
      </motion.div>

      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-white">Find Your Calm</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Recommended remedies tailored to your stress level</p>
          </div>
          <button 
            onClick={() => onNavigate('remedies')}
            className="text-yellow-600 dark:text-yellow-500 font-bold flex items-center gap-2 hover:underline"
          >
            Explore All Remedies
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapiesData.map((therapy, index) => (
            <motion.div
              key={therapy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <TherapyCard
                therapy={therapy}
                onExplore={() => onSelectTherapy(therapy.id)}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;