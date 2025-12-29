"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/lib/actions/event.action";

const DeleteEventButton = ({ eventId }: { eventId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    startTransition(async () => {
      await deleteEvent(eventId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`px-3 py-1 text-sm font-medium text-white rounded-md bg-red-600/90 hover:bg-red-500 transition-all border border-red-700
        ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteEventButton;