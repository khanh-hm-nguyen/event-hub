import { getAllEvents } from "@/actions/event.action";
import EventCard from "@/components/event/EventCard";
import { IEvent } from "@/models";

const FeaturedEvents = async () => {
  const events = await getAllEvents();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events && events.length > 0 ? (
        events.map((event: IEvent) => (
          <div
            key={event._id.toString()}
            className="transition-transform duration-500 hover:-translate-y-2"
          >
            <EventCard {...event} />
          </div>
        ))
      ) : (
        <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-white/10">
          <p className="text-slate-500 font-medium">
            No events currently scheduled.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedEvents;
