'use client';

import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

const icons = {
  danger: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const styles = {
  danger: {
    icon: 'text-red-600',
    bg: 'bg-red-50',
    button: 'bg-red-600 hover:bg-red-700 text-white',
  },
  warning: {
    icon: 'text-yellow-600',
    bg: 'bg-yellow-50',
    button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  },
  info: {
    icon: 'text-blue-600',
    bg: 'bg-blue-50',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  success: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
    button: 'bg-green-600 hover:bg-green-700 text-white',
  },
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const Icon = icons[type];
  const style = styles[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="text-center">
        <div className={clsx('mx-auto flex h-16 w-16 items-center justify-center rounded-full', style.bg)}>
          <Icon className={clsx('h-8 w-8', style.icon)} />
        </div>
        
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={clsx('flex-1', style.button)}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}