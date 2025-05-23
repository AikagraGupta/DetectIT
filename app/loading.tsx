"use client";


export default function GlobalLoading() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 overflow-hidden pointer-events-none z-50">
        <div
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-loading"
        />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loading {
          animation: loading 1.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
