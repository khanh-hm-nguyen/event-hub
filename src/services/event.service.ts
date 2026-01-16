import { Event, IEvent } from "@/models";
import { v2 as cloudinary } from "cloudinary";

export const eventService = {
  // return all events
  getAllEvents: async (): Promise<IEvent[]> => {
    const events = await Event.find().sort({ createdAt: -1 }).lean<IEvent[]>();
    return events;
  },

  // create new event
  createEvent: async (eventData: FormData): Promise<IEvent> => {
    let event;

    try {
      event = Object.fromEntries(eventData.entries());
    } catch (e) {
      throw new Error("Invalid JSON data format");
    }

    const file = eventData.get("image");

    if (!file || !(file instanceof File)) {
      throw new Error("Image file is required");
    }

    const tags = JSON.parse(eventData.get("tags") as string);
    const agenda = JSON.parse(eventData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader

        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },

          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          }
        )

        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return createdEvent;
  },

  getEventBySlug: async (slug: string): Promise<IEvent | null> => {
    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      throw new Error("Invalid or missing slug parameter");
    }
    const sanitizedSlug = slug.trim().toLowerCase();
    // Query events by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean<IEvent>();
    return event;
  },
};
