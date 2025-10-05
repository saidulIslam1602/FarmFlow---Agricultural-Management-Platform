// Local storage utilities for data persistence
import { Field } from '@/types/field';

const STORAGE_KEY = 'farmflow_fields';

// Initial mock data for first-time users
const INITIAL_FIELDS: Field[] = [
  {
    id: '1',
    name: 'North Field',
    cropType: 'Wheat',
    area: 25.5,
    soilMoisture: 68,
    lastIrrigated: new Date('2025-10-03'),
    status: 'healthy',
  },
  {
    id: '2',
    name: 'South Valley',
    cropType: 'Corn',
    area: 32.8,
    soilMoisture: 45,
    lastIrrigated: new Date('2025-09-28'),
    status: 'warning',
  },
  {
    id: '3',
    name: 'East Meadow',
    cropType: 'Soybeans',
    area: 18.2,
    soilMoisture: 72,
    lastIrrigated: new Date('2025-10-04'),
    status: 'healthy',
  },
  {
    id: '4',
    name: 'West Hills',
    cropType: 'Rice',
    area: 41.5,
    soilMoisture: 35,
    lastIrrigated: new Date('2025-09-25'),
    status: 'critical',
  },
];

export const storage = {
  // Get all fields
  getFields(): Field[] {
    if (typeof window === 'undefined') return INITIAL_FIELDS;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // First time - initialize with mock data
        this.setFields(INITIAL_FIELDS);
        return INITIAL_FIELDS;
      }
      
      const fields = JSON.parse(data);
      // Convert date strings back to Date objects
      return fields.map((field: any) => ({
        ...field,
        lastIrrigated: new Date(field.lastIrrigated),
      }));
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return INITIAL_FIELDS;
    }
  },

  // Save all fields
  setFields(fields: Field[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  // Get single field
  getField(id: string): Field | undefined {
    const fields = this.getFields();
    return fields.find((field) => field.id === id);
  },

  // Add new field
  addField(field: Omit<Field, 'id'>): Field {
    const fields = this.getFields();
    const newField: Field = {
      ...field,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    };
    fields.push(newField);
    this.setFields(fields);
    return newField;
  },

  // Update field
  updateField(id: string, updates: Partial<Field>): Field | undefined {
    const fields = this.getFields();
    const index = fields.findIndex((field) => field.id === id);
    
    if (index === -1) return undefined;
    
    fields[index] = { ...fields[index], ...updates };
    this.setFields(fields);
    return fields[index];
  },

  // Delete field
  deleteField(id: string): boolean {
    const fields = this.getFields();
    const filteredFields = fields.filter((field) => field.id !== id);
    
    if (filteredFields.length === fields.length) return false;
    
    this.setFields(filteredFields);
    return true;
  },

  // Clear all data (for testing)
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};