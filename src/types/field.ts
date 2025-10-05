export interface Field {
  id: string;
  name: string;
  cropType: string;
  area: number;
  soilMoisture: number;
  lastIrrigated: Date;
  status: 'healthy' | 'warning' | 'critical';
}

export interface Sensor {
  id: string;
  fieldId: string;
  type: 'moisture' | 'temperature' | 'humidity' | 'ph';
  value: number;
  unit: string;
  timestamp: Date;
}

export interface Activity {
  id: string;
  fieldId: string;
  type: 'irrigation' | 'planting' | 'harvest' | 'fertilization' | 'alert';
  description: string;
  timestamp: Date;
}