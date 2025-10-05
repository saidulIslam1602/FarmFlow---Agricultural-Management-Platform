'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-500">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Information
            </h3>
            <div className="space-y-4">
              <Input label="Full Name" defaultValue="Farm Manager" />
              <Input label="Email" type="email" defaultValue="manager@farm.com" />
              <Input label="Phone" type="tel" defaultValue="+47 123 45 678" />
              <Button icon={<Save />}>Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Critical alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Weekly reports</span>
              </label>
              <Button icon={<Save />} className="mt-4">Save Preferences</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Farm Configuration
            </h3>
            <div className="space-y-4">
              <Input label="Farm Name" defaultValue="Green Valley Farm" />
              <Input label="Location" defaultValue="Trondheim, Norway" />
              <Input label="Total Area (ha)" type="number" defaultValue="120.5" />
              <Button icon={<Save />}>Update Configuration</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">Oct 5, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Fields</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Sensors</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}