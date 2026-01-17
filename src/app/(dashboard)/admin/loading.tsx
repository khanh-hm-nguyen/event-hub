export default function AdminLoading() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>
        <div className="h-12 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>

      {/* Table Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="h-20 w-full bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center px-6 gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}