import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { BookingWizard } from '@/components/booking/BookingWizard';

export function BookingPage() {
  return (
    <section className="section py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3 text-center"
      >
        <Badge tone="mint">Online booking</Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tightest text-slate-900 sm:text-4xl">
          Book your appointment
        </h1>
        <p className="max-w-xl text-slate-500">
          Four quick steps. Choose a treatment, your preferred dentist, a time
          that suits you, and you're done.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <BookingWizard />
      </div>
    </section>
  );
}
