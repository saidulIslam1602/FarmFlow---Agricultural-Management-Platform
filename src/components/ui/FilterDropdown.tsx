'use client';

import { useState, useRef, useEffect } from 'react';
import { Filter, Check } from 'lucide-react';
import clsx from 'clsx';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export default function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center space-x-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
          selectedValues.length > 0
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        )}
      >
        <Filter className="h-4 w-4" />
        <span>{label}</span>
        {selectedValues.length > 0 && (
          <span className="rounded-full bg-primary-600 px-2 py-0.5 text-xs text-white">
            {selectedValues.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border bg-white shadow-lg">
          <div className="border-b p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{label}</span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                    isSelected
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}