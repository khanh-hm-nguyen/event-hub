import { revalidateTag } from "next/cache";

/**
 * Centered utility to handle cache invalidation in Next.js 16.
 * Using 'max' profile to ensure immediate global purge.
 */

export const cacheUtils = {
  /**
   * Refreshes event-related data.
   * Call this when creating, updating, or deleting events.
   */
  revalidateEvent: (slug?: string) => {
    // Always refresh the global events list (Home Page)
    revalidateTag("events", "max");

    if (slug) {
      // Refresh the specific event detail page
      revalidateTag(`event-${slug}`, "max");
      // Refresh any "Similar Events" sections that might include or be on this page
      revalidateTag(`similar-${slug}`, "max");
    }
  },

  /**
   * Refreshes booking-related data.
   * Call this when a user books a spot or an admin modifies bookings.
   */
  revalidateBooking: (eventId?: string) => {
    // Refresh global booking stats if you have a dashboard
    revalidateTag("bookings-metadata", "max");

    if (eventId) {
      // Refresh the specific booking list for an event (Admin view)
      revalidateTag(`bookings-${eventId}`, "max");
      
      /** * Pro-Tip: If your Event page shows "X spots left", 
       * you might need to revalidate the event tag too so the counter updates!
       */
      revalidateTag(`event-data-${eventId}`, "max");
    }
  }
};