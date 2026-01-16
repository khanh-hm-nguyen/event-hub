"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowBack, Add, MoreVert } from "@mui/icons-material";
import BookingModal from "./BookingModal"; 

const BookingHeader = ({
  eventId,
}: {
  eventId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddAttendee = async (data: {
    email: string;
    eventId: string;
  }) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create booking");
      }

      setIsModalOpen(false);
      router.refresh(); // Refresh the server component data (attendee list)
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-all group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
            <ArrowBack style={{ fontSize: 18 }} />
          </div>
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <Add style={{ fontSize: 18 }} />
            Add Attendee
          </button>
          <button className="p-2 text-slate-400 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all">
            <MoreVert />
          </button>
        </div>
      </div>

      {/* Conditionally render the modal to trigger fresh state on mount */}
      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
          eventId={eventId} 
          onSubmit={handleAddAttendee}
        />
      )}
    </>
  );
};

export default BookingHeader;
