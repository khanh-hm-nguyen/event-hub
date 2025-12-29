/**
 * EventModeBadge Component
 * * Responsibilities:
 * 1. Visualizes the event mode (Online vs In-Person).
 * 2. Applies distinct color schemes for quick scanning.
 */
const EventModeBadge = ({ mode }: { mode: string }) => {
  const normalizedMode = mode?.toLowerCase() || "";

  let colorClass = "bg-gray-800 text-gray-400 border-gray-700"; // Default

  if (normalizedMode.includes("online")) {
    // Indigo/Blue for Digital
    colorClass = "bg-indigo-900/30 text-indigo-300 border-indigo-800";
  } else if (normalizedMode.includes("person")) {
    // Rose/Pink for Physical
    colorClass = "bg-rose-900/30 text-rose-300 border-rose-800";
  } else if (normalizedMode.includes("hybrid")) {
    // Amber/Orange for Mixed
    colorClass = "bg-amber-900/30 text-amber-300 border-amber-800";
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide ${colorClass}`}
    >
      {mode}
    </span>
  );
};

export default EventModeBadge;