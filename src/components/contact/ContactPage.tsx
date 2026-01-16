"use client";

import { Mail, ChatBubbleOutline, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
  const contactMethods = [
    { 
      icon: <Mail fontSize="large" />, 
      title: "Email Us", 
      detail: "hello@eventhub.com", 
      sub: "Average response: 2h",
      color: "text-[#5dfeca]",
      bg: "group-hover:bg-[#5dfeca]/10"
    },
    { 
      icon: <ChatBubbleOutline fontSize="large" />, 
      title: "Community Discord", 
      detail: "discord.gg/eventhub", 
      sub: "Live support available",
      color: "text-indigo-400",
      bg: "group-hover:bg-indigo-400/10"
    },
    { 
      icon: <LocationOn fontSize="large" />, 
      title: "Main Headquarters", 
      detail: "Tech Plaza, San Francisco", 
      sub: "Global Operations",
      color: "text-rose-400",
      bg: "group-hover:bg-rose-400/10"
    },
  ];

  return (
    <div className="relative pb-32">
      {/* --- Header --- */}
      <div className="text-center max-w-2xl mx-auto pt-24 space-y-4">
        <h2 className="text-[10px] font-black text-[#5dfeca] uppercase tracking-[0.5em]">
          Support Center
        </h2>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          Get in <span className="text-[#5dfeca]">Touch.</span>
        </h1>
        <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto leading-relaxed">
          Need help with an event or interested in a partnership? Our team is active and ready to assist.
        </p>
      </div>

      {/* --- Simplified Info Cards --- */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {contactMethods.map((item, i) => (
          <div 
            key={i} 
            className="group relative bg-black/40 border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl transition-all hover:border-white/20 hover:-translate-y-2 flex flex-col items-center text-center"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10 ${item.bg}`} />
            
            <div className={`${item.color} mb-6 transition-transform group-hover:scale-110 duration-300`}>
              {item.icon}
            </div>
            
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2">
              {item.title}
            </h3>
            
            <p className="text-xl font-bold text-white mb-1">
              {item.detail}
            </p>
            
            <p className="text-xs font-medium text-slate-500 uppercase tracking-tight">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* --- Subtle Decorative Footer --- */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-[#5dfeca] animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            All systems operational
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;