"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EventTableFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(
    searchParams.get("query")?.toString() || ""
  );

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); 
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query !== searchParams.get("query")) {
        updateUrl("query", query);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); 

  return (
    // Container: Darker background to separate from page
    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-gray-900/50 p-4 rounded-xl border border-gray-800 backdrop-blur-sm">
      {/* Search Input*/}
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Search events by title..."
          // Dark input styling
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="w-5 h-5 text-gray-500 absolute left-3 top-2.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-2 w-full sm:w-auto">
        <select
          // Dark select styling
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer hover:bg-gray-750 transition-colors"
          onChange={(e) => updateUrl("status", e.target.value)}
          defaultValue={searchParams.get("status")?.toString()}
        >
          <option value="">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="today">Today</option>
          <option value="past">Past</option>
        </select>
      </div>
    </div>
  );
};

export default EventTableFilters;