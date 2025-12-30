import { IEvent } from "@/models";
const BASE_URL = process.env.PUBLIC_BASE_URL;

import { ExploreBtn, EventCard } from "@/components";

const page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });

  const { events } = await response.json();

  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-28 pb-10 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          The Hub for Every Dev <br /> Event You Can't Miss
        </h1>
        <p className="text-lg text-gray-400 mt-6 max-w-2xl">
          Hackathons, Meetups, and Conferences. All in One Place.
        </p>
        <div className="mt-8">
          <ExploreBtn />
        </div>
      </div>

      <div id="events" className="w-full mt-24 space-y-7">
        <h3 className="text-2xl font-mono font-bold text-white border-l-4 border-[#5dfeca] pl-4">
          Featured Events
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none h-full">
                <EventCard {...event} />
              </li>
            ))}
        </ul>

        {(!events || events.length === 0) && (
          <p className="text-gray-500 text-center py-10">
            No events found yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default page;
