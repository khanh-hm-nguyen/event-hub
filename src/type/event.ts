import { IEvent } from "@/models";

export type CreateEventFormData = Omit<
  IEvent,
  "_id" | "slug" | "createdAt" | "updatedAt" | "image"
> & {
  image: File | null;
};
