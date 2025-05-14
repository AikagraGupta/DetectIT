"use client";

import { useState } from "react";
import NavBar from "../components/NavBar";
import { FcGoogle } from 'react-icons/fc';
import { signup } from './actions'

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError("All fields are required.");
    } else if (password !== confirm) {
      setError("Passwords do not match.");
    } else {
      alert(`Registering user: ${email}`);
    }
  };

  return (
    <>
      <NavBar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto p-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 inline-block">
              Join Detect-It Today
            </h1>
            <p className="mt-4 text-gray-400">Create your account and start exploring</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800">
            <button
              type="button"
              onClick={() => alert('Google Sign Up')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 bg-gray-800/40 text-white font-medium transition-colors"
            >
              <FcGoogle size={24} />
              Sign up with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-gray-900/70">or continue with</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-200 text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-200 text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm" className="block text-gray-200 text-sm font-medium">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              formAction={signup}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-pink-500/25"
            >
              Create Account
            </button>
            
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-pink-500 hover:text-pink-400 transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
