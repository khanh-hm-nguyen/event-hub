// actions/event.action

"use server";

import { Event } from "@/models";
import connectDB from "@/lib/mongodb";
import { eventService } from "@/services/event.service";
import { isAdmin } from "@/utils/getDataFromToken";

export const getSimilarEventsBySlug = async (slug: string) => {
  "use cache";
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

export const getAllEvents = async () => {
  "use cache";
  try {
    await connectDB();
    const events = await eventService.getAllEvents();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Failed to fetch all events:", error);
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  "use cache";
  try {
    await connectDB();

    const event = await eventService.getEventBySlug(slug);

    if (!event) return null;

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(`Failed to fetch event by slug (${slug}):`, error);
    return [];
  }
};

export const getEventById = async (id: string) => {
  try {
    // Verify Admin Role
    const isAuthorized = await isAdmin();

    if (!isAuthorized) {
      throw new Error("Unauthorized: Admin access required");
    }
    await connectDB();

    const event = await eventService.getEventById(id);

    if (!event) return null;

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(`Failed to fetch event by slug (${id}):`, error);
    return [];
  }
};
