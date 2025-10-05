'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    text: 'text-green-900',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    text: 'text-red-900',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    text: 'text-yellow-900',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-900',
  },
};

export default function Toast({
  type,
  message,
  description,
  onClose,
  duration = 5000,
}: ToastProps) {
  const Icon = icons[type];
  const style = styles[type];

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        style.bg,
        'animate-slide-up'
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={clsx('h-6 w-6', style.icon)} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={clsx('text-sm font-medium', style.text)}>{message}</p>
            {description && (
              <p className={clsx('mt-1 text-sm', style.text, 'opacity-75')}>
                {description}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={onClose}
              className={clsx(
                'inline-flex rounded-md hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2',
                style.icon
              )}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}