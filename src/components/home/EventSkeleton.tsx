const SkeletonCard = () => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="w-full aspect-video bg-white/10 rounded-2xl" />

    {/* Content Placeholder */}
    <div className="space-y-3">
      {/* Title Bar */}
      <div className="h-6 bg-white/10 rounded-lg w-3/4" />
      
      {/* Description Bars */}
      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded-md w-full" />
        <div className="h-3 bg-white/5 rounded-md w-5/6" />
      </div>

      {/* Footer / Meta Data */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-4 bg-white/10 rounded-md w-24" />
        <div className="h-8 w-20 bg-[#5dfeca]/20 rounded-xl" />
      </div>
    </div>
  </div>
);

const EventSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Render 3 to 6 skeletons to fill the grid during initial load */}
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default EventSkeleton;