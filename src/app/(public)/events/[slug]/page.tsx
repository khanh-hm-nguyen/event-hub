//import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

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
    <main>
      <EventDetails params={params} />
    </main>
  );
};
export default EventDetailsPage;
