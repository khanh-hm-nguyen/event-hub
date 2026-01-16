import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <span className="text-2xl font-black text-white tracking-tighter uppercase transition-colors group-hover:text-white/90">
        Event<span className="text-[#5dfeca] drop-shadow-[0_0_8px_rgba(93,254,202,0.5)]">Hub</span>
      </span>
    </Link>
  );
};

export default Logo;