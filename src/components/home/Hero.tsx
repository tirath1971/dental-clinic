import { motion } from 'framer-motion';
import { CalendarPlus, PhoneCall, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroTooth } from '@/components/three/HeroTooth';
import { CLINIC } from '@/data/seed';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered ambient glows for depth (transform/opacity only). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-mint-300/20 blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-clinical-300/20 blur-3xl" />
      </div>

      <div className="section grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-8 lg:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.div variants={item}>
            <Badge tone="mint">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Gentle dentistry, brilliant smiles
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tightest text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Your brightest, healthiest{' '}
            <span className="bg-gradient-to-r from-clinical-500 to-clinical-700 bg-clip-text text-transparent">
              smile
            </span>{' '}
            starts here.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-pretty text-lg leading-relaxed text-slate-500"
          >
            {CLINIC.name} pairs modern, painless treatments with a calm, caring
            team led by Dr. Charu Gandhi. Book online in under a minute.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button as="link" to="/book" size="lg">
              <CalendarPlus className="h-5 w-5" aria-hidden="true" />
              Book Appointment
            </Button>
            <Button
              as="link"
              to="#services"
              variant="secondary"
              size="lg"
            >
              Explore services
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint-100 text-mint-500">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-lg font-bold text-slate-900">4.9/5</dt>
                <dd className="text-xs text-slate-500">1,200+ reviews</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-clinical-50 text-clinical-600">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-lg font-bold text-slate-900">18+ yrs</dt>
                <dd className="text-xs text-slate-500">trusted care</dd>
              </div>
            </div>
            <a
              href={`tel:${CLINIC.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-clinical-700"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-pearl-200 text-clinical-600">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </span>
              {CLINIC.phone}
            </a>
          </motion.dl>
        </motion.div>

        {/* 3D tooth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative grid place-items-center rounded-[2.5rem] bg-gradient-to-b from-white to-pearl-200/60 p-6 shadow-card ring-1 ring-pearl-300/70">
            <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-white/60 blur-2xl" aria-hidden="true" />
            <HeroTooth />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
