"use client";

import NavBar from "../components/NavBar";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { login } from './actions';
import React from 'react';

export default function LoginPage() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <NavBar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
              Welcome Back!
            </h1>
            <p className="mt-2 text-gray-400">Sign in to continue</p>
          </div>

          <form
            action={login}
            className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800"
            method="post"
          >
            <button
              type="button"
              onClick={() => alert('Google Sign In')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 bg-gray-800/40 text-white font-medium transition-colors"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <span className="relative px-2 text-gray-400 bg-gray-900/70">or continue with</span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-200 text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-200 text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={show ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {show ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded bg-gray-800 border-gray-700" />
                Remember me
              </label>
              <a href="#" className="hover:text-blue-300">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
