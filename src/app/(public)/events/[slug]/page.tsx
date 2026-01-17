import { Suspense } from "react";
import { EventDetails, EventDetailsSkeleton } from "@/components/event";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event",
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails params={params} />
    </Suspense>
  );
};
export default EventDetailsPage;
