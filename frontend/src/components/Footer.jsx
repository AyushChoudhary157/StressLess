import { Activity, User, ArrowLeft, Home } from 'lucide-react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-xl">
              <Activity className="text-yellow-500" size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              STRESS<span className="text-yellow-500">LESS</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs font-medium">
            Your daily companion for mental well-being and stress management.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em]">Legal & Contact</h3>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-yellow-500 transition-colors text-sm font-bold">
              Privacy
            </a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-yellow-500 transition-colors text-sm font-bold">
              Terms
            </a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-yellow-500 transition-colors text-sm font-bold">
              Contact
            </a>
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em]">Follow Our Journey</h3>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-yellow-500 hover:text-white dark:hover:text-slate-900 rounded-2xl transition-all duration-300 text-slate-600 dark:text-slate-300 shadow-lg"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
          &copy; {new Date().getFullYear()} StressLess. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Systems Online</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
