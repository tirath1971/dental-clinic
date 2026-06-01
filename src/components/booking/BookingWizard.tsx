import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, CalendarCheck } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { ServiceStep } from './ServiceStep';
import { DoctorStep } from './DoctorStep';
import { DateTimeStep } from './DateTimeStep';
import { DetailsStep } from './DetailsStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DOCTORS, SERVICES } from '@/data/seed';
import { createAppointment, isSlotTaken, SlotTakenError } from '@/lib/storage';
import { validatePatient, type PatientErrors } from '@/lib/booking';
import { useI18n } from '@/i18n/context';
import type { Appointment, PatientInfo } from '@/types';

const emptyPatient: PatientInfo = { name: '', email: '', phone: '', notes: '' };

export function BookingWizard() {
  const { t } = useI18n();
  const STEPS = [
    t('wizard.step.service'),
    t('wizard.step.dentist'),
    t('wizard.step.datetime'),
    t('wizard.step.details'),
    t('wizard.step.done'),
  ];
  const [params] = useSearchParams();

  // Pre-select from query params (?service=… / ?doctor=…) when valid.
  const initialService = SERVICES.some((s) => s.id === params.get('service'))
    ? params.get('service')
    : null;
  const initialDoctor = DOCTORS.some((d) => d.id === params.get('doctor'))
    ? params.get('doctor')
    : null;

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(initialService);
  const [doctorId, setDoctorId] = useState<string | null>(initialDoctor);
  const [date, setDate] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientInfo>(emptyPatient);
  const [errors, setErrors] = useState<PatientErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId],
  );
  const doctor = useMemo(
    () => DOCTORS.find((d) => d.id === doctorId) ?? null,
    [doctorId],
  );

  const canAdvance =
    (step === 0 && !!serviceId) ||
    (step === 1 && !!doctorId) ||
    (step === 2 && !!date && !!timeSlot) ||
    step === 3;

  function next() {
    setFormError(null);
    if (step < 3 && canAdvance) {
      setStep((s) => s + 1);
      return;
    }
    if (step === 3) submit();
  }

  function back() {
    setFormError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  function submit() {
    const fieldErrors = validatePatient(patient);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    if (!serviceId || !doctorId || !date || !timeSlot) return;

    // Final guard against the slot being taken since the user selected it.
    if (isSlotTaken(doctorId, date, timeSlot)) {
      setFormError(t('wizard.slotTaken'));
      return;
    }

    try {
      const appointment = createAppointment({
        serviceId,
        doctorId,
        date,
        timeSlot,
        patient: {
          ...patient,
          name: patient.name.trim(),
          email: patient.email.trim(),
          phone: patient.phone.trim(),
          notes: patient.notes?.trim() || undefined,
        },
      });
      setConfirmed(appointment);
      setStep(4);
    } catch (err) {
      setFormError(err instanceof SlotTakenError ? t('wizard.slotTaken') : t('wizard.error'));
    }
  }

  function reset() {
    setStep(0);
    setServiceId(null);
    setDoctorId(null);
    setDate(null);
    setTimeSlot(null);
    setPatient(emptyPatient);
    setErrors({});
    setFormError(null);
    setConfirmed(null);
  }

  // Success screen takes over the whole card.
  if (confirmed && service && doctor) {
    return (
      <Card className="p-6 sm:p-10">
        <ConfirmationStep
          appointment={confirmed}
          service={service}
          doctor={doctor}
          onBookAnother={reset}
        />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-pearl-300 bg-pearl-100/60 px-6 py-5">
        <StepIndicator steps={STEPS} current={step} />
      </div>

      <div className="px-6 py-7 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <ServiceStep value={serviceId} onSelect={setServiceId} />
            )}
            {step === 1 && (
              <DoctorStep value={doctorId} onSelect={setDoctorId} />
            )}
            {step === 2 && doctorId && (
              <DateTimeStep
                doctorId={doctorId}
                date={date}
                timeSlot={timeSlot}
                onPickDate={(iso) => {
                  setDate(iso);
                  setTimeSlot(null); // reset slot when date changes
                }}
                onPickSlot={setTimeSlot}
              />
            )}
            {step === 3 && (
              <DetailsStep
                patient={patient}
                errors={errors}
                onChange={(patch) => {
                  setPatient((p) => ({ ...p, ...patch }));
                  setErrors({});
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {formError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {formError}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={back}
            disabled={step === 0}
            className={step === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('common.back')}
          </Button>

          <Button onClick={next} disabled={!canAdvance}>
            {step === 3 ? (
              <>
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {t('wizard.confirm')}
              </>
            ) : (
              <>
                {t('common.continue')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
