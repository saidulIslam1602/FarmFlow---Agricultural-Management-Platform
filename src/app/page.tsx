'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import EnhancedCropYieldChart from '@/components/charts/EnhancedCropYieldChart';
import EnhancedSoilMoistureChart from '@/components/charts/EnhancedSoilMoistureChart';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import RecentActivities from '@/components/dashboard/RecentActivities';
import { Sprout, Droplets, TrendingUp, AlertTriangle } from 'lucide-react';
import { ToastProvider } from '@/components/ui/ToastContainer';

export default function HomePage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <ToastProvider>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-gray-500">
                Monitor your farm operations in real-time
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="input w-full sm:w-auto"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Active Fields"
              value="24"
              change={8}
              icon={<Sprout className="h-6 w-6" />}
              trend="up"
            />
            <StatsCard
              title="Avg. Soil Moisture"
              value="67%"
              change={-3}
              icon={<Droplets className="h-6 w-6" />}
              trend="down"
            />
            <StatsCard
              title="Expected Yield"
              value="1,842 kg"
              change={12}
              icon={<TrendingUp className="h-6 w-6" />}
              trend="up"
            />
            <StatsCard
              title="Active Alerts"
              value="3"
              change={-2}
              icon={<AlertTriangle className="h-6 w-6" />}
              trend="down"
            />
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <EnhancedCropYieldChart timeRange={timeRange} />
            <EnhancedSoilMoistureChart timeRange={timeRange} />
          </div>

          {/* Bottom Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>
            <div>
              <WeatherWidget />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ToastProvider>
  );
}