import { Suspense } from "react";
import { HomePageHero, FeaturedEvents, EventSkeleton } from "@/components/home";

const page = () => {
  return (
    <section className="relative pt-20 pb-32">
      <HomePageHero />

      {/* --- Featured Events Section --- */}
      <div id="events" className="mt-32 space-y-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h3 className="text-2xl font-black text-white tracking-tight uppercase">
            Featured <span className="text-[#5dfeca]">Events</span>
          </h3>
        </div>

        {/* 2. Suspends the dynamic database call */}
        <Suspense fallback={<EventSkeleton />}>
          <FeaturedEvents />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
