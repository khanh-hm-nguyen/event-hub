"use client";

import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking creation failed");

      setSubmitted(true);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="book-event" className="w-full">
      {submitted ? (
        // --- IMPROVED SUCCESS UI ---
        <div className="flex flex-col items-center justify-center p-6 bg-green-900/20 border border-green-500/30 rounded-xl animate-in fade-in zoom-in duration-300">
          <CheckCircle
            className="text-green-400 w-12 h-12 mb-3"
            fontSize="large"
          />
          <h3 className="text-white font-bold text-lg">You're All Set!</h3>
          <p className="text-slate-300 text-sm text-center mt-2 leading-relaxed">
            We sent a confirmation email to:
            <br />
            <span className="text-green-400 font-medium break-all">
              {email}
            </span>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium mb-1 block text-slate-300"
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
              required
              disabled={isLoading}
              // Improved input styling for dark mode compatibility
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-900/20 p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
            disabled={isLoading}
          >
            {isLoading ? "Booking..." : "Secure My Spot"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
