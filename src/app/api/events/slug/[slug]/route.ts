//api/events/slug/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { Event } from "@/models";

import { handleCommonErrors } from "@/utils/errorHandler";

import { eventService } from "@/services/event.service";

// Define route params type for type safety
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const { slug } = await params;

    const event = eventService.getEventBySlug(slug);

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug not found` },
        { status: 404 }
      );
    }

    // Return successful response with events data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}
