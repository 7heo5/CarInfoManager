export interface Customer {
  id?: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  customerId?: number | null;
  customer?: Customer | null;
}

export interface NewCar {
  make: string;
  model: string;
  year: number;
  vin: string;
  customer: Customer;
}

export interface ServiceRecord {
  id: number;
  carId: number;
  date: string;
  serviceType: string;
  notes?: string | null;
  cost: number;
}

export interface ServiceRecordForm {
  date: string;
  serviceType: string;
  notes: string;
  cost: string;
}

export interface ServiceRecordEditForm {
  id?: number;
  carId?: number;
  date: string;
  serviceType: string;
  notes: string;
  cost: string;
}

export type ECUCodeStatus = "Pending" | "Resolved";

export interface ECUCode {
  id: number;
  carId: number;
  code: string;
  description: string;
  status: ECUCodeStatus;
  loggedDate: string;
}

export interface ECUCodeForm {
  code: string;
  description: string;
  status: ECUCodeStatus;
}
