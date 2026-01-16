import BookingsOverviewPage from "@/components/admin/boookings/BookingsOverviewPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings DashBoard", 
};


const page = () => {
  return (
    <>
      <BookingsOverviewPage />
    </>
  );
};

export default page;
