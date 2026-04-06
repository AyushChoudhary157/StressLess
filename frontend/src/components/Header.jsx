import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, ArrowLeft, Home, LogOut, Info, ChevronDown, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ currentPage, onNavigate, showBackButton, onBack }) => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('home');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const NavButton = ({ label, page, icon: Icon }) => (
    <button 
      onClick={() => onNavigate(page)}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        currentPage === page 
          ? 'bg-yellow-500 text-slate-900 font-bold shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      {Icon && <Icon size={18} className={currentPage === page ? 'text-slate-900' : 'text-slate-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-500'} />}
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="p-2 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
            <Activity className="text-yellow-500" size={28} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
            STRESS<span className="text-yellow-500">LESS</span>
          </h1>
        </button>

        {/* Navigation Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {!showBackButton && currentPage !== 'test' && (
            <nav className="hidden md:flex items-center gap-2">
              <NavButton label="Home" page="home" icon={Home} />
              <NavButton label="Remedies" page="remedies" icon={Activity} />
              <NavButton label="About" page="about" icon={Info} />
            </nav>
          )}

          {showBackButton && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-slate-700 transition-all font-bold text-sm shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              <ArrowLeft size={18} />
              <span>Back to Remedies</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-yellow-500 transition-all border border-slate-200 dark:border-white/5"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Section */}
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2 hidden md:block" />

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1 pr-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full border border-slate-200 dark:border-white/5 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold overflow-hidden shadow-lg border-2 border-slate-100 dark:border-slate-900">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || <User size={18} />
                  )}
                </div>
                <span className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white truncate max-w-[100px]">
                  {currentUser.displayName?.split(' ')[0] || currentUser.email.split('@')[0]}
                </span>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
                    className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3 z-50 overflow-hidden"
                  >
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 mb-2 bg-slate-50 dark:bg-white/5">
                      <p className="text-[10px] text-yellow-500 uppercase font-black tracking-[0.2em] mb-2">Member Account</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white truncate leading-tight">
                        {currentUser.displayName || 'Guest User'}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    
                    <div className="px-2">
                      <button
                        onClick={() => {
                          onNavigate('dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-black rounded-2xl group"
                      >
                        <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                          <LayoutDashboard size={18} className="text-yellow-500" />
                        </div>
                        My Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black rounded-2xl group"
                      >
                        <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                          <LogOut size={18} />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black rounded-full transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
