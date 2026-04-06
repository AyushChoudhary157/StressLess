import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StressTest = ({ questions, currentQuestion, onAnswerSelect, onBackHome }) => {
  const options = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 },
    { label: "Always", value: 4 }
  ];

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Progress Bar Container */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-yellow-600 dark:text-yellow-500 font-bold text-lg">Question {currentQuestion + 1}</span>
            <span className="text-slate-400 dark:text-slate-500 ml-2">of {questions.length}</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 p-1 border border-slate-300 dark:border-slate-700 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 h-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden"
        >
          {/* Decorative background number */}
          <div className="absolute top-[-20%] right-[-5%] text-[15rem] font-bold text-slate-900/5 dark:text-white/5 pointer-events-none select-none">
            {currentQuestion + 1}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight relative z-10 text-slate-900 dark:text-white">
            {questions[currentQuestion].text}
          </h2>

          <div className="space-y-4 relative z-10">
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswerSelect(option.value)}
                className="w-full text-left bg-white dark:bg-slate-900/40 hover:bg-yellow-500 group p-6 rounded-2xl transition-all border border-slate-200 dark:border-slate-700 hover:border-transparent flex items-center justify-between shadow-lg"
              >
                <span className="text-xl font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 transition-colors">
                  {option.label}
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-900/30 flex items-center justify-center transition-colors">
                  <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-slate-900 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StressTest;