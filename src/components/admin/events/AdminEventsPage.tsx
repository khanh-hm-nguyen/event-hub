"use client";

import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useResource } from "@/app/hooks/useResource";
import EventsTable from "@/components/admin/events/EventsTable";
// Import our new Reusable Modal
import EventFormModal, { EventFormState } from "@/components/admin/events/EventFormModal";
import { IEvent } from "@/models";

// Define strict types for your frontend events
interface IEventFrontend extends Omit<IEvent, '_id'> {
  _id: string;
}
const AdminEventsPage = () => {
  const { items: events, isLoading, error, fetchItems, createItem, deleteItem } = 
    useResource<IEventFrontend>("/api/events", "events");

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // --- Handlers ---

  const handleDelete = async (id: string) => {
    if (confirm("Delete this event?")) await deleteItem(id);
  };

  const handleEditClick = (event: IEventFrontend) => {
    // Populate the modal with this event's data
    setEditingEvent(event); 
    setEditingId(event._id);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEvent(null); // Clear data for fresh create
    setEditingId(null);
    setIsModalOpen(true);
  };

  // The Magic: One submit handler for both
  const handleFormSubmit = async (data: EventFormState) => {
    
    if (editingId) {
      // --- EDIT MODE (Send JSON) ---
      // Your Edit API likely expects JSON, not FormData (based on previous chats)
      const payload = {
        ...data,
        tags: data.tags?.filter(t => t.trim() !== ""),
        agenda: data.agenda?.filter(a => a.trim() !== ""),
        // Note: We often strip the 'image' field here if it wasn't changed
        // or if your Edit API doesn't support file uploads yet.
      };

      try {
        const res = await fetch(`/api/events/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if(!res.ok) throw new Error("Failed to update");
        
        await fetchItems(); // Refresh
        setIsModalOpen(false);
      } catch (err) {
        alert("Update failed");
      }

    } else {
      // --- CREATE MODE (Send FormData) ---
      const formData = new FormData();
      
      // Helper to append data
      (Object.keys(data) as Array<keyof EventFormState>).forEach(key => {
        if (key !== "tags" && key !== "agenda" && key !== "image") {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      });

      // Handle File
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      // Handle Arrays
      formData.append("tags", JSON.stringify(data.tags?.filter(t => t.trim() !== "")));
      formData.append("agenda", JSON.stringify(data.agenda?.filter(a => a.trim() !== "")));

      // Use your hook
      const success = await createItem(formData, false);
      if (success) setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <button onClick={handleCreateClick} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center">
          <Add fontSize="small" /> Create Event
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <EventsTable 
        events={events} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
        onEdit={handleEditClick} 
      />

      {/* The Reusable Modal */}
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        initialData={editingEvent} // Pass data if editing, null if creating
        onSubmit={handleFormSubmit}
        title={editingEvent ? "Edit Event" : "Create New Event"}
      />
    </div>
  );
};

export default AdminEventsPage;