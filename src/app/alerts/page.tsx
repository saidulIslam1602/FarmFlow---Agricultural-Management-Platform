'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { AlertTriangle, Droplets, TrendingDown, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Critical Soil Moisture',
    description: 'West Hills field has critically low soil moisture (35%)',
    field: 'West Hills',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    icon: Droplets,
    actionable: true,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Yield Decrease Detected',
    description: 'Expected yield for South Valley decreased by 8%',
    field: 'South Valley',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: TrendingDown,
    actionable: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Irrigation Scheduled',
    description: 'Automatic irrigation scheduled for North Field tomorrow',
    field: 'North Field',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    icon: Bell,
    actionable: false,
  },
];

export default function AlertsPage() {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-800',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800',
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800',
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="mt-1 text-gray-500">
            Monitor and manage farm alerts and notifications
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warning</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Info</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            const style = getAlertStyle(alert.type);
            
            return (
              <Card
                key={alert.id}
                className={clsx('border-l-4', style.border, style.bg)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={clsx('rounded-lg p-2', style.badge)}>
                      <Icon className={clsx('h-6 w-6', style.icon)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {alert.title}
                        </h3>
                        <span
                          className={clsx(
                            'rounded-full px-2 py-0.5 text-xs font-medium uppercase',
                            style.badge
                          )}
                        >
                          {alert.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {alert.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Field: {alert.field}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(alert.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {alert.actionable && (
                    <button className="ml-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      Take Action
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}