import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, BarChart3, Lightbulb, ArrowRight } from 'lucide-react';

const HomePage = ({ onStartTest }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Immersive Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-slate-50/80 to-slate-50 dark:from-slate-900/40 dark:via-slate-900/80 dark:to-slate-900 z-10" />
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920" 
          alt="Yoga Background" 
          className="w-full h-full object-cover dark:opacity-40 opacity-20"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3rem] p-12 md:p-20 mb-20 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-sm font-black uppercase tracking-[0.3em]"
            >
              Your Journey Starts Here
            </motion.div>
            
            <motion.h2 
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
            >
              FIND YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-gradient-x">INNER CALM</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Experience a breakthrough in mental well-being with our data-driven stress assessment and personalized recovery pathways.
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(234,179,8,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartTest}
              className="group bg-yellow-500 text-slate-900 px-16 py-6 rounded-[2rem] text-2xl font-black transition-all flex items-center gap-4 mx-auto"
            >
              Begin Assessment
              <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
          
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-yellow-500/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-pink-500/30 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
          </div>
        </motion.div>

        {/* How It Works Section */}
        <section>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Our assessment tool uses the Perceived Stress Scale (PSS), the most widely used psychological instrument for measuring stress.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <ClipboardList className="text-blue-400" size={40} />,
                title: "Answer 15 Questions",
                desc: "Quickly respond to simple questions about your feelings and thoughts during the last month."
              },
              {
                icon: <BarChart3 className="text-yellow-400" size={40} />,
                title: "Get Your Score",
                desc: "Your answers generate a stress score from 0-60, identifying your current stress level category."
              },
              {
                icon: <Lightbulb className="text-pink-400" size={40} />,
                title: "Receive Guidance",
                desc: "Get expert-backed tips and personalized remedies to help you manage and reduce stress."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-card rounded-[2rem] p-10 group transition-all"
              >
                <div className="bg-slate-100 dark:bg-slate-900/50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-200 dark:group-hover:bg-slate-900 transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
