import clsx from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          // Variants
          'bg-gray-100 text-gray-800 border border-gray-200': variant === 'default',
          'bg-green-100 text-green-800 border border-green-200': variant === 'success',
          'bg-yellow-100 text-yellow-800 border border-yellow-200': variant === 'warning',
          'bg-red-100 text-red-800 border border-red-200': variant === 'error',
          'bg-blue-100 text-blue-800 border border-blue-200': variant === 'info',
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  );
}