import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xl font-bold text-white group-hover:text-primary transition-colors">
            DevHub<span className="text-[#5dfeca]">.io</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            href="/events" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Explore
          </Link>
          <Link 
            href="/dashboard/events" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          
          {/* Call to Action Button */}
          <Link 
            href="#" 
            className="hidden sm:block px-4 py-2 text-xs font-mono font-bold text-black bg-[#5dfeca] rounded hover:bg-[#4ddub9] transition-transform hover:scale-105"
          >
            + SUBMIT EVENT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;