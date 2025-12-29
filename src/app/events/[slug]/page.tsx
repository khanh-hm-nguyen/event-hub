//import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // const slug = params.then((p) => p.slug);

  return (
    <main>
      <EventDetails params={params} />
      {/* <Suspense fallback={<div>Loading...</div>}>
            
                <EventDetails params={params} /> 
            </Suspense> */}
    </main>
  );
};
export default EventDetailsPage;
