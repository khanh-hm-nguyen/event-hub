"use client";

import { useActionState } from "react";
import Link from "next/link";

// We define the shape of our Form State
interface FormState {
  message: string;
  success?: boolean;
}

interface EventFormProps {
  type: "create" | "edit";
  initialData?: any; // Replace 'any' with your IEvent type if available
  action: (prevState: any, formData: FormData) => Promise<FormState>;
}

export default function EventForm({ type, initialData, action }: EventFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    message: "",
    success: false,
  });

  return (
    <form action={formAction} className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800 shadow-xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-white">
          {type === "create" ? "Create New Event" : "Edit Event"}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {type === "create"
            ? "Fill in the details below to publish a new event."
            : "Update the event details below."}
        </p>
      </div>

      {/* Global Error/Success Message */}
      {state.message && (
        <div className={`p-4 rounded-lg mb-6 ${state.success ? 'bg-green-900/30 text-green-300 border border-green-800' : 'bg-red-900/30 text-red-300 border border-red-800'}`}>
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            required
            placeholder="e.g. Next.js Conf 2025"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
          <input
            name="date"
            type="date"
            defaultValue={initialData?.date}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
          <input
            name="time"
            type="text"
            defaultValue={initialData?.time}
            placeholder="e.g. 10:00 AM - 2:00 PM"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Location & Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
          <input
            name="location"
            defaultValue={initialData?.location}
            placeholder="e.g. San Francisco, CA"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Mode</label>
          <select
            name="mode"
            defaultValue={initialData?.mode || "In-Person"}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="In-Person">In-Person</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Tags & Organizer */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
          <input
            name="tags"
            defaultValue={initialData?.tags?.join(", ")}
            placeholder="e.g. tech, coding, nextjs"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Organizer</label>
          <input
            name="organizer"
            defaultValue={initialData?.organizer}
            placeholder="e.g. Vercel"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            defaultValue={initialData?.description}
            rows={5}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Image URL (Simple input for now) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
          <input
            name="image"
            defaultValue={initialData?.image}
            placeholder="https://..."
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
        <Link 
            href="/admin/events"
            className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
            Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isPending ? "Saving..." : type === "create" ? "Create Event" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}