import type { Appointment, Doctor, Service } from '@/types';

/**
 * Seed data for the mock backend. In a real app this would come from an API;
 * see README "Plugging in a real backend" for swap points.
 */

export const SERVICES: Service[] = [
  {
    id: 'svc-cleaning',
    name: 'Cleaning & Hygiene',
    description:
      'Professional scaling, polishing and a fluoride finish for a fresh, healthy smile.',
    durationMins: 45,
    icon: 'cleaning',
    fromPrice: 60,
  },
  {
    id: 'svc-whitening',
    name: 'Teeth Whitening',
    description:
      'Safe, dentist-supervised whitening that lifts stains several shades in one visit.',
    durationMins: 60,
    icon: 'whitening',
    fromPrice: 180,
  },
  {
    id: 'svc-implants',
    name: 'Dental Implants',
    description:
      'Permanent titanium implants that look, feel and function like natural teeth.',
    durationMins: 90,
    icon: 'implants',
    fromPrice: 950,
  },
  {
    id: 'svc-braces',
    name: 'Braces & Aligners',
    description:
      'Clear aligners and modern braces to gently straighten teeth at any age.',
    durationMins: 60,
    icon: 'braces',
    fromPrice: 1200,
  },
  {
    id: 'svc-root-canal',
    name: 'Root Canal',
    description:
      'Gentle, virtually painless endodontic care to save and restore damaged teeth.',
    durationMins: 75,
    icon: 'rootCanal',
    fromPrice: 320,
  },
  {
    id: 'svc-pediatric',
    name: 'Pediatric Dentistry',
    description:
      'Friendly, reassuring care that helps little ones build lifelong healthy habits.',
    durationMins: 40,
    icon: 'pediatric',
    fromPrice: 50,
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-charu',
    name: 'Dr. Charu Gandhi',
    specialty: 'Lead Dentist · Cosmetic & Implantology',
    bio: 'Founder of Shining Pearls. Dr. Gandhi blends meticulous cosmetic work with a calm, reassuring chair-side manner patients trust.',
    photo: '/doctors/charu-gandhi.svg',
    yearsExperience: 18,
  },
  {
    id: 'doc-rohan',
    name: 'Dr. Rohan Mehta',
    specialty: 'Orthodontist · Braces & Aligners',
    bio: 'Aligner specialist who has guided thousands of teens and adults to confident, straighter smiles.',
    photo: '/doctors/rohan-mehta.svg',
    yearsExperience: 11,
  },
  {
    id: 'doc-aisha',
    name: 'Dr. Aisha Khan',
    specialty: 'Endodontist · Root Canal Therapy',
    bio: 'Known for gentle, near-painless root canals using the latest rotary endodontic techniques.',
    photo: '/doctors/aisha-khan.svg',
    yearsExperience: 9,
  },
  {
    id: 'doc-leo',
    name: 'Dr. Leo Fernandes',
    specialty: 'Pediatric Dentist',
    bio: 'Makes every young visitor feel at ease, turning first dental visits into happy memories.',
    photo: '/doctors/leo-fernandes.svg',
    yearsExperience: 7,
  },
];

/** Helpers so demo appointments land on real, nearby dates. */
function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/** A handful of demo appointments so the dashboard isn't empty on first run. */
export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1001',
    serviceId: 'svc-cleaning',
    doctorId: 'doc-charu',
    date: isoDate(0),
    timeSlot: '09:30',
    patient: { name: 'Maya Sharma', email: 'maya@example.com', phone: '555-0142' },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1002',
    serviceId: 'svc-whitening',
    doctorId: 'doc-charu',
    date: isoDate(0),
    timeSlot: '11:00',
    patient: { name: 'Daniel Cruz', email: 'daniel@example.com', phone: '555-0188' },
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1003',
    serviceId: 'svc-braces',
    doctorId: 'doc-rohan',
    date: isoDate(1),
    timeSlot: '14:00',
    patient: { name: 'Priya Patel', email: 'priya@example.com', phone: '555-0117' },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1004',
    serviceId: 'svc-root-canal',
    doctorId: 'doc-aisha',
    date: isoDate(-1),
    timeSlot: '15:30',
    patient: { name: 'George Olsen', email: 'george@example.com', phone: '555-0163' },
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1005',
    serviceId: 'svc-pediatric',
    doctorId: 'doc-leo',
    date: isoDate(2),
    timeSlot: '10:00',
    patient: { name: 'Sofia Rossi', email: 'sofia@example.com', phone: '555-0199' },
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1006',
    serviceId: 'svc-cleaning',
    doctorId: 'doc-leo',
    date: isoDate(-2),
    timeSlot: '13:00',
    patient: { name: 'Aaron Blake', email: 'aaron@example.com', phone: '555-0124' },
    status: 'cancelled',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-1007',
    serviceId: 'svc-implants',
    doctorId: 'doc-charu',
    date: isoDate(3),
    timeSlot: '09:00',
    patient: { name: 'Nadia Iqbal', email: 'nadia@example.com', phone: '555-0150' },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

/** Clinic contact / hours, surfaced in the footer and dashboard. */
export const CLINIC = {
  name: 'Shining Pearls Dental Clinic',
  tagline: 'Gentle, modern dentistry for the whole family.',
  phone: '+1 (555) 010-7890',
  email: 'hello@shiningpearls.dental',
  address: '24 Marine Drive, Suite 5, Bayside, CA 90210',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
} as const;
