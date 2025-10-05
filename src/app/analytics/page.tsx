'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import YieldPredictionChart from '@/components/charts/YieldPredictionChart';
import TemperatureHumidityChart from '@/components/charts/TemperatureHumidityChart';
import CropHealthMap from '@/components/charts/CropHealthMap';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-gray-500">
            Advanced insights and predictions for your farm operations
          </p>
        </div>

        <div className="space-y-6">
          <YieldPredictionChart />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <TemperatureHumidityChart />
            <CropHealthMap />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}