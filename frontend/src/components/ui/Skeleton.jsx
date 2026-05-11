export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
);

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3 p-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/6" />
      </div>
    ))}
  </div>
);
