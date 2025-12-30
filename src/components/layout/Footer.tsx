import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-gray-400">
            &copy; {currentYear} DevHub. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <Link href="/about" className="hover:text-[#5dfeca] transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[#5dfeca] transition-colors">
            Privacy Policy
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;