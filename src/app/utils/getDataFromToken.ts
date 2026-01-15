import { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";

import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user"; 
}

export const getDataFromToken = (req: NextRequest): UserPayload | null => {
  try {
    const token = req.cookies.get("token")?.value || "";
    
    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    
    return decodedToken;
    
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.warn(`JWT Verification Failed: ${errorMessage}`);
    }

    return null;
  }
};