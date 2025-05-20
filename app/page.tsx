"use client";

import NavBar from './components/NavBar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>  
      <NavBar />

      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden px-4 sm:px-6 lg:px-8">

        {/* Animated blob backgrounds for depth */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-72 h-72 bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
          <div className="w-72 h-72 bg-green-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
          <div className="w-72 h-72 bg-pink-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
        </div>

        {/* Hero content container */}
        <div className="relative z-10 max-w-xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 mb-4">
            Deepfake Detection Suite
          </h1>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 leading-relaxed">
            Protect your media with AI-powered deepfake detection, right in your browser.
          </p>

          {/* CTA Button */}
          <Link href="/detect-image" className="inline-block group">
            <span className="block px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold uppercase tracking-wide shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
              Get Started
            </span>
          </Link>
        </div>

        {/* Custom blob keyframe animations */}
        <style jsx global>{`  
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 8s infinite;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </section>
    </>
  );
}
