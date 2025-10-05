// API client for field operations
import { Field } from '@/types/field';

const API_BASE = '/api';

export const fieldsApi = {
  // Get all fields
  async getAll(): Promise<Field[]> {
    const response = await fetch(`${API_BASE}/fields`);
    if (!response.ok) throw new Error('Failed to fetch fields');
    return response.json();
  },

  // Get single field
  async getById(id: string): Promise<Field> {
    const response = await fetch(`${API_BASE}/fields/${id}`);
    if (!response.ok) throw new Error('Failed to fetch field');
    return response.json();
  },

  // Create new field
  async create(field: Omit<Field, 'id'>): Promise<Field> {
    const response = await fetch(`${API_BASE}/fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field),
    });
    if (!response.ok) throw new Error('Failed to create field');
    return response.json();
  },

  // Update field
  async update(id: string, field: Partial<Field>): Promise<Field> {
    const response = await fetch(`${API_BASE}/fields/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field),
    });
    if (!response.ok) throw new Error('Failed to update field');
    return response.json();
  },

  // Delete field
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/fields/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete field');
  },
};