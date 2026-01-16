import EventBookingDetailsPage from "@/components/admin/boookings/EventBookingDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <EventBookingDetailsPage eventId={id} />;
};

export default Page;
