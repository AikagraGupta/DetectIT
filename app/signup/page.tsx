'use client';
import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md sm:max-w-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
            Create Your Detect-It Account
          </h2>
          <form className="space-y-5">
            {[
              { id: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe' },
              { id: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' },
              { id: 'password', type: 'password', label: 'Password', placeholder: '••••••••' },
              { id: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: '••••••••' }
            ].map(({ id, type, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm text-gray-400 mb-1">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-green-300 hover:text-green-400 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}