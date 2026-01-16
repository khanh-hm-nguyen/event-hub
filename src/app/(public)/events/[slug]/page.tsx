//import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

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
