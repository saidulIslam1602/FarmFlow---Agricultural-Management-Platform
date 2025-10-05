'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MapPin, 
  BarChart3, 
  Settings, 
  Bell,
  X,
  Sprout
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Fields', href: '/fields', icon: MapPin },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform hover:scale-105"
              aria-label="Go to dashboard"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md">
                <Sprout className="h-6 w-6 text-white" aria-label="Farm icon" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                FarmFlow
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'group flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    className={clsx(
                      'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
                      isActive && 'text-primary-600'
                    )} 
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
              <p className="text-xs font-semibold text-primary-900">
                FarmFlow v1.0
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Agricultural Management
              </p>
              <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}