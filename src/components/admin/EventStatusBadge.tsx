import {isToday, isFuture, parseISO } from "date-fns";

/**
 * EventStatusBadge Component
 * * Responsibilities:
 * 1. Takes an event date string (YYYY-MM-DD).
 * 2. Compares it with the current date.
 * 3. Renders a color-coded badge (Green/Blue/Gray).
 */
const EventStatusBadge = ({ date }: { date: string }) => {
  // Handle invalid or missing dates
  if (!date) return <span className="text-gray-500 text-xs">No Date</span>;

  // Parse the date string safely
  const eventDate = parseISO(date);

  let status = "Past";
  // Default: Past (Dark Gray on Dark)
  let colorClass = "bg-gray-800 text-gray-400 border-gray-700"; 

  if (isToday(eventDate)) {
    status = "Today";
    // Blue: Transparent blue bg with bright blue text
    colorClass = "bg-blue-900/30 text-blue-300 border-blue-800";
  } else if (isFuture(eventDate)) {
    status = "Upcoming";
    // Green: Transparent green bg with bright green text
    colorClass = "bg-green-900/30 text-green-300 border-green-800";
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {status}
    </span>
  );
};

export default EventStatusBadge;