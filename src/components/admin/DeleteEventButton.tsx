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
      className={`px-3 py-1 text-sm text-white rounded bg-red-500 hover:bg-red-600 transition
        ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteEventButton;
