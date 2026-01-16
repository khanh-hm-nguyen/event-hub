//api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { Event } from "@/models";

import { getDataFromToken } from "@/utils/getDataFromToken";
import { handleCommonErrors } from "@/utils/errorHandler";

import { eventService } from "@/services/event.service";

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
    const event = await eventService.getEventById(id);

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
    return handleCommonErrors(error);
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
    // only allow admin to update event
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();

    const id = (await params).id;
    const body = await req.json();

    // Find by ID and Update
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
    return handleCommonErrors(error);
  }
}

/**
 * DELETE /api/events/[id]
 * Deletes an event by its id (Protected: Admin only)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Updated type definition
): Promise<NextResponse> {
  try {
    // only allow admin to delete event
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await params;

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
    return handleCommonErrors(error);
  }
}
