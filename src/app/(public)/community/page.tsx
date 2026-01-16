import CommunityPage from "@/components/community/CommunityPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community", 
};


const page = () => {
  return (
    <>
      <CommunityPage />
    </>
  );
};

export default page;
