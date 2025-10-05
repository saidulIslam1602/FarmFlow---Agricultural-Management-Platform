'use client';

import React, { useState } from 'react';
import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Field } from '@/types/field';
import { 
  MapPin, 
  Sprout, 
  Droplets, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import clsx from 'clsx';

interface EnhancedAddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (field: Omit<Field, 'id'>) => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Field name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Only letters, numbers and spaces allowed'),
  cropType: Yup.string()
    .required('Crop type is required')
    .min(2, 'Crop type must be at least 2 characters'),
  area: Yup.number()
    .required('Area is required')
    .positive('Area must be a positive number')
    .min(0.1, 'Area must be at least 0.1 hectares')
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
  { value: '', label: 'Select crop type', icon: '' },
  { value: 'Wheat', label: 'Wheat', icon: '' },
  { value: 'Corn', label: 'Corn', icon: '' },
  { value: 'Rice', label: 'Rice', icon: '' },
  { value: 'Soybeans', label: 'Soybeans', icon: '' },
  { value: 'Barley', label: 'Barley', icon: '' },
  { value: 'Cotton', label: 'Cotton', icon: '' },
  { value: 'Tomatoes', label: 'Tomatoes', icon: '' },
  { value: 'Potatoes', label: 'Potatoes', icon: '' },
];

const statusOptions = [
  { value: 'healthy', label: 'Healthy', color: 'text-green-600', bg: 'bg-green-50' },
  { value: 'warning', label: 'Warning', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { value: 'critical', label: 'Critical', color: 'text-red-600', bg: 'bg-red-50' },
];

export default function EnhancedAddFieldModal({
  isOpen,
  onClose,
  onSubmit,
}: EnhancedAddFieldModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const initialValues: Omit<Field, 'id'> = {
    name: '',
    cropType: '',
    area: 0,
    soilMoisture: 50,
    lastIrrigated: new Date(),
    status: 'healthy',
  };

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 40) return { label: 'Too Low', color: 'text-red-600', icon: AlertCircle };
    if (moisture < 60) return { label: 'Optimal Range', color: 'text-yellow-600', icon: Info };
    return { label: 'Excellent', color: 'text-green-600', icon: CheckCircle2 };
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 40) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (moisture < 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-green-500 to-green-600';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Field" size="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            onSubmit(values);
            setSubmitting(false);
            resetForm();
            setCurrentStep(1);
          }, 1000);
        }}
      >
        {({ isSubmitting, values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Progress Steps */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={clsx(
                        'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                        currentStep >= step
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 bg-white text-gray-400'
                      )}
                    >
                      {currentStep > step ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="font-semibold">{step}</span>
                      )}
                    </div>
                    <span
                      className={clsx(
                        'mt-2 text-xs font-medium transition-colors',
                        currentStep >= step ? 'text-primary-600' : 'text-gray-400'
                      )}
                    >
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Field Details'}
                      {step === 3 && 'Status'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                <div
                  className="h-full bg-primary-600 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-up">
                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900">Getting Started</h4>
                      <p className="mt-1 text-xs text-blue-700">
                        Let&apos;s start by giving your field a unique name and selecting the crop type.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Field Name */}
                <div>
                  <label htmlFor="name" className="mb-2 flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    <span>Field Name *</span>
                  </label>
                  <FormikField
                    name="name"
                    type="text"
                    placeholder="e.g., North Field, Valley Farm"
                    className={clsx(
                      'input',
                      errors.name && touched.name && 'border-red-500'
                    )}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-2 flex items-center space-x-1 text-sm text-red-600"
                  >
                    {(msg) => (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        <span>{msg}</span>
                      </>
                    )}
                  </ErrorMessage>
                  {values.name && !errors.name && (
                    <div className="mt-2 flex items-center space-x-1 text-sm text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Great name!</span>
                    </div>
                  )}
                </div>

                {/* Crop Type */}
                <div>
                  <label htmlFor="cropType" className="mb-2 flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Sprout className="h-4 w-4 text-primary-600" />
                    <span>Crop Type *</span>
                  </label>
                  <FormikField
                    as="select"
                    name="cropType"
                    className={clsx(
                      'input',
                      errors.cropType && touched.cropType && 'border-red-500'
                    )}
                  >
                    {cropOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormikField>
                  <ErrorMessage
                    name="cropType"
                    component="div"
                    className="mt-2 flex items-center space-x-1 text-sm text-red-600"
                  >
                    {(msg) => (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        <span>{msg}</span>
                      </>
                    )}
                  </ErrorMessage>
                </div>
              </div>
            )}

            {/* Step 2: Field Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-900">Field Measurements</h4>
                      <p className="mt-1 text-xs text-green-700">
                        Provide the area size and current soil moisture level.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label htmlFor="area" className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary-600" />
                      <span>Area (hectares) *</span>
                    </span>
                    {values.area > 0 && (
                      <span className="text-xs font-normal text-gray-500">
                        ≈ {(values.area * 2.471).toFixed(2)} acres
                      </span>
                    )}
                  </label>
                  <FormikField
                    name="area"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25.5"
                    className={clsx(
                      'input',
                      errors.area && touched.area && 'border-red-500'
                    )}
                  />
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="mt-2 flex items-center space-x-1 text-sm text-red-600"
                  >
                    {(msg) => (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        <span>{msg}</span>
                      </>
                    )}
                  </ErrorMessage>
                </div>

                {/* Soil Moisture */}
                <div>
                  <label htmlFor="soilMoisture" className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-primary-600" />
                      <span>Current Soil Moisture (%) *</span>
                    </span>
                    <span className={clsx('text-xs font-semibold', getMoistureStatus(values.soilMoisture).color)}>
                      {getMoistureStatus(values.soilMoisture).label}
                    </span>
                  </label>
                  
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={values.soilMoisture}
                      onChange={(e) => setFieldValue('soilMoisture', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, 
                          ${values.soilMoisture < 40 ? '#ef4444' : values.soilMoisture < 60 ? '#f59e0b' : '#22c55e'} 0%, 
                          ${values.soilMoisture < 40 ? '#ef4444' : values.soilMoisture < 60 ? '#f59e0b' : '#22c55e'} ${values.soilMoisture}%, 
                          #e5e7eb ${values.soilMoisture}%, 
                          #e5e7eb 100%)`
                      }}
                    />
                    
                    <div className="flex items-center justify-between">
                      <FormikField
                        name="soilMoisture"
                        type="number"
                        min="0"
                        max="100"
                        className="w-24 input text-center font-semibold"
                      />
                      
                      <div className="flex items-center space-x-2">
                        {React.createElement(getMoistureStatus(values.soilMoisture).icon, {
                          className: clsx('h-5 w-5', getMoistureStatus(values.soilMoisture).color)
                        })}
                      </div>
                    </div>

                    <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full transition-all duration-300 relative',
                          getMoistureColor(values.soilMoisture)
                        )}
                        style={{ width: `${values.soilMoisture}%` }}
                      >
                        <div className="absolute inset-0 animate-pulse-slow bg-white/20" />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Dry (0%)</span>
                      <span>Optimal (40-60%)</span>
                      <span>Saturated (100%)</span>
                    </div>
                  </div>
                </div>

                {/* Last Irrigated */}
                <div>
                  <label htmlFor="lastIrrigated" className="mb-2 flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span>Last Irrigated Date</span>
                  </label>
                  <FormikField
                    name="lastIrrigated"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    className="input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('lastIrrigated', new Date(e.target.value));
                    }}
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    When was this field last watered?
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Status */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-up">
                <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-purple-900">Almost Done!</h4>
                      <p className="mt-1 text-xs text-purple-700">
                        Select the current health status of your field.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Field Status *
                  </label>
                  <div className="grid gap-3">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className={clsx(
                          'relative flex items-center space-x-4 rounded-lg border-2 p-4 cursor-pointer transition-all',
                          values.status === option.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        )}
                      >
                        <FormikField
                          type="radio"
                          name="status"
                          value={option.value}
                          className="h-5 w-5 text-primary-600 focus:ring-primary-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={clsx('font-semibold', option.color)}>
                              {option.label}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {option.value === 'healthy' && 'Field is in good condition'}
                            {option.value === 'warning' && 'Field needs attention soon'}
                            {option.value === 'critical' && 'Field requires immediate action'}
                          </p>
                        </div>
                        {values.status === option.value && (
                          <CheckCircle2 className="h-5 w-5 text-primary-600" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Field Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{values.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crop:</span>
                      <span className="font-medium text-gray-900">{values.cropType || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium text-gray-900">{values.area || 0} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moisture:</span>
                      <span className="font-medium text-gray-900">{values.soilMoisture}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={clsx('font-medium capitalize', 
                        statusOptions.find(s => s.value === values.status)?.color
                      )}>
                        {values.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-between space-x-3 pt-4 border-t">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={isSubmitting}
                  >
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      (currentStep === 1 && (!values.name || !values.cropType || !!errors.name || !!errors.cropType)) ||
                      (currentStep === 2 && (!values.area || !!errors.area || !!errors.soilMoisture))
                    }
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Add Field</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}