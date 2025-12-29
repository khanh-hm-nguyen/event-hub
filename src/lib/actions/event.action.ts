"use server";

import { Event } from "@/models";
import connectDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

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
