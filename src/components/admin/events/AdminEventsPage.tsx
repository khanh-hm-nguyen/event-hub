"use client";

import { useState, useEffect, useCallback } from "react";
import { Add } from "@mui/icons-material";

import { IEvent } from "@/models";
import EventsTable from "@/components/admin/events/EventsTable";
import CreateEventModal from "@/components/admin/events/CreateEventModal";

const AdminEventsPage = () => {
 const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (res.ok) {
        setEvents(data.events);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Optimistic update
        setEvents((prev) => prev.filter((e) => (e._id).toString() !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      alert("Error deleting event");
    }
  };

  const handleEdit = (event: IEvent) => {
    // For now, alert the user, as the PUT API requires simple JSON body 
    // but full editing usually needs image replacement logic which differs from the CREATE flow.
    alert(`Editing logic for "${event.title}" would go here. (Requires implementing PUT form)`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Events Management</h1>
          <p className="text-slate-500 mt-1">View, create, and manage your upcoming events.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Add fontSize="small" /> Create Event
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* Events Table */}
      <EventsTable 
        events={events} 
        isLoading={isLoading} 
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Create Modal */}
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchEvents}
      />
    </div>
  );
}
export default AdminEventsPage