'use client';

import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Field } from '@/types/field';

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (field: Omit<Field, 'id'>) => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Field name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  cropType: Yup.string()
    .required('Crop type is required')
    .min(2, 'Crop type must be at least 2 characters'),
  area: Yup.number()
    .required('Area is required')
    .positive('Area must be a positive number')
    .max(10000, 'Area seems too large. Please verify.'),
  soilMoisture: Yup.number()
    .required('Soil moisture is required')
    .min(0, 'Soil moisture must be between 0 and 100')
    .max(100, 'Soil moisture must be between 0 and 100'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['healthy', 'warning', 'critical'], 'Invalid status'),
});

const cropOptions = [
  { value: '', label: 'Select crop type' },
  { value: 'Wheat', label: 'Wheat' },
  { value: 'Corn', label: 'Corn' },
  { value: 'Rice', label: 'Rice' },
  { value: 'Soybeans', label: 'Soybeans' },
  { value: 'Barley', label: 'Barley' },
  { value: 'Cotton', label: 'Cotton' },
  { value: 'Tomatoes', label: 'Tomatoes' },
  { value: 'Potatoes', label: 'Potatoes' },
];

const statusOptions = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' },
];

export default function AddFieldModal({
  isOpen,
  onClose,
  onSubmit,
}: AddFieldModalProps) {
  const initialValues: Omit<Field, 'id'> = {
    name: '',
    cropType: '',
    area: 0,
    soilMoisture: 50,
    lastIrrigated: new Date(),
    status: 'healthy',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Field" size="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Field Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Field Name *
              </label>
              <FormikField
                name="name"
                type="text"
                placeholder="e.g., North Field"
                className="input mt-1"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Crop Type */}
            <div>
              <label
                htmlFor="cropType"
                className="block text-sm font-medium text-gray-700"
              >
                Crop Type *
              </label>
              <FormikField
                as="select"
                name="cropType"
                className="input mt-1"
              >
                {cropOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormikField>
              <ErrorMessage
                name="cropType"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Area */}
            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700"
              >
                Area (hectares) *
              </label>
              <FormikField
                name="area"
                type="number"
                step="0.1"
                placeholder="e.g., 25.5"
                className="input mt-1"
              />
              <ErrorMessage
                name="area"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Soil Moisture */}
            <div>
              <label
                htmlFor="soilMoisture"
                className="block text-sm font-medium text-gray-700"
              >
                Current Soil Moisture (%) *
              </label>
              <FormikField
                name="soilMoisture"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 65"
                className="input mt-1"
              />
              <ErrorMessage
                name="soilMoisture"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${values.soilMoisture}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status *
              </label>
              <FormikField
                as="select"
                name="status"
                className="input mt-1"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormikField>
              <ErrorMessage
                name="status"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Last Irrigated */}
            <div>
              <label
                htmlFor="lastIrrigated"
                className="block text-sm font-medium text-gray-700"
              >
                Last Irrigated Date
              </label>
              <FormikField
                name="lastIrrigated"
                type="date"
                className="input mt-1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('lastIrrigated', new Date(e.target.value));
                }}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Field'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}