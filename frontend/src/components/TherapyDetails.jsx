import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, CalendarCheck, Music2, BookCopy, BookOpen, Flower2, PlayCircle, ChevronDown, Info, X, Headphones, Volume2, Search, Heart, Stethoscope, AlertCircle } from 'lucide-react';
import { therapiesData } from './data/therapiesData';
import AppointmentSystem from './AppointmentSystem';

// Asana Modal Component - Uses Portal to render at document body level
const AsanaModal = ({ asana, onClose }) => {
  if (!asana) return null;
  
  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl border border-green-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-900/80 hover:bg-red-500 transition-colors text-slate-600 dark:text-white hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Asana Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={asana.image}
            alt={asana.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x300/1e293b/70AD47?text=' + encodeURIComponent(asana.name.split(' ')[0]);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/50 dark:via-slate-900/50 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full">
              {asana.category}
            </span>
          </div>
          
          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white drop-shadow-lg">{asana.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{asana.description}</p>

          {/* Benefits */}
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
            <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
              <span className="text-xl">✨</span> Benefits
            </h4>
            <ul className="space-y-3">
              {asana.benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Practice Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors"
          >
            Got it! 🧘
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Use createPortal to render modal at document body level
  return createPortal(modalContent, document.body);
};

const TherapyDetails = ({ therapyId, onBack }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAsana, setSelectedAsana] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);

  const therapy = therapiesData.find(t => t.id === therapyId);
  const Icon = therapy.icon;
  const filteredSongs = therapyId === 'audio'
    ? therapy.details.songs.filter(song => {
        const term = searchTerm.toLowerCase();
        return (
          song.title.toLowerCase().includes(term) ||
          song.artist.toLowerCase().includes(term) ||
          (song.tags || []).some(tag => tag.toLowerCase().includes(term))
        );
      })
    : [];

  // Special render for Yoga Therapy
  if (therapyId === 'yoga') {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Background Yoga Silhouette */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <svg 
            className="absolute right-[-10%] top-[10%] w-[60%] h-auto opacity-[0.03] dark:opacity-[0.05]" 
            viewBox="0 0 512 512" 
            fill="currentColor"
          >
            <path d="M256 48c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 64c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm-60.7 64h121.4c25.4 0 48.3 15.3 58 38.8l45.2 109.6c3.9 9.5-.6 20.4-10.1 24.3s-20.4-.6-24.3-10.1L347.8 240h-41.6l30.5 123.9c2.2 8.9-3.2 17.9-12.1 20.1s-17.9-3.2-20.1-12.1L271.8 240h-31.6l-32.7 131.9c-2.2 8.9-11.2 14.3-20.1 12.1s-14.3-11.2-12.1-20.1L205.8 240h-41.6l-37.7 98.6c-3.9 9.5-14.8 14.1-24.3 10.1s-14-14.8-10.1-24.3l45.2-109.6c9.7-23.5 32.6-38.8 58-38.8zM208 416c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v48c0 26.5-21.5 48-48 48s-48-21.5-48-48v-48z"/>
          </svg>
          <svg 
            className="absolute left-[-15%] bottom-[5%] w-[50%] h-auto opacity-[0.02] dark:opacity-[0.04] rotate-12" 
            viewBox="0 0 512 512" 
            fill="currentColor"
          >
            <path d="M256 112c30.9 0 56-25.1 56-56S286.9 0 256 0s-56 25.1-56 56 25.1 56 56 56zm-98.7 64c-16.5 0-31.4 10-37.7 25.3L78.5 296c-5.1 12.2.5 26.3 12.7 31.4s26.3-.5 31.4-12.7l28.3-67.7 42.6 102.3-43.2 129.6c-4.4 13.1 2.7 27.3 15.9 31.7s27.3-2.7 31.7-15.9L241.5 368h29l43.6 126.7c4.4 13.2 18.6 20.3 31.7 15.9s20.3-18.6 15.9-31.7L318.5 349.6l42.6-102.3 28.3 67.7c5.1 12.2 19.2 18 31.4 12.7s18-19.2 12.7-31.4l-41.1-94.7c-6.3-15.3-21.2-25.3-37.7-25.3H157.3z"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <div className="relative rounded-[3rem] overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 via-emerald-600/80 to-teal-700/90" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200')] bg-cover bg-center opacity-30" />
            
            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <span className="text-3xl">🧘</span>
                  <span className="text-white font-semibold">Ancient Wisdom • Modern Wellness</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
                  Yoga Therapy
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                  {therapy.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      setActiveSection('asanas');
                      setTimeout(() => {
                        document.getElementById('asana-explorer')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-8 py-4 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    🪷 Explore Asanas
                  </button>
                  <button
                    onClick={() => document.getElementById('why-yoga')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
                  >
                    Learn More ↓
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why Yoga Section */}
          <div id="why-yoga" className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                Why Practice Yoga?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Transform your life with these powerful benefits of regular yoga practice
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapy.details.whyYoga?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all cursor-default"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="p-3 rounded-2xl bg-green-500/10">
                <Lightbulb className="text-green-500" size={28} />
              </span>
              Health Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-green-500/5 border border-green-500/10"
                >
                  <div className="p-2 rounded-xl bg-green-500 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Practice Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">
              📅 Practice Guide by Level
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['beginner', 'intermediate', 'advanced'].map((level, i) => {
                const guide = therapy.details.practiceGuide?.[level];
                const colors = {
                  beginner: { bg: 'from-blue-500 to-cyan-500', badge: 'bg-blue-500' },
                  intermediate: { bg: 'from-purple-500 to-pink-500', badge: 'bg-purple-500' },
                  advanced: { bg: 'from-orange-500 to-red-500', badge: 'bg-orange-500' }
                };
                
                return (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative rounded-3xl overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[level].bg} opacity-10`} />
                    <div className="relative p-6 border border-slate-200 dark:border-slate-700 rounded-3xl">
                      <span className={`inline-block px-3 py-1 ${colors[level].badge} text-white text-xs font-bold rounded-full mb-4 capitalize`}>
                        {level}
                      </span>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Duration</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{guide?.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Frequency</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{guide?.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Focus Areas</p>
                          <p className="text-slate-700 dark:text-slate-300">{guide?.focus}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mb-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-[2rem] p-8 md:p-10 border border-amber-500/20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span>
              Pro Tips for Your Practice
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.quickTips?.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                >
                  <span className="text-amber-500 font-bold text-lg">✦</span>
                  <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explore Asanas Button */}
          <div id="asana-explorer" className="mb-8">
            <button
              onClick={() => setActiveSection(activeSection === 'asanas' ? null : 'asanas')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 rounded-[2rem] text-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-[1.02]"
            >
              <Flower2 size={32} />
              Explore All Yoga Asanas
              <motion.div animate={{ rotate: activeSection === 'asanas' ? 180 : 0 }}>
                <ChevronDown size={28} />
              </motion.div>
            </button>
          </div>

          {/* Asanas Section */}
          <AnimatePresence>
            {activeSection === 'asanas' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 space-y-10">
                  {/* Group asanas by category */}
                  {['Relaxation & Stress Relief', 'Flexibility & Stretching', 'Balance & Focus', 'Strength & Energy', 'Breathing & Meditation'].map((category) => {
                    const categoryAsanas = therapy.details.asanas?.filter(a => a.category === category);
                    if (!categoryAsanas?.length) return null;
                    
                    const categoryEmojis = {
                      'Relaxation & Stress Relief': '🧘',
                      'Flexibility & Stretching': '🌊',
                      'Balance & Focus': '🎯',
                      'Strength & Energy': '💪',
                      'Breathing & Meditation': '🕯️'
                    };
                    
                    return (
                      <div key={category} className="space-y-6">
                        <h3 className="text-2xl font-black text-green-600 dark:text-green-400 flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                          <span className="text-3xl">{categoryEmojis[category]}</span>
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                          {categoryAsanas.map((asana, i) => (
                            <motion.div 
                              key={i}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all cursor-pointer group overflow-hidden"
                              onClick={() => setSelectedAsana(asana)}
                            >
                              {/* Asana Image */}
                              <div className="relative h-44 overflow-hidden">
                                <img 
                                  src={asana.image} 
                                  alt={asana.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x300/1e293b/70AD47?text=' + encodeURIComponent(asana.name.split(' ')[0]);
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    className="p-4 bg-white rounded-full text-green-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
                                  >
                                    <Info size={28} />
                                  </motion.div>
                                </div>
                              </div>
                              
                              {/* Asana Info */}
                              <div className="p-5">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 mb-2">
                                  {asana.name}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{asana.description}</p>
                                <span className="inline-flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-semibold">
                                  <Info size={14} />
                                  View Details
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Asana Modal */}
          <AnimatePresence>
            {selectedAsana && (
              <AsanaModal asana={selectedAsana} onClose={() => setSelectedAsana(null)} />
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

  // Special render for Reading Therapy
  if (therapyId === 'reading') {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Background Book Decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <svg 
            className="absolute right-[-5%] top-[15%] w-[40%] h-auto opacity-[0.03] dark:opacity-[0.05]" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 4.5C8.5 4.5 5.5 5.5 4 7v12c1.5-1.5 4.5-2.5 8-2.5s6.5 1 8 2.5V7c-1.5-1.5-4.5-2.5-8-2.5zM12 15c-2.67 0-5.17.5-7 1.5V8.5c1.38-.83 3.72-1.5 7-1.5s5.62.67 7 1.5v8c-1.83-1-4.33-1.5-7-1.5z"/>
          </svg>
          <svg 
            className="absolute left-[-10%] bottom-[10%] w-[35%] h-auto opacity-[0.02] dark:opacity-[0.04] rotate-12" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <div className="relative rounded-[3rem] overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/80 to-purple-700/90" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200')] bg-cover bg-center opacity-25" />
            
            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <span className="text-3xl">📚</span>
                  <span className="text-white font-semibold">Transform Your Mind • One Page at a Time</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
                  Reading Therapy
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                  {therapy.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      setActiveSection('books');
                      setTimeout(() => {
                        document.getElementById('book-explorer')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    📖 Explore Books
                  </button>
                  <button
                    onClick={() => document.getElementById('why-reading')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
                  >
                    Learn More ↓
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why Reading Section */}
          <div id="why-reading" className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                Why Practice Reading Therapy?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Discover how the simple act of reading can transform your mental wellbeing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapy.details.whyReading?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reading Benefits */}
          <div className="mb-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-[2rem] p-8 md:p-10 border border-blue-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">✨</div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  Key Benefits of Reading
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Science-backed benefits for your mind and soul</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reading Guide by Level */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 text-center">
              📖 Your Reading Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['beginner', 'intermediate', 'advanced'].map((level, index) => {
                const guide = therapy.details.readingGuide?.[level];
                const levelColors = {
                  beginner: 'from-green-500 to-emerald-600',
                  intermediate: 'from-blue-500 to-indigo-600',
                  advanced: 'from-purple-500 to-pink-600'
                };
                const levelIcons = {
                  beginner: '🌱',
                  intermediate: '📚',
                  advanced: '🏆'
                };
                
                return (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${levelColors[level]} p-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{levelIcons[level]}</span>
                        <h3 className="text-xl font-bold text-white capitalize">{level}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Daily Reading</span>
                        <span className="font-bold text-slate-900 dark:text-white">{guide?.time}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Goal</span>
                        <span className="font-bold text-slate-900 dark:text-white">{guide?.books}</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          💡 <strong>Tip:</strong> {guide?.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Reading Tips */}
          <div className="mb-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-[2rem] p-8 md:p-10 border border-amber-500/20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span>
              Pro Tips for Better Reading
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.readingTips?.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                >
                  <span className="text-amber-500 font-bold text-lg">✦</span>
                  <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explore Books Button */}
          <div id="book-explorer" className="mb-8">
            <button
              onClick={() => setActiveSection(activeSection === 'books' ? null : 'books')}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 rounded-[2rem] text-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02]"
            >
              <BookCopy size={32} />
              Explore Book Collection
              <motion.div animate={{ rotate: activeSection === 'books' ? 180 : 0 }}>
                <ChevronDown size={28} />
              </motion.div>
            </button>
          </div>

          {/* Books Section */}
          <AnimatePresence>
            {activeSection === 'books' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                      📚 Curated Book Collection
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Hand-picked books to transform your mindset and reduce stress
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {therapy.details.books?.map((book, i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer group overflow-hidden"
                        onClick={() => window.open(book.readUrl, '_blank')}
                      >
                        {/* Book Cover */}
                        <div className="relative h-52 overflow-hidden">
                          <img 
                            src={book.cover} 
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x300/1e293b/94a3b8?text=' + encodeURIComponent(book.title);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/30 transition-all duration-300 flex items-center justify-center">
                            <motion.div
                              className="px-4 py-2 bg-white rounded-full text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xl flex items-center gap-2"
                            >
                              <BookOpen size={18} />
                              Read Now
                            </motion.div>
                          </div>
                          
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                              📖 Free to Read
                            </span>
                          </div>
                        </div>
                        
                        {/* Book Info */}
                        <div className="p-4">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                            {book.title}
                          </h4>
                          <p className="text-sm text-blue-500 font-semibold mb-2">by {book.author}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{book.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book Modal */}
          <AnimatePresence>
            {selectedBook && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedBook(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-red-500 text-slate-600 dark:text-white hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title}
                    className="w-32 h-48 object-cover rounded-xl mx-auto mb-4 shadow-xl"
                  />
                  <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">{selectedBook.title}</h3>
                  <p className="text-blue-500 dark:text-blue-400 text-center mb-4">by {selectedBook.author}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{selectedBook.description}</p>
                  
                  <button
                    onClick={() => window.open(selectedBook.readUrl, '_blank')}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors"
                  >
                    📖 Start Reading
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

  // Special render for Audio Therapy
  if (therapyId === 'audio') {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Background Audio Wave Decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <svg 
            className="absolute right-[-5%] top-[20%] w-[50%] h-auto opacity-[0.03] dark:opacity-[0.05]" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 3v18M9 6v12M6 9v6M15 6v12M18 9v6M3 11v2M21 11v2"/>
          </svg>
          <svg 
            className="absolute left-[-10%] bottom-[15%] w-[40%] h-auto opacity-[0.02] dark:opacity-[0.04] rotate-12" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <div className="relative rounded-[3rem] overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/90 via-yellow-600/80 to-orange-700/90" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200')] bg-cover bg-center opacity-25" />
            
            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <span className="text-3xl">🎵</span>
                  <span className="text-white font-semibold">Heal Through Sound • Find Your Peace</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
                  Audio Therapy
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                  {therapy.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      setActiveSection('songs');
                      setTimeout(() => {
                        document.getElementById('sound-explorer')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-8 py-4 bg-white text-amber-700 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    🎧 Explore Sounds
                  </button>
                  <button
                    onClick={() => document.getElementById('why-audio')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
                  >
                    Learn More ↓
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why Audio Section */}
          <div id="why-audio" className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                Why Audio Therapy Works
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Discover the science-backed benefits of sound healing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapy.details.whyAudio?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sound Categories */}
          <div className="mb-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-[2rem] p-8 md:p-10 border border-amber-500/20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎼</span>
              Sound Categories
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {therapy.details.soundCategories?.map((cat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-[2rem] p-8 md:p-10 border border-yellow-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">✨</div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  Key Benefits
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Proven effects of audio therapy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Listening Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 text-center">
              ⏰ Daily Listening Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['morning', 'afternoon', 'evening'].map((time, index) => {
                const guide = therapy.details.listeningGuide?.[time];
                const timeColors = {
                  morning: { gradient: 'from-orange-500 to-yellow-500', icon: '🌅' },
                  afternoon: { gradient: 'from-blue-500 to-cyan-500', icon: '☀️' },
                  evening: { gradient: 'from-purple-500 to-indigo-500', icon: '🌙' }
                };
                
                return (
                  <motion.div
                    key={time}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${timeColors[time].gradient} p-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{timeColors[time].icon}</span>
                        <h3 className="text-xl font-bold text-white capitalize">{time}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Duration</span>
                        <span className="font-bold text-slate-900 dark:text-white">{guide?.time}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Type</span>
                        <span className="font-bold text-slate-900 dark:text-white">{guide?.type}</span>
                      </div>
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          💡 <strong>Tip:</strong> {guide?.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Audio Tips */}
          <div className="mb-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-[2rem] p-8 md:p-10 border border-purple-500/20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Pro Tips for Better Listening
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.audioTips?.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                >
                  <span className="text-purple-500 font-bold text-lg">✦</span>
                  <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explore Sounds Button */}
          <div id="sound-explorer" className="mb-8">
            <button
              onClick={() => setActiveSection(activeSection === 'songs' ? null : 'songs')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 rounded-[2rem] text-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-[1.02]"
            >
              <Headphones size={32} />
              Explore Sound Library
              <motion.div animate={{ rotate: activeSection === 'songs' ? 180 : 0 }}>
                <ChevronDown size={28} />
              </motion.div>
            </button>
          </div>

          {/* Sounds Section */}
          <AnimatePresence>
            {activeSection === 'songs' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700">
                  {/* Search and Now Playing */}
                  <div className="mb-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search by title, artist, or mood..."
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {filteredSongs.length} sound{filteredSongs.length !== 1 ? 's' : ''} available
                      </div>
                    </div>

                    {/* Now Playing */}
                    {currentTrack && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-500/30"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center">
                              <Volume2 className="text-white" size={28} />
                            </div>
                            <div>
                              <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">Now Playing</p>
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{currentTrack.title}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{currentTrack.artist}</p>
                            </div>
                          </div>
                          <span className="text-sm font-mono text-slate-500">{currentTrack.duration}</span>
                        </div>
                        <audio 
                          key={currentTrack.title}
                          controls 
                          autoPlay
                          className="w-full rounded-xl"
                          style={{ height: '50px' }}
                        >
                          <source src={currentTrack.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </motion.div>
                    )}
                  </div>

                  {/* Songs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSongs.map((song, i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                          currentTrack?.title === song.title 
                            ? 'bg-amber-500/20 border-amber-500' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:shadow-lg'
                        }`}
                        onClick={() => setCurrentTrack(song)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            currentTrack?.title === song.title 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-slate-100 dark:bg-slate-700 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
                          }`}>
                            <PlayCircle size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{song.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400">{song.duration}</span>
                          <span className="text-xs text-amber-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            Play
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {filteredSongs.length === 0 && (
                      <div className="col-span-2 text-center text-slate-400 py-12">
                        <Music2 size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No sounds match your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

  // Special render for Doctor/Consult Therapy
  if (therapyId === 'doctor') {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Background Medical Decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <svg 
            className="absolute right-[-5%] top-[15%] w-[45%] h-auto opacity-[0.03] dark:opacity-[0.05]" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
          </svg>
          <svg 
            className="absolute left-[-10%] bottom-[10%] w-[40%] h-auto opacity-[0.02] dark:opacity-[0.04] rotate-12" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <div className="relative rounded-[3rem] overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/90 via-rose-600/80 to-red-700/90" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200')] bg-cover bg-center opacity-20" />
            
            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <span className="text-3xl">🩺</span>
                  <span className="text-white font-semibold">Professional Care • Your Well-being Matters</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
                  Consult a Doctor
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                  {therapy.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      document.getElementById('appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-white text-pink-700 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    📅 Book Appointment
                  </button>
                  <button
                    onClick={() => document.getElementById('why-doctor')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
                  >
                    Learn More ↓
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why See a Doctor Section */}
          <div id="why-doctor" className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                Why Seek Professional Help?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Taking care of your mental health is just as important as physical health
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapy.details.whyDoctor?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/10 transition-all group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Warning Signs Section */}
          <div className="mb-12 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-[2rem] p-8 md:p-10 border border-red-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-red-500/20">
                <AlertCircle className="text-red-500" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  When to Seek Help
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Recognize these important signs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.when?.map((sign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-red-200 dark:border-red-900/30"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{sign}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Types of Specialists */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 text-center">
              👨‍⚕️ Types of Mental Health Specialists
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {therapy.details.specialists?.map((specialist, index) => {
                const colors = {
                  pink: 'from-pink-500 to-rose-500',
                  purple: 'from-purple-500 to-indigo-500',
                  blue: 'from-blue-500 to-cyan-500',
                  green: 'from-green-500 to-emerald-500'
                };
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${colors[specialist.color]} p-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{specialist.emoji}</span>
                        <h3 className="text-xl font-bold text-white">{specialist.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-slate-600 dark:text-slate-400">{specialist.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-[2rem] p-8 md:p-10 border border-pink-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">✨</div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  Benefits of Professional Help
                </h2>
                <p className="text-slate-600 dark:text-slate-400">What you can expect from treatment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Consultation Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 text-center">
              📋 Consultation Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['before', 'during', 'after'].map((phase, index) => {
                const guide = therapy.details.consultationGuide?.[phase];
                const phaseColors = {
                  before: { gradient: 'from-blue-500 to-cyan-500', icon: '📝' },
                  during: { gradient: 'from-pink-500 to-rose-500', icon: '💬' },
                  after: { gradient: 'from-green-500 to-emerald-500', icon: '✅' }
                };
                
                return (
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${phaseColors[phase].gradient} p-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{phaseColors[phase].icon}</span>
                        <h3 className="text-xl font-bold text-white">{guide?.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <ul className="space-y-3">
                        {guide?.tips?.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="mb-12 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-[2rem] p-8 md:p-10 border border-purple-500/20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span>
              Tips to Prepare for Your Visit
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapy.details.preparationTips?.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                >
                  <span className="text-purple-500 font-bold text-lg">✦</span>
                  <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Book Appointment Section */}
          <div id="appointment-section" className="mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-[2rem] p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/20">
                  <CalendarCheck className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Book an Appointment</h2>
                  <p className="text-white/80">Choose a specialist to start your recovery journey</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
                <AppointmentSystem />
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Heart className="text-red-500" size={24} />
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Emergency Resources</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              If you're in crisis or having thoughts of self-harm, please reach out immediately:
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              National Crisis Helpline: <span className="text-red-500">988</span> (US) | <span className="text-red-500">9152987821</span> (India - iCall)
            </p>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-[3rem] p-10 md:p-12 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-full" style={{ backgroundColor: therapy.color + '20' }}>
            <Icon size={40} style={{ color: therapy.color }} />
          </div>
          <h2 className="text-4xl font-bold">{therapy.title}</h2>
        </div>

        <p className="text-slate-300 text-lg mb-8">{therapy.description}</p>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              Key Benefits
            </h3>
            <ul className="space-y-3">
              {therapy.details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {therapy.details.techniques && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Techniques</h3>
              <ul className="space-y-3">
                {therapy.details.techniques.map((technique, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{technique}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {therapy.details.poses && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Recommended Poses</h3>
              <ul className="space-y-3">
                {therapy.details.poses.map((pose, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{pose}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {therapy.details.recommendations && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {therapy.details.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {therapy.details.when && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">When to Seek Help</h3>
              <ul className="space-y-3">
                {therapy.details.when.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 mt-1">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {therapy.details.options && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Professional Options</h3>
              <ul className="space-y-3">
                {therapy.details.options.map((option, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-semibold mb-3">Duration & Frequency</h3>
            <p className="text-slate-300">{therapy.details.duration}</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Helpful Tips</h3>
            <ul className="space-y-3">
              {therapy.details.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <span className="text-yellow-500 mt-1">★</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default TherapyDetails;