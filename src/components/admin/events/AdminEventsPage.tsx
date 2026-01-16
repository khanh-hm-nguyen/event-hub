"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Add,
  EventAvailable,
  ErrorOutline,
} from "@mui/icons-material";
import { useResource } from "@/hooks/useResource";
import EventsTable from "@/components/admin/events/EventsTable";
import EventFormModal, {
  EventFormState,
} from "@/components/admin/events/EventFormModal";
import { IEvent } from "@/models";

interface IEventFrontend extends Omit<IEvent, "_id"> {
  _id: string;
}

const AdminEventsPage = () => {
  
  const {
    items: events,
    isLoading,
    error,
    fetchItems,
    createItem,
    deleteItem,
  } = useResource<IEventFrontend>("/api/events", "events");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const stats = useMemo(
    () => ({
      total: events.length,
    }),
    [events]
  );

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

        await fetchItems();
        setIsModalOpen(false);
      } catch (err) {
        alert("Update failed. Please check your connection.");
      }
    } else {
      const formData = new FormData();
      (Object.keys(data) as Array<keyof EventFormState>).forEach((key) => {
        if (key !== "tags" && key !== "agenda" && key !== "image") {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      });

      if (data.image instanceof File) formData.append("image", data.image);
      formData.append(
        "tags",
        JSON.stringify(data.tags?.filter((t) => t.trim() !== ""))
      );
      formData.append(
        "agenda",
        JSON.stringify(data.agenda?.filter((a) => a.trim() !== ""))
      );

      const success = await createItem(formData, false);
      if (success) setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* --- Breadcrumb & Header --- */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Events Management
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Deploy and organize your organization's event schedule.
            </p>
          </div>
          <button
            onClick={handleCreateClick}
            className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-2xl flex gap-2 items-center font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <Add
              fontSize="small"
              className="group-hover:rotate-90 transition-transform"
            />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      {/* --- Single Stats Card --- */}
      <div className="flex justify-start">
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
      </div>

      {/* --- Error Display --- */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700 text-sm font-bold animate-shake">
          <ErrorOutline />
          <span>{error}</span>
        </div>
      )}

      {/* --- Table Section --- */}
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

export default AdminEventsPage;
