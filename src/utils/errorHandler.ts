import { NextResponse } from "next/server";

export function handleCommonErrors(error: unknown) {
  // 1. Log error for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error("API Error:", error);
  }

  // 2. Handle specific Error types
  if (error instanceof Error) {
    // Security Errors (from verifyAdmin or Auth guards)
    if (error.message.startsWith("Unauthorized")) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    if (error.message.startsWith("Forbidden")) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    // Database connection errors
    if (error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { message: "Database configuration error" },
        { status: 500 }
      );
    }

    // Mongoose "CastError" (e.g., getting a product with ID "abc" when it expects a clean ObjectId)
    if (error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    // Mongoose Validation Error (e.g., missing required fields)
    if (error.name === "ValidationError") {
        return NextResponse.json(
            { message: error.message }, 
            { status: 400 }
        );
    }

    // Generic error
    return NextResponse.json(
      { message: "Request failed", error: error.message },
      { status: 500 }
    );
  }

  // 3. Fallback for unknown error types
  return NextResponse.json(
    { message: "An unexpected error occurred" },
    { status: 500 }
  );
}