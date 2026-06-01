import { Check, Clock } from 'lucide-react';
import { ServiceIcon3D } from '@/components/icons/ServiceIcon3D';
import { SERVICES } from '@/data/seed';
import { cn } from '@/lib/cn';

interface ServiceStepProps {
  value: string | null;
  onSelect: (serviceId: string) => void;
}

export function ServiceStep({ value, onSelect }: ServiceStepProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-xl font-bold text-slate-900">
        Which treatment do you need?
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const selected = value === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              aria-pressed={selected}
              className={cn(
                'group relative flex items-start gap-4 rounded-2xl border bg-white p-4 text-left transition-[transform,box-shadow,border-color] duration-200',
                'hover:-translate-y-0.5 hover:shadow-card',
                selected
                  ? 'border-clinical-400 shadow-card ring-2 ring-clinical-200'
                  : 'border-pearl-300',
              )}
            >
              <ServiceIcon3D icon={service.icon} className="h-14 w-14 shrink-0" />
              <span className="flex flex-col gap-1">
                <span className="font-semibold text-slate-900">{service.name}</span>
                <span className="text-sm leading-snug text-slate-500">
                  {service.description}
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-clinical-600">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {service.durationMins} min · from ${service.fromPrice}
                </span>
              </span>
              {selected && (
                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-clinical-600 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
