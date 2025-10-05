import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        {
          'rounded-md': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'rounded h-4': variant === 'text',
        },
        className
      )}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-end space-x-2" style={{ height: 40 }}>
              <Skeleton
                className="flex-1"
                height={Math.random() * 30 + 10}
              />
              <Skeleton
                className="flex-1"
                height={Math.random() * 30 + 10}
              />
              <Skeleton
                className="flex-1"
                height={Math.random() * 30 + 10}
              />
              <Skeleton
                className="flex-1"
                height={Math.random() * 30 + 10}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}