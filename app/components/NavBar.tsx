"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const items = [
    { text: "Detect Image", href: "/detect-image" },
    { text: "Detect Video", href: "/detect-video" },
    { text: "Login", href: "/login" },
    { text: "Sign Up", href: "/signup" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-6">
        <Link
          href="/"
          className="text-white text-2xl font-bold hover:text-green-400 transition-colors duration-200"
        >
          Detect-It
        </Link>
        <nav className="flex space-x-8 text-base">
          {items.map(({ text, href }) => {
            const isActive = pathname === href;
            const linkClasses = `relative group transition-colors duration-200 ${
              isActive
                ? "text-white hover:text-white"
                : "text-gray-400 hover:text-white"
            }`;
            
            return (
              <Link key={href} href={href} className={linkClasses}>
                {text}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}