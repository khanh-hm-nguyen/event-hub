import Link from "next/link";
import { People, Groups, Terminal, Public } from "@mui/icons-material";

const CommunityPage = () => {
  const stats = [
    {
      label: "Active Members",
      value: "12,000+",
      icon: <People />,
      color: "text-[#5dfeca]",
    },
    {
      label: "Tech Meetups",
      value: "450+",
      icon: <Groups />,
      color: "text-indigo-400",
    },
    {
      label: "Code Contributions",
      value: "1.2M",
      icon: <Terminal />,
      color: "text-emerald-400",
    },
    {
      label: "Global Chapters",
      value: "24",
      icon: <Public />,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="relative pb-24">
      {/* --- Hero Section --- */}
      <div className="text-center max-w-3xl mx-auto pt-16 space-y-6">
        <h2 className="text-[10px] font-black text-[#5dfeca] uppercase tracking-[0.5em]">
          The Global Network
        </h2>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
          By Devs, For <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5dfeca] to-indigo-500">
            Devs.
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
          EventHub is more than a platform. It's a collective of innovators,
          dreamers, and builders shaping the future of technology together.
        </p>
      </div>

      {/* --- Statistics Grid --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#5dfeca]/30 transition-all"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${stat.color} group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* --- Vision Section --- */}
      <div className="mt-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h3 className="text-3xl font-black text-white tracking-tight">
            Our Mission:{" "}
            <span className="text-indigo-400">Knowledge Access.</span>
          </h3>
          <p className="text-slate-400 leading-relaxed font-medium">
            We believe that the best tech education happens in person. Whether
            it's a weekend hackathon in San Francisco or a React meetup in
            Lagos, we provide the infrastructure to make these connections
            seamless.
          </p>
          <ul className="space-y-4">
            {[
              "No Entry Barriers",
              "Global Networking",
              "Mentor-Led Sessions",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm font-bold text-slate-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#5dfeca]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Feature Visual */}
        <div className="relative aspect-square bg-gradient-to-br from-[#5dfeca]/20 to-indigo-500/20 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <People
            style={{ fontSize: 180 }}
            className="text-white/10 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* --- CTA Section --- */}
      <div className="mt-32 relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-2xl p-12 md:p-20 text-center space-y-8 shadow-2xl">
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#5dfeca]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Ready to Host or <span className="text-[#5dfeca]">Attend?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium mt-4 leading-relaxed">
            Join thousands of other developers. Start your journey by exploring
            upcoming events or contact our team to organize your own.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            {/* Primary Link: Back to Home Events Section */}
            <Link
              href="/#events"
              className="relative group overflow-hidden bg-[#5dfeca] text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:shadow-[0_0_40px_rgba(93,254,202,0.4)] active:scale-95 text-center"
            >
              Browse Events
            </Link>

            {/* Secondary Link: Email Support */}
            <Link
              href="/contact"
              className="px-10 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
