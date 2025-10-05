'use client';

import Card from '@/components/ui/Card';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Weather</h3>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current</p>
            <p className="text-4xl font-bold text-gray-900">24°C</p>
            <p className="text-sm text-gray-600">Partly Cloudy</p>
          </div>
          <Cloud className="h-16 w-16 text-gray-400" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <Droplets className="mx-auto h-5 w-5 text-blue-500" />
            <p className="mt-1 text-xs text-gray-500">Humidity</p>
            <p className="font-semibold text-gray-900">65%</p>
          </div>
          <div className="text-center">
            <Wind className="mx-auto h-5 w-5 text-gray-500" />
            <p className="mt-1 text-xs text-gray-500">Wind</p>
            <p className="font-semibold text-gray-900">12 km/h</p>
          </div>
          <div className="text-center">
            <Sun className="mx-auto h-5 w-5 text-yellow-500" />
            <p className="mt-1 text-xs text-gray-500">UV Index</p>
            <p className="font-semibold text-gray-900">6</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Forecast</h4>
          {['Mon', 'Tue', 'Wed'].map((day, idx) => (
            <div
              key={day}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600">{day}</span>
              <div className="flex items-center space-x-2">
                <Cloud className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {22 + idx}°C
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}