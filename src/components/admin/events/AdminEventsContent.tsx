"use client";

import { useState, useMemo } from "react";
import { Add, EventAvailable, ErrorOutline } from "@mui/icons-material";
import { useResource } from "@/hooks/useResource";
import EventsTable from "@/components/admin/events/EventsTable";
import EventFormModal, { EventFormState } from "@/components/admin/events/EventFormModal";
import { IEvent } from "@/models";
import { getAllEvents } from "@/actions/event.action"; // Your Server Action
import { useEffect } from "react";

interface IEventFrontend extends Omit<IEvent, "_id"> {
  _id: string;
}

const AdminEventsContent = () => {
  // We still use useResource for Create/Delete logic, 
  // but we will initialize data from the Server Action
  const {
    items: events,
    setItems, // Make sure your hook exposes setItems
    isLoading,
    error,
    createItem,
    deleteItem,
  } = useResource<IEventFrontend>("/api/events", "events");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Use the Server Action to fetch items on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await getAllEvents();
      // Ensure data is stringified for frontend
      setItems(JSON.parse(JSON.stringify(data)));
    };
    loadData();
  }, [setItems]);

  const stats = useMemo(() => ({ total: events.length }), [events]);

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this event? This cannot be undone.")) {
      await deleteItem(id);
    }
  };

  const handleEditClick = (event: IEventFrontend) => {
    setEditingEvent(event);
    setEditingId(event._id);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEvent(null);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: EventFormState) => {
    if (editingId) {
      // Logic for PUT
      const payload = {
        ...data,
        tags: data.tags?.filter((t) => t.trim() !== ""),
        agenda: data.agenda?.filter((a) => a.trim() !== ""),
      };

      try {
        const res = await fetch(`/api/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");

        // Refresh data
        const freshData = await getAllEvents();
        setItems(JSON.parse(JSON.stringify(freshData)));
        setIsModalOpen(false);
      } catch (err) {
        alert("Update failed.");
      }
    } else {
      // Logic for POST (using your existing createItem)
      const formData = new FormData();
      (Object.keys(data) as Array<keyof EventFormState>).forEach((key) => {
        if (key !== "tags" && key !== "agenda" && key !== "image") {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      });

      if (data.image instanceof File) formData.append("image", data.image);
      formData.append("tags", JSON.stringify(data.tags?.filter((t) => t.trim() !== "")));
      formData.append("agenda", JSON.stringify(data.agenda?.filter((a) => a.trim() !== "")));

      const success = await createItem(formData, false);
      if (success) setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {/* Total Events Stat */}
        <div className="bg-white border border-slate-200 py-4 px-8 rounded-[2rem] flex items-center gap-5 shadow-sm min-w-[240px]">
          <div className="w-12 h-12 bg-blue-50 text-teal-600 rounded-2xl flex items-center justify-center">
            <EventAvailable />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Total Events
            </p>
            <p className="text-2xl font-black text-slate-900">{stats.total}</p>
          </div>
        </div>

        <button
          onClick={handleCreateClick}
          className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-2xl flex gap-2 items-center font-bold shadow-lg transition-all active:scale-95"
        >
          <Add fontSize="small" className="group-hover:rotate-90 transition-transform" />
          <span>Create New Event</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700 text-sm font-bold">
          <ErrorOutline />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <EventsTable
          events={events}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />
      </div>

      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        initialData={editingEvent}
        onSubmit={handleFormSubmit}
        title={editingEvent ? "Update Event Details" : "Publish New Event"}
      />
    </div>
  );
};

export default AdminEventsContent;