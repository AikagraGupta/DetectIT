import React from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function GetStartedPage() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400 mb-6">
          Get Started with Detect-It
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8">
          Follow our step-by-step guide to integrate Detect-It into your workflow, protect your content,
          and build trust with your audience.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-teal-400 to-green-300 text-black hover:scale-105 transform transition"
        >
          Create Your Account
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to hit the ground running with our cutting-edge detection platform.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-teal-300 mb-3">Easy Integration</h3>
            <p className="text-gray-400">
              Integrate Detect-It with a few lines of code. SDKs and APIs designed for all major platforms.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-teal-300 mb-3">Real-Time Monitoring</h3>
            <p className="text-gray-400">
              Get instant alerts whenever suspicious activity is detected in your media streams.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-teal-300 mb-3">Scalable & Secure</h3>
            <p className="text-gray-400">
              Built on enterprise-grade infrastructure to scale with your needs while keeping data secure.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
