import { motion } from 'framer-motion';
import { CalendarPlus, PhoneCall } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { TeamSection } from '@/components/home/TeamSection';
import { Testimonials } from '@/components/home/Testimonials';
import { Button } from '@/components/ui/Button';
import { CLINIC } from '@/data/seed';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <TeamSection />
      <Testimonials />

      {/* Closing CTA band */}
      <section className="section py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinical-600 to-clinical-800 px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16"
        >
          {/* Soft decorative glows */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-mint-300/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
            Ready for a healthier, brighter smile?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-clinical-100">
            Book online in under a minute, or call us and we'll find a time that
            works for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="link" to="/book" size="lg" variant="secondary">
              <CalendarPlus className="h-5 w-5" aria-hidden="true" />
              Book Appointment
            </Button>
            <a
              href={`tel:${CLINIC.phone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-medium text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10"
            >
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
              {CLINIC.phone}
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
