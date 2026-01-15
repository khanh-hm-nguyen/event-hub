"use client";

import { useState } from "react";
import { Close, CloudUpload, Add, Remove } from "@mui/icons-material";
import { CreateEventFormData } from "@/type/event";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_DATA: CreateEventFormData = {
  title: "",
  description: "",
  overview: "",
  image: null,
  venue: "",
  location: "",
  date: "",
  time: "",
  mode: "offline",
  audience: "General Developers",
  agenda: [""],
  organizer: "",
  tags: [""],
};

const CreateEventModal = ({ isOpen, onClose, onSuccess }: CreateEventModalProps) => {
  const [formData, setFormData] = useState<CreateEventFormData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Helper for dynamic array fields (tags, agenda)
  const handleArrayChange = (index: number, value: string, field: "tags" | "agenda") => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "tags" | "agenda") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: "tags" | "agenda") => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = new FormData();
      
      // Append simple fields
      Object.keys(formData).forEach((key) => {
        if (key !== "tags" && key !== "agenda" && key !== "image") {
          // @ts-ignore - Dynamic access
          data.append(key, formData[key as keyof CreateEventFormData]);
        }
      });

      // Append Image
      if (formData.image) {
        data.append("image", formData.image);
      } else {
        throw new Error("Please upload an event image");
      }

      // Append Arrays as JSON strings (Required by your API)
      data.append("tags", JSON.stringify(formData.tags.filter(t => t.trim() !== "")));
      data.append("agenda", JSON.stringify(formData.agenda.filter(a => a.trim() !== "")));

      const res = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create event");
      }

      onSuccess();
      onClose();
      setFormData(INITIAL_DATA);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Create New Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <Close />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form id="create-event-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Event Banner</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <CloudUpload fontSize="large" className="text-indigo-400" />
                  <span className="text-sm">
                    {formData.image ? formData.image.name : "Click to upload image"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Event Title" name="title" value={formData.title} onChange={handleChange} required />
              <InputField label="Organizer" name="organizer" value={formData.organizer} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Select Mode */}
               <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">Mode</label>
                <select 
                  name="mode" 
                  value={formData.mode} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <InputField label="Target Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Junior Devs" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
               <InputField label="Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Venue Name" name="venue" value={formData.venue} onChange={handleChange} required />
              <InputField label="Location Address" name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Short Description</label>
              <textarea 
                name="description" 
                rows={2} 
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Full Overview</label>
              <textarea 
                name="overview" 
                rows={4} 
                value={formData.overview}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                required
              />
            </div>

            {/* Dynamic Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Tags</label>
              {formData.tags.map((tag, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={tag}
                    onChange={(e) => handleArrayChange(idx, e.target.value, "tags")}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. React"
                  />
                  <button type="button" onClick={() => removeArrayItem(idx, "tags")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Remove fontSize="small" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("tags")} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                <Add fontSize="small" /> Add Tag
              </button>
            </div>

             {/* Dynamic Agenda */}
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Agenda Items</label>
              {formData.agenda.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) => handleArrayChange(idx, e.target.value, "agenda")}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. 10:00 AM - Opening Ceremony"
                  />
                  <button type="button" onClick={() => removeArrayItem(idx, "agenda")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Remove fontSize="small" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("agenda")} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                <Add fontSize="small" /> Add Agenda Item
              </button>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="create-event-form"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Input Component
const InputField = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-600">{label}</label>
    <input 
      {...props}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
    />
  </div>
);
export default CreateEventModal