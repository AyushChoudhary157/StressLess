import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const Signup = ({ onNavigate, onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
      onSignupSuccess();
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      setError(msg);
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle(response);
      onSignupSuccess();
    } catch (err) {
      setError('Failed to sign up with Google: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-10 glass-card rounded-[2.5rem] relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center mb-10 relative z-10">
        <div className="p-3 bg-yellow-500/10 rounded-xl mb-4">
          <UserPlus className="text-yellow-500" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Join StressLess and start your journey</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition"
              placeholder="Enter Your Name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Confirm</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-slate-900 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
        <span className="text-slate-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
      </div>

      <div className="mt-6 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google Sign Up Failed')}
          theme="filled_blue"
          shape="pill"
          width="100%"
          text="signup_with"
        />
      </div>

      <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          className="text-yellow-500 hover:text-yellow-400 font-semibold transition"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default Signup;
