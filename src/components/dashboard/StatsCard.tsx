import { ReactNode } from 'react';
import Card from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  trend: 'up' | 'down';
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          <div className="mt-2 flex items-center">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={clsx(
                'ml-1 text-sm font-medium',
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {Math.abs(change)}%
            </span>
            <span className="ml-1 text-sm text-gray-500">vs last period</span>
          </div>
        </div>
        <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}