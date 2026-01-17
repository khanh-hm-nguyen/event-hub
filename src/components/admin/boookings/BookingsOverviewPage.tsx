import { Suspense } from "react";
import BookingsDashboardContent from "./BookingsDashboardContent";
import AdminLoading from "@/app/(dashboard)/admin/loading";

const BookingsOverviewPage = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header - This part appears INSTANTLY */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Bookings Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Overview of event performance and attendee numbers.
        </p>
      </div>

      {/* The Data-Heavy part is streamed */}
      <Suspense fallback={<AdminLoading />}>
        <BookingsDashboardContent />
      </Suspense>
    </div>
  );
};

export default BookingsOverviewPage;
