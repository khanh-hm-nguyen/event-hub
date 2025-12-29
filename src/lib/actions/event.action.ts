"use server";

import { Event } from "@/models";
import connectDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};

export const deleteEvent = async (eventID: string) => {
  try {
    await connectDB();

    await Event.findByIdAndDelete(eventID);
    //refresh dashboard after delete
    revalidatePath("/dashboard/events");
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
};

export const getAllEvents = async () => {
  try {
    await connectDB();
    return await Event.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("Failed to fetch all events:", error);
    return [];
  }
};


// --- CREATE ---
export async function createEventAction(prevState: any, formData: FormData) {
  try {
    await connectDB();

    const data = {
      title: formData.get("title"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      mode: formData.get("mode"),
      organizer: formData.get("organizer"),
      description: formData.get("description"),
      image: formData.get("image"),
      // Split tags by comma and clean whitespace
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
      slug: (formData.get("title") as string).toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
    };

    await Event.create(data);

    revalidatePath("/admin/events");
  } catch (error) {
    return { message: "Database Error: Failed to Create Event", success: false };
  }

  // Redirect outside try/catch to avoid Next.js error
  redirect("/admin/events");
}

// --- UPDATE ---
export async function updateEventAction(id: string, prevState: any, formData: FormData) {
  try {
    await connectDB();

    const data = {
      title: formData.get("title"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      mode: formData.get("mode"),
      organizer: formData.get("organizer"),
      description: formData.get("description"),
      image: formData.get("image"),
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
    };

    await Event.findByIdAndUpdate(id, data);

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/edit/${id}`);
  } catch (error) {
    return { message: "Database Error: Failed to Update Event", success: false };
  }

  redirect("/admin/events");
}