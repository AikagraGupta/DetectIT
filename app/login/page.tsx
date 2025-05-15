"use client";

import NavBar from "../components/NavBar";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { login } from './actions'

export default function LoginPage() {
  // Removed all useState declarations
  
  return (
    <>
      <NavBar />
      <section className="min-h-screen flex bg-gradient-to-br from-white via-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="m-auto w-full max-w-lg">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
              Welcome Back!
            </h1>
            <p className="text-gray-400">Sign in to continue your journey</p>
          </div>

          <form className="mx-auto w-full bg-gray-900/70 rounded-2xl p-8 space-y-6 shadow-xl backdrop-blur-sm border border-gray-800">
            <button
              type="button"
              onClick={() => alert('Google Sign In')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 bg-gray-800/40 text-white font-medium transition-colors"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-gray-900/70">or continue with</span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-gray-200 text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-gray-800 transition-all duration-200"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-gray-200 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-gray-800 transition-all duration-200 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  <FiEye size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 rounded" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              formAction={login}
              className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}