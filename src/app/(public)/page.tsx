import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/models";
import { getAllEvents } from "@/actions/event.action";

const Page = async () => {
  const events = await getAllEvents();

  return (
    <section className="relative pt-20 pb-32">
      <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
          The Hub for Every Dev <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5dfeca] to-indigo-400 drop-shadow-[0_0_25px_rgba(93,254,202,0.3)]">
            Event You Can't Miss
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Hackathons, Meetups, and Conferences,{" "}
          <br className="hidden md:block" />
          All in One Place for the Global Tech Community.
        </p>

        <div className="pt-4">
          <ExploreBtn />
        </div>
      </div>

      {/* --- Featured Events Section --- */}
      <div id="events" className="mt-32 space-y-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h3 className="text-2xl font-black text-white tracking-tight uppercase">
            Featured <span className="text-[#5dfeca]">Events</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <div
                key={event.title}
                className="transition-transform duration-500 hover:-translate-y-2"
              >
                <EventCard {...event} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <p className="text-slate-500 font-medium tracking-wide">
                No events currently scheduled. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
