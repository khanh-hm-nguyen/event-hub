import { getSimilarEventsBySlug } from "@/actions/event.action";
import { EventCard } from ".";
import { IEvent } from "@/models";

const SimilarEvents = async ({ slug }: { slug: string }) => {
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  if (similarEvents.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4 pt-20">
      <h2 className="text-2xl font-bold text-white">Similar Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </div>
  );
};

export default SimilarEvents;