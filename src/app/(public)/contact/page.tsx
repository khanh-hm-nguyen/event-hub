import ContactPage from "@/components/contact/ContactPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact", 
};


const page = () => {
  return (
    <>
      <ContactPage />
    </>
  );
};

export default page;
