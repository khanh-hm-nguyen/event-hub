import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { BookEvent } from ".";
import { SimilarEvents, EventAgenda, EventTags, EventDetailItem } from ".";

import { getEventBySlug } from "@/actions/event.action";
import { EventSkeleton } from "../home";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return notFound();

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  return (
    <section id="event" className="max-w-7xl mx-auto px-6">
      <div className="header mb-10">
        <h1 className="text-4xl font-black text-white mb-4">
          Event Description
        </h1>
        <p className="text-slate-400 text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side - Event Content */}
        <div className="lg:col-span-2 space-y-10">
          <Image
            src={image}
            alt="Event Banner"
            width={1200}
            height={600}
            className="rounded-[2.5rem] border border-white/10 w-full object-cover"
            priority
          />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="text-slate-300 leading-relaxed">{overview}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventDetailItem
                icon="/icons/calendar.svg"
                alt="calendar"
                label={date}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="clock"
                label={time}
              />
              <EventDetailItem
                icon="/icons/pin.svg"
                alt="pin"
                label={location}
              />
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="audience"
                label={audience}
              />
            </div>
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">About the Organizer</h2>
            <p className="text-slate-300">{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* Right Side - Sticky Booking Card */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
            <h2 className="text-2xl font-bold">Book Your Spot</h2>
            <p className="text-sm text-slate-400 font-medium">
              Join the community and secure your seat today!
            </p>
            <BookEvent eventId={(event._id).toString()} />
          </div>
        </aside>
      </div>

      {/* --- Optimized Caching Section --- */}
      <Suspense
        fallback={
          <div className="mt-20">
            <EventSkeleton />
          </div>
        }
      >
        <SimilarEvents slug={slug} />
      </Suspense>
    </section>
  );
};

export default EventDetails;
