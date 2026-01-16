import LoginPage from "@/components/auth/LoginPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login", 
};


const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;
