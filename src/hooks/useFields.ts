import { useState, useEffect, useCallback } from 'react';
import { Field } from '@/types/field';
import { fieldsApi } from '@/lib/api';

export function useFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all fields
  const fetchFields = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fieldsApi.getAll();
      setFields(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fields');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  // Add new field
  const addField = useCallback(async (field: Omit<Field, 'id'>) => {
    try {
      const newField = await fieldsApi.create(field);
      setFields((prev) => [...prev, newField]);
      return newField;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add field');
    }
  }, []);

  // Update field
  const updateField = useCallback(async (id: string, updates: Partial<Field>) => {
    try {
      const updatedField = await fieldsApi.update(id, updates);
      setFields((prev) =>
        prev.map((field) => (field.id === id ? updatedField : field))
      );
      return updatedField;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update field');
    }
  }, []);

  // Delete field
  const deleteField = useCallback(async (id: string) => {
    try {
      await fieldsApi.delete(id);
      setFields((prev) => prev.filter((field) => field.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete field');
    }
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    fetchFields();
  }, [fetchFields]);

  return {
    fields,
    isLoading,
    error,
    addField,
    updateField,
    deleteField,
    refresh,
  };
}