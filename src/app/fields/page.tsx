'use client';

import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FieldCard from '@/components/fields/FieldCard';
import EnhancedAddFieldModal from '@/components/fields/EnhancedAddFieldModal';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import FieldDetailsModal from '@/components/fields/FieldDetailsModal';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import FilterDropdown from '@/components/ui/FilterDropdown';
import EmptyState from '@/components/ui/EmptyState';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/ToastContainer';
import { useFields } from '@/hooks/useFields';
import { Plus, MapPin, ArrowUpDown, AlertCircle } from 'lucide-react';
import { Field } from '@/types/field';

type SortOption = 'name' | 'area' | 'moisture' | 'date';
type SortDirection = 'asc' | 'desc';

export default function FieldsPage() {
  const { fields, isLoading, error, addField, deleteField: deleteFieldApi } = useFields();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<Field | null>(null);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const { showToast } = useToast();

  const statusOptions = [
    { label: 'Healthy', value: 'healthy' },
    { label: 'Warning', value: 'warning' },
    { label: 'Critical', value: 'critical' },
  ];

  const cropOptions = useMemo(() => {
    const crops = [...new Set(fields.map((f) => f.cropType))];
    return crops.map((crop) => ({ label: crop, value: crop }));
  }, [fields]);

  const filteredAndSortedFields = useMemo(() => {
    let result = [...fields];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (field) =>
          field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          field.cropType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      result = result.filter((field) => selectedStatuses.includes(field.status));
    }

    // Crop type filter
    if (selectedCrops.length > 0) {
      result = result.filter((field) => selectedCrops.includes(field.cropType));
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'area':
          comparison = a.area - b.area;
          break;
        case 'moisture':
          comparison = a.soilMoisture - b.soilMoisture;
          break;
        case 'date':
          comparison = a.lastIrrigated.getTime() - b.lastIrrigated.getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [fields, searchQuery, selectedStatuses, selectedCrops, sortBy, sortDirection]);

  const handleAddField = async (newField: Omit<Field, 'id'>) => {
    setIsSubmitting(true);
    
    try {
      const field = await addField(newField);
      setIsModalOpen(false);
      showToast('success', 'Field added successfully', `${field.name} has been added to your farm.`);
    } catch (error) {
      showToast('error', 'Failed to add field', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteField = (field: Field) => {
    setFieldToDelete(field);
  };

  const confirmDelete = async () => {
    if (fieldToDelete) {
      try {
        await deleteFieldApi(fieldToDelete.id);
        showToast('success', 'Field deleted', `${fieldToDelete.name} has been removed.`);
        setFieldToDelete(null);
      } catch (error) {
        showToast('error', 'Failed to delete field', error instanceof Error ? error.message : 'Please try again');
      }
    }
  };

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const stats = {
    total: fields.length,
    healthy: fields.filter((f) => f.status === 'healthy').length,
    warning: fields.filter((f) => f.status === 'warning').length,
    critical: fields.filter((f) => f.status === 'critical').length,
    totalArea: fields.reduce((sum, f) => sum + f.area, 0).toFixed(1),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fields</h1>
            <p className="mt-1 text-gray-500">
              Manage and monitor your agricultural fields • Real-time data
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} icon={<Plus />} disabled={isLoading}>
            Add Field
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-900">Error Loading Fields</h4>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">Total Fields</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">Total Area</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalArea} ha</p>
          </div>
          <div className="rounded-lg border bg-green-50 p-4">
            <p className="text-sm text-green-700">Healthy</p>
            <p className="mt-1 text-2xl font-bold text-green-900">{stats.healthy}</p>
          </div>
          <div className="rounded-lg border bg-yellow-50 p-4">
            <p className="text-sm text-yellow-700">Warning</p>
            <p className="mt-1 text-2xl font-bold text-yellow-900">{stats.warning}</p>
          </div>
          <div className="rounded-lg border bg-red-50 p-4">
            <p className="text-sm text-red-700">Critical</p>
            <p className="mt-1 text-2xl font-bold text-red-900">{stats.critical}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Search fields..."
            onSearch={setSearchQuery}
            className="flex-1"
          />
          
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              selectedValues={selectedStatuses}
              onChange={setSelectedStatuses}
            />
            
            <FilterDropdown
              label="Crop Type"
              options={cropOptions}
              selectedValues={selectedCrops}
              onChange={setSelectedCrops}
            />

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input h-10 cursor-pointer pr-10 text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="area">Sort by Area</option>
                <option value="moisture">Sort by Moisture</option>
                <option value="date">Sort by Last Irrigated</option>
              </select>
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredAndSortedFields.length} of {fields.length} fields
          </span>
          {(searchQuery || selectedStatuses.length > 0 || selectedCrops.length > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatuses([]);
                setSelectedCrops([]);
              }}
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Fields Grid */}
        {isLoading && !error ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="Unable to load fields"
            description="There was an error loading your fields. Please refresh the page."
            action={{
              label: 'Retry',
              onClick: () => window.location.reload(),
            }}
          />
        ) : filteredAndSortedFields.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="No fields found"
            description={
              searchQuery || selectedStatuses.length > 0 || selectedCrops.length > 0
                ? "Try adjusting your search or filters"
                : "Get started by adding your first field"
            }
            action={{
              label: 'Add Field',
              onClick: () => setIsModalOpen(true),
              icon: <Plus />,
            }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedFields.map((field) => (
              <div
                key={field.id}
                onClick={() => setSelectedField(field)}
                className="cursor-pointer"
              >
                <FieldCard
                  field={field}
                  onDelete={(id) => handleDeleteField(field)}
                />
              </div>
            ))}
          </div>
        )}

        <EnhancedAddFieldModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddField}
        />

        <ConfirmationModal
          isOpen={fieldToDelete !== null}
          onClose={() => setFieldToDelete(null)}
          onConfirm={confirmDelete}
          title="Delete Field?"
          message={`Are you sure you want to delete "${fieldToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />

        {selectedField && (
          <FieldDetailsModal
            isOpen={selectedField !== null}
            onClose={() => setSelectedField(null)}
            field={selectedField}
            onEdit={(field) => {
              showToast('info', 'Edit feature', 'Edit functionality coming soon!');
              setSelectedField(null);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}