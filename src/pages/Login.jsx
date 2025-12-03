import React, { useState } from 'react';
import { IndianRupee, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data, rememberMe);
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-purple-700 flex items-center justify-center p-4 overflow-hidden relative">

      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-[3rem] shadow-2xl overflow-hidden relative z-10 animate-fadeIn transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Left Side - Illustration */}
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 dark:from-pink-600 dark:to-purple-700 p-12 flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
            {/* Logo */}
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <IndianRupee className="w-8 h-8 text-pink-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">PaisaPortfolio</h1>
              </div>
              <p className="text-white text-sm opacity-90">Financial Manager</p>
            </div>

            {/* Illustration Container */}
            <div className="flex-1 flex items-center justify-center animate-float">
              <div className="relative">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-64 h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <IndianRupee className="w-32 h-32 text-white" />
                    </div>
                  </div>
                  <p className="text-white text-2xl font-bold mb-2">Manage Your Finances</p>
                  <p className="text-white opacity-90">Track expenses, save goals, and split bills effortlessly</p>
                </div>
              </div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-600 rounded-full -mb-20 -ml-20 opacity-20"></div>
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-white rounded-full -mr-16 opacity-10"></div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12 flex flex-col justify-center bg-white dark:bg-slate-900 animate-slideInRight transition-colors duration-300 relative">

            {/* Theme Toggle */}
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                {isLogin ? 'Sign in to continue to your financial dashboard' : 'Enter your details to get started'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name Input (Signup Only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 border-2 border-purple-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 dark:hover:border-slate-600"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 border-2 border-purple-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 dark:hover:border-slate-600"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 border-2 border-purple-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 dark:hover:border-slate-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors bg-transparent focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                {isLogin && (
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 text-purple-600 border-2 border-purple-300 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer transition-all"
                      />
                      <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

              </form>

              {/* Toggle Login/Signup */}
              <p className="text-center text-slate-600 dark:text-slate-400 mt-8">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all ml-1"
                >
                  {isLogin ? 'Sign up for free' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        /* Hide default password reveal button in Edge/IE */
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Login;