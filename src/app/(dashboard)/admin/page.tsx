import AdminDashboard from "@/components/admin/AdminDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin DashBoard", 
};

const page = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default page;
