'use client';

import { Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1 lg:ml-0">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Good morning!</span> Here&apos;s what&apos;s happening on your farm today.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-300"></div>
        
        <button className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <User className="h-5 w-5" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            Farm Manager
          </span>
        </button>
      </div>
    </header>
  );
}