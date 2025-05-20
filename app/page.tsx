// src/app/page.tsx
import NavBar from './components/NavBar'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <NavBar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center px-6 sm:px-8 lg:px-12">

        {/* Decorative patterned overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 600"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" className="text-gray-700" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#dots)" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Deepfake Detection Suite
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10">
            Protect your media with AI-powered deepfake detection, right in your browser.
          </p>

          {/* Glassmorphic, animated Get Started button */}
          <Link href="/detect-image" className="relative inline-block group">
            {/* animated gradient glow */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
              aria-hidden="true"
            />
            {/* button surface */}
            <span className="relative inline-block px-8 py-4 bg-black/80 backdrop-blur-md rounded-full text-white font-semibold tracking-wide transition-transform duration-300 transform group-hover:scale-105">
              Get Started
            </span>
          </Link>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,0 C600,100 600,100 1200,0 L1200,120 L0,120 Z"
              className="fill-current text-gray-800"
            />
          </svg>
        </div>
      </section>
    </>
  )
}
