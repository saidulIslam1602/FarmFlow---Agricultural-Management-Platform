import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Droplets, Calendar, MapPin, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Field } from '@/types/field';
import { format } from 'date-fns';
import clsx from 'clsx';

interface FieldCardProps {
  field: Field;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

export default function FieldCard({ field, onDelete, onClick }: FieldCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 40) return 'text-red-600';
    if (moisture < 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMoistureGradient = (moisture: number) => {
    if (moisture < 40) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (moisture < 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-green-500 to-green-600';
  };

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      {/* Status Indicator Bar */}
      <div
        className={clsx(
          'absolute left-0 top-0 h-1 w-full',
          field.status === 'healthy' && 'bg-green-500',
          field.status === 'warning' && 'bg-yellow-500',
          field.status === 'critical' && 'bg-red-500'
        )}
      />

      <div className="flex items-start justify-between pt-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {field.name}
          </h3>
          <p className="text-sm text-gray-500">{field.cropType}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span
            className={clsx(
              'rounded-full border px-3 py-1 text-xs font-medium',
              getStatusColor(field.status)
            )}
          >
            {field.status}
          </span>
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div 
                className="absolute right-0 z-10 mt-2 w-48 rounded-lg border bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="flex w-full items-center space-x-2 rounded-t-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Edit functionality
                  }}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Field</span>
                </button>
                <button
                  className="flex w-full items-center space-x-2 rounded-b-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    onDelete?.(field.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Field</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors group-hover:bg-primary-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Area</span>
          </div>
          <span className="font-semibold text-gray-900">{field.area} ha</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors group-hover:bg-primary-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Droplets className="h-4 w-4" />
            <span>Soil Moisture</span>
          </div>
          <span className={clsx('font-semibold', getMoistureColor(field.soilMoisture))}>
            {field.soilMoisture}%
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors group-hover:bg-primary-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last Irrigated</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {format(field.lastIrrigated, 'MMM dd, yyyy')}
          </span>
        </div>
      </div>

      {/* Enhanced Moisture Progress Bar */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Moisture Level</span>
          <span className="text-xs font-semibold text-gray-900">{field.soilMoisture}%</span>
        </div>
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-1000 ease-out',
              getMoistureGradient(field.soilMoisture)
            )}
            style={{ width: `${field.soilMoisture}%` }}
          >
            <div className="h-full w-full animate-pulse-slow opacity-50 bg-white/20" />
          </div>
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </Card>
  );
}