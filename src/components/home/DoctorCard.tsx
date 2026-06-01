import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Doctor } from '@/types';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <motion.div variants={item}>
      <Card interactive className="group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={doctor.photo}
            alt={`Portrait of ${doctor.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Gradient overlay for legibility + color treatment. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-clinical-700 shadow-soft backdrop-blur">
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            {doctor.yearsExperience} yrs experience
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
            <p className="text-sm font-medium text-clinical-600">{doctor.specialty}</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">{doctor.bio}</p>
          <Button
            as="link"
            to={`/book?doctor=${doctor.id}`}
            variant="subtle"
            size="sm"
            className="mt-auto self-start"
          >
            Book with {doctor.name.split(' ')[1] ?? doctor.name}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
