import { motion } from 'framer-motion';
import { Brain, Target, Heart, Sparkles, Shield, TrendingUp, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 dark:bg-yellow-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
          >
            <Sparkles className="text-cyan-500 dark:text-cyan-400" size={18} />
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">Your Mental Wellness Journey</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            About <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">StressLess</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering you to understand, manage, and overcome stress through 
            science-backed assessments and personalized wellness solutions.
          </p>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { value: '15', label: 'Questions', icon: '📝' },
            { value: '3', label: 'Categories', icon: '📊' },
            { value: '4+', label: 'Remedies', icon: '🌿' },
            { value: '24/7', label: 'AI Support', icon: '🤖' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* What We Do Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              How StressLess Helps You
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              A complete mental wellness toolkit designed for your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Smart Assessment',
                desc: 'Take our scientifically-backed stress test covering medical, financial, and relationship factors',
                color: 'cyan',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: Target,
                title: 'AI-Powered Analysis',
                desc: 'Get personalized insights and recommendations based on your unique stress profile',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Heart,
                title: 'Holistic Remedies',
                desc: 'Access yoga, audio therapy, reading resources, and professional consultation options',
                color: 'rose',
                gradient: 'from-rose-500 to-orange-500'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:shadow-xl shadow-sm"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PSS Info Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
                <Shield size={14} />
                Science-Backed
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                The Perceived Stress Scale
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Our assessment is based on the <strong className="text-cyan-600 dark:text-cyan-400">Perceived Stress Scale (PSS)</strong>, 
                developed in 1983 and widely used by psychologists worldwide. It measures how different 
                situations affect your feelings and perceived stress levels.
              </p>
              <div className="flex flex-wrap gap-3">
                {['0 - Never', '1 - Rarely', '2 - Sometimes', '3 - Often', '4 - Always'].map((opt, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700">
                    {opt}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-black text-slate-900 dark:text-white">PSS</div>
                    <div className="text-cyan-600 dark:text-cyan-400 text-sm">Since 1983</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Why Choose StressLess?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Quick & Easy', desc: 'Complete assessment in under 5 minutes' },
              { icon: Shield, title: 'Private & Secure', desc: 'Your data is encrypted and protected' },
              { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your wellness journey over time' },
              { icon: Users, title: 'Expert Support', desc: 'Connect with mental health professionals' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all shadow-sm"
              >
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <feature.icon className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8 md:p-12"
        >
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            To empower everyone with <span className="text-purple-600 dark:text-purple-400 font-semibold">data-driven stress insights</span> and 
            <span className="text-pink-600 dark:text-pink-400 font-semibold"> personalized wellness strategies</span>. 
            We believe mental health care should be accessible, understandable, and actionable for all.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300">
              ✨ Accessible Care
            </div>
            <div className="px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-700 dark:text-pink-300">
              🧠 Science-Based
            </div>
            <div className="px-6 py-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
              💚 User-Focused
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
