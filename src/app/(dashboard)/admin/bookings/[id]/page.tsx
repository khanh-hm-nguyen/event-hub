import { EventBookingDetailsPage } from "@/components/admin/boookings";
import { Suspense } from "react";
import AdminLoading from "../../loading";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking DashBoard",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <Suspense fallback={<AdminLoading />}>
      <EventBookingDetailsPage eventId={id} />
    </Suspense>
  );
};

export default Page;
