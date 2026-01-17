import ExploreBtn from "./ExploreBtn";

const HomePageHero = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
        The Hub for Every Dev <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5dfeca] to-indigo-400 drop-shadow-[0_0_25px_rgba(93,254,202,0.3)]">
          Event You Can't Miss
        </span>
      </h1>

      <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
        Hackathons, Meetups, and Conferences, <br className="hidden md:block" />
        All in One Place for the Global Tech Community.
      </p>

      <div className="pt-4">
        <ExploreBtn />
      </div>
    </div>
  );
};

export default HomePageHero;
