import NavBar from './components/NavBar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center pt-28 px-6 sm:px-8 lg:px-12">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400 mb-4">
          Deepfake Detection Suite
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
          Protect your media with state-of-the-art AI-powered deepfake detection, right in your browser.
        </p>
        {/* Simplified hover effect: scale and brightness only, no overlay */}
        <Link href="/get-started" className="relative inline-block group">
          <span className="block px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-black font-bold tracking-wide transition-transform duration-300 transform group-hover:scale-105 group-hover:brightness-110">
            Get Started
          </span>
        </Link>
      </section>
    </>
  );
}
