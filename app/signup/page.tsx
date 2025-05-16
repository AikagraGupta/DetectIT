"use client";

import NavBar from "../components/NavBar";
import { FcGoogle } from 'react-icons/fc';
import { signup } from './actions';

export default function SignUpPage() {
  return (
    <>
      <NavBar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Create Your Account
            </h1>
            <p className="mt-2 text-gray-400">Join Detect-It today</p>
          </div>

          <form
            action={signup}
            method="post"
            className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800"
          >
            <button
              type="button"
              onClick={() => alert('Google Sign Up')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 bg-gray-800/40 text-white font-medium transition-colors"
            >
              <FcGoogle size={24} /> Sign up with Google
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <span className="relative px-2 text-gray-400 bg-gray-900/70">
                or continue with
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-200 text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-200 text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Added info text to mirror Login’s extra controls */}
            <p className="text-center text-gray-400 text-sm">
              We’ll never share your email with anyone else.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              Create Account
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-pink-500 hover:text-pink-400">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
