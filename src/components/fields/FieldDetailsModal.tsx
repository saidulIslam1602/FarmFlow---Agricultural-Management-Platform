'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Field } from '@/types/field';
import {
  MapPin,
  Sprout,
  Droplets,
  Calendar,
  TrendingUp,
  Activity,
  Download,
  Edit,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface FieldDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: Field;
  onEdit?: (field: Field) => void;
}

export default function FieldDetailsModal({
  isOpen,
  onClose,
  field,
  onEdit,
}: FieldDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'analytics'>('overview');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="success">{status}</Badge>;
      case 'warning':
        return <Badge variant="warning">{status}</Badge>;
      case 'critical':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 40) return 'text-red-600';
    if (moisture < 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Mock data for history
  const irrigationHistory = [
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), amount: 25, duration: '2h 30m' },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), amount: 30, duration: '3h 15m' },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), amount: 28, duration: '2h 45m' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={field.name} size="xl">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <Sprout className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{field.name}</h3>
              <p className="text-sm text-gray-500">{field.cropType}</p>
            </div>
            {getStatusBadge(field.status)}
          </div>
          
          <div className="flex space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" icon={<Edit />} onClick={() => onEdit(field)}>
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" icon={<Download />}>
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {(['overview', 'history', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'border-b-2 pb-3 text-sm font-medium transition-colors',
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-medium">Area</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">{field.area}</p>
                <p className="text-xs text-gray-500">hectares</p>
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Droplets className="h-4 w-4" />
                  <span className="text-xs font-medium">Soil Moisture</span>
                </div>
                <p className={clsx('mt-2 text-2xl font-bold', getMoistureColor(field.soilMoisture))}>
                  {field.soilMoisture}%
                </p>
                <p className="text-xs text-gray-500">
                  {field.soilMoisture < 40 ? 'Low' : field.soilMoisture < 60 ? 'Optimal' : 'High'}
                </p>
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-medium">Last Irrigated</span>
                </div>
                <p className="mt-2 text-sm font-bold text-gray-900">
                  {formatDistanceToNow(field.lastIrrigated, { addSuffix: true })}
                </p>
                <p className="text-xs text-gray-500">
                  {format(field.lastIrrigated, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            {/* Moisture Progress */}
            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Moisture Level</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current</span>
                  <span className={clsx('font-bold', getMoistureColor(field.soilMoisture))}>
                    {field.soilMoisture}%
                  </span>
                </div>
                <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full transition-all duration-500',
                      field.soilMoisture < 40
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : field.soilMoisture < 60
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    )}
                    style={{ width: `${field.soilMoisture}%` }}
                  >
                    <div className="h-full w-full animate-pulse-slow bg-white/20" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>Optimal (40-60%)</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
              <h4 className="flex items-center space-x-2 text-sm font-semibold text-blue-900">
                <Activity className="h-4 w-4" />
                <span>Recommendations</span>
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                {field.soilMoisture < 40 && (
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Schedule irrigation soon - moisture level is low</span>
                  </li>
                )}
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Next inspection recommended in 3 days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Consider soil testing for optimal fertilization</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Irrigation History</h4>
            <div className="space-y-3">
              {irrigationHistory.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Irrigation - {record.amount}mm
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(record.date, 'MMM dd, yyyy')} • {record.duration}
                      </p>
                    </div>
                  </div>
                  <Badge variant="info">{formatDistanceToNow(record.date, { addSuffix: true })}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Field Analytics</h4>
            <div className="rounded-lg border p-4 text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-3 text-sm text-gray-600">
                Advanced analytics coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}