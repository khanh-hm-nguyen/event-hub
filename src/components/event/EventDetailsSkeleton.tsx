const EventDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="space-y-4 mb-12">
        <div className="h-10 bg-white/10 rounded-xl w-1/3" /> {/* Title */}
        <div className="h-4 bg-white/5 rounded-md w-2/3" />   {/* Description */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Banner Image Placeholder */}
          <div className="w-full aspect-video bg-white/10 rounded-[2.5rem] border border-white/5" />

          {/* Overview Section */}
          <div className="space-y-4">
            <div className="h-7 bg-white/10 rounded-lg w-32" />
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded-md w-full" />
              <div className="h-4 bg-white/5 rounded-md w-full" />
              <div className="h-4 bg-white/5 rounded-md w-4/5" />
            </div>
          </div>

          {/* Details Grid (Icon items) */}
          <div className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/10 rounded-full" />
                <div className="h-4 bg-white/5 rounded-md w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
            <div className="h-6 bg-white/10 rounded-lg w-1/2" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            
            {/* Input Placeholders */}
            <div className="space-y-4 pt-4">
              <div className="h-12 bg-white/5 border border-white/10 rounded-xl w-full" />
              <div className="h-12 bg-[#5dfeca]/10 border border-[#5dfeca]/20 rounded-xl w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Events Bottom Section */}
      <div className="mt-20 pt-10 border-t border-white/10 space-y-8">
        <div className="h-7 bg-white/10 rounded-lg w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-white/5 rounded-3xl border border-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;