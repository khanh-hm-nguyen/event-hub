import EventBookingDetailsPage from "@/components/admin/boookings/EventBookingDetailsPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking DashBoard", 
};


interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <EventBookingDetailsPage eventId={id} />;
};

export default Page;
