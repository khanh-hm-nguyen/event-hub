"use client";

import { useState } from "react";
import { Close } from "@mui/icons-material";
import InputField from "@/components/ui/InputField";
import type { IBooking } from "@/models";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  eventId: string;
  initialData?: IBooking | null;
  onSubmit: (data: { email: string; eventId: string }) => Promise<void>;
}

export default function BookingModal({
  onClose,
  isLoading,
  eventId,
  initialData,
  onSubmit,
}: BookingModalProps) {
  const [email, setEmail] = useState(initialData?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ email, eventId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? "Update Booking" : "Add Attendee"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <Close />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Attendee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="john@example.com"
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg disabled:opacity-50 transition-all shadow-sm shadow-teal-200"
            >
              {isLoading
                ? "Saving..."
                : initialData
                ? "Update"
                : "Add Attendee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
