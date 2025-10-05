'use client';

import Card from '@/components/ui/Card';
import { Droplets, Sprout, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const activities = [
  {
    id: 1,
    type: 'irrigation',
    message: 'North Field irrigated',
    time: new Date(Date.now() - 1000 * 60 * 30),
    icon: Droplets,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 2,
    type: 'planting',
    message: 'New crop planted in South Valley',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: Sprout,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    id: 3,
    type: 'alert',
    message: 'Low soil moisture in West Hills',
    time: new Date(Date.now() - 1000 * 60 * 60 * 4),
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    id: 4,
    type: 'harvest',
    message: 'East Meadow harvest completed',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
];

export default function RecentActivities() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`rounded-lg p-2 ${activity.bg}`}>
                <Icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}