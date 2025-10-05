'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = rect.left + scrollLeft + rect.width / 2;
          y = rect.top + scrollTop - 10;
          break;
        case 'bottom':
          x = rect.left + scrollLeft + rect.width / 2;
          y = rect.bottom + scrollTop + 10;
          break;
        case 'left':
          x = rect.left + scrollLeft - 10;
          y = rect.top + scrollTop + rect.height / 2;
          break;
        case 'right':
          x = rect.right + scrollLeft + 10;
          y = rect.top + scrollTop + rect.height / 2;
          break;
      }

      setCoords({ x, y });
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const tooltipPositionClasses = {
    top: '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {isMounted &&
        isVisible &&
        createPortal(
          <div
            className={clsx(
              'pointer-events-none fixed z-50 max-w-xs rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg transition-opacity duration-200',
              tooltipPositionClasses[position],
              'animate-fade-in'
            )}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
            role="tooltip"
          >
            {content}
            <div
              className={clsx(
                'absolute h-2 w-2 rotate-45 bg-gray-900',
                {
                  'bottom-full left-1/2 -translate-x-1/2 translate-y-1': position === 'top',
                  'top-full left-1/2 -translate-x-1/2 -translate-y-1': position === 'bottom',
                  'left-full top-1/2 -translate-x-1 -translate-y-1/2': position === 'left',
                  'right-full top-1/2 -translate-y-1/2 translate-x-1': position === 'right',
                }
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
}