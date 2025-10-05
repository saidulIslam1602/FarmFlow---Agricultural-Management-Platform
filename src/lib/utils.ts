import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}