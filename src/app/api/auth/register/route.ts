import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import { User } from "@/models";

/**
 * POST /api/auth/register
 * Creates a new user (Registration)
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // basic Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Please provide all required fields (name, email, password)",
        },
        { status: 400 }
      );
    }

    // check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // hash the password
    // 10 is the 'salt rounds' - a balance between security and speed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the User
    // prevents malicious users from sending role: "admin" in the JSON body.
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // return success (excluding password)
    // create a clean object to return to the frontend
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
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