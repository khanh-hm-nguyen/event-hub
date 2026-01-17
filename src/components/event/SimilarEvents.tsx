import { getSimilarEventsBySlug } from "@/actions/event.action";
import { EventCard } from ".";
import { IEvent } from "@/models";


export interface IEventFrontend extends Omit<IEvent, "_id"> {
  _id: string;
}

const SimilarEvents = async ({ slug }: { slug: string }) => {

  const rawSimilarEvents = await getSimilarEventsBySlug(slug);

  if (rawSimilarEvents.length === 0) return null;


  const similarEvents: IEventFrontend[] = JSON.parse(JSON.stringify(rawSimilarEvents));

  return (
    <div className="flex w-full flex-col gap-4 pt-20">
      <h2 className="text-2xl font-bold text-white">Similar Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarEvents.map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};
export default SimilarEvents;