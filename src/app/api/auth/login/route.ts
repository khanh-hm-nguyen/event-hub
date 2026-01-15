import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import connectDB from "@/lib/mongodb";
import { User } from "@/models";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide email and password" },
        { status: 400 }
      );
    }

    // find User (and get password)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // create jwt payload
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // sign in token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d", // token expires in 1 day
    });

    
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // set http only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/", // Available across the entire site
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}