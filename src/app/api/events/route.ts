//api/events/route.ts

import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { handleCommonErrors } from "@/utils/errorHandler";
import { eventService } from "@/services/event.service";

// create an event
export async function POST(req: NextRequest) {
  try {
    // only allow admin to create event
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();

    const formData = await req.formData();
    const createdEvent = await eventService.createEvent(formData);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}

// return all events
export async function GET(req: NextRequest) {
  try {
    // only allow admin to create event
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }
    await connectDB();

    const events = await eventService.getAllEvents();

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}
