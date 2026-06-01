/** Shared domain types for the Shining Pearls Dental app. */

/** Identifier for the glossy 3D-style icon a service renders. */
export type ServiceIconKey =
  | 'cleaning'
  | 'whitening'
  | 'implants'
  | 'braces'
  | 'rootCanal'
  | 'pediatric';

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMins: number;
  icon: ServiceIconKey;
  /** Indicative starting price, in the clinic's local currency units. */
  fromPrice: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  /** Path to a photo in /public (clear swap point for real images). */
  photo: string;
  yearsExperience: number;
}

export interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  /** Optional free-text note from the patient. */
  notes?: string;
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export interface Appointment {
  id: string;
  serviceId: string;
  doctorId: string;
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  /** 24h slot label, e.g. "09:30". */
  timeSlot: string;
  patient: PatientInfo;
  status: AppointmentStatus;
  /** ISO timestamp of when the booking was created. */
  createdAt: string;
}

/** Patient-only fields collected when creating an appointment. */
export type NewAppointment = Omit<Appointment, 'id' | 'status' | 'createdAt'>;
