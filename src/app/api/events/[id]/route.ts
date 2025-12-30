import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { Event } from "@/models";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};


/**
 * GET /api/events/[id]
 * Fetches a single events by its id
 */

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const id = (await params).id;

    // Query events by slug
    const event = await Event.findById(id).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with id '${id}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with events data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }

      // Return generic error with error message
      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


/**
 * PUT /api/events/[id]
 * Updates an existing event by its id
 */
export async function PUT(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const id = (await params).id;
    const body = await req.json();

    // Find by ID and Update
    // { new: true } -> Returns the updated document instead of the old one
    // { runValidators: true } -> Ensures updates follow your Schema rules
    const updatedEvent = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedEvent) {
      return NextResponse.json(
        { message: `Event with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error updating event:", error);
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to update event", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/events/[id]
 * Deletes an event by its id
 */
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const id = (await params).id;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { message: `Event with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error deleting event:", error);
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to delete event", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}