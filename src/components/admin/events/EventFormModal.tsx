"use client";

import { useState, useEffect } from "react";
import { Close, CloudUpload, Add, Remove } from "@mui/icons-material";
import type { IEvent } from "@/models";
import InputField from "@/components/ui/InputField";

// 1. Define the shape of our Form State
// We Pick all fields from IEvent, but override 'image' to be File | string | null
// (string is needed for Edit mode to show existing image URL)
export type EventFormState = Pick<
  IEvent,
  | "title"
  | "description"
  | "overview"
  | "venue"
  | "location"
  | "date"
  | "time"
  | "mode"
  | "audience"
  | "agenda"
  | "organizer"
  | "tags"
> & {
  image: File | string | null;
};

// 2. Default Empty State
const INITIAL_DATA: EventFormState = {
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

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  initialData?: EventFormState | null; // Optional: If provided, we are in "Edit Mode"
  onSubmit: (data: EventFormState) => Promise<void>; // Pass raw state back to parent
  title?: string;
}

const EventFormModal = ({
  isOpen,
  onClose,
  isLoading,
  initialData,
  onSubmit,
  title = "Create New Event",
}: EventFormModalProps) => {
  const [formData, setFormData] = useState<EventFormState>(INITIAL_DATA);
  const [localError, setLocalError] = useState("");

  // 3. Effect: Populate form if initialData (Edit Mode) exists
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // We are editing: Fill the form
        setFormData({
          ...initialData,
          // Ensure dates are formatted YYYY-MM-DD for input type="date"
          date:
            typeof initialData.date === "string"
              ? initialData.date.split("T")[0]
              : initialData.date,
          // Ensure arrays exist
          tags: initialData.tags?.length ? initialData.tags : [""],
          agenda: initialData.agenda?.length ? initialData.agenda : [""],
        });
      } else {
        // We are creating: Reset to empty
        setFormData(INITIAL_DATA);
      }
      setLocalError("");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // --- Handlers ---

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "tags" | "agenda"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const modifyArraySize = (
    field: "tags" | "agenda",
    action: "add" | "remove",
    index?: number
  ) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      if (action === "add") return { ...prev, [field]: [...arr, ""] };
      if (action === "remove" && index !== undefined)
        return { ...prev, [field]: arr.filter((_, i) => i !== index) };
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    try {
      // Basic validation
      if (!formData.title) throw new Error("Title is required");
      if (!initialData && !formData.image) throw new Error("Image is required");

      // Pass the raw data to the parent. The parent decides how to format it (FormData vs JSON).
      await onSubmit(formData);
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
          >
            <Close />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {localError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {localError}
            </div>
          )}

          <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Event Banner
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-teal-500 transition-colors">
                  <CloudUpload
                    fontSize="large"
                    className="text-teal-400 group-hover:text-teal-500"
                  />
                  <span className="text-sm font-medium">
                    {/* Display file name OR existing URL OR prompt */}
                    {formData.image instanceof File
                      ? formData.image.name
                      : typeof formData.image === "string"
                      ? "Change Current Image"
                      : "Click to upload image"}
                  </span>
                  {/* Show preview if editing and using existing image */}
                  {typeof formData.image === "string" && (
                    <span className="text-xs text-slate-400">
                      (Current image loaded)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Title & Organizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <InputField
                label="Organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mode & Audience (MISSING IN PREVIOUS CODE) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600">
                  Mode
                </label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <InputField
                label="Target Audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                placeholder="e.g. Junior Developers"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <InputField
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Venue & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Venue Name"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
              <InputField
                label="Location Address"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description (MISSING IN PREVIOUS CODE) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">
                Short Description
              </label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                required
                placeholder="Brief summary for cards..."
              />
            </div>

            {/* Overview (MISSING IN PREVIOUS CODE) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">
                Full Overview
              </label>
              <textarea
                name="overview"
                rows={5}
                value={formData.overview}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                required
                placeholder="Detailed event information..."
              />
            </div>

            {/* Dynamic Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Tags</label>
              {formData.tags.map((tag, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={tag}
                    onChange={(e) =>
                      handleArrayChange(idx, e.target.value, "tags")
                    }
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                    placeholder="e.g. React"
                  />
                  <button
                    type="button"
                    onClick={() => modifyArraySize("tags", "remove", idx)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <Remove fontSize="small" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => modifyArraySize("tags", "add")}
                className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:text-teal-700"
              >
                <Add fontSize="small" /> Add Tag
              </button>
            </div>

            {/* Dynamic Agenda (MISSING IN PREVIOUS CODE) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Agenda Items
              </label>
              {formData.agenda.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(idx, e.target.value, "agenda")
                    }
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                    placeholder="e.g. 10:00 AM - Opening Ceremony"
                  />
                  <button
                    type="button"
                    onClick={() => modifyArraySize("agenda", "remove", idx)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <Remove fontSize="small" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => modifyArraySize("agenda", "add")}
                className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:text-teal-700"
              >
                <Add fontSize="small" /> Add Agenda Item
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
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
            form="event-form"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-200 disabled:opacity-50 transition-all"
          >
            {isLoading
              ? "Saving..."
              : title === "Create New Event"
              ? "Create Event"
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
