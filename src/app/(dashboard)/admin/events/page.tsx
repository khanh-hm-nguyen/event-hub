import AdminEventsPage from "@/components/admin/events/AdminEventsPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events DashBoard", 
};


const page = () => {
  return (
    <>
      <AdminEventsPage />
    </>
  );
};

export default page;
