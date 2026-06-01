import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '@/data/seed';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function ServicesGrid() {
  return (
    <section id="services" className="section scroll-mt-24 py-16 lg:py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Comprehensive care for every smile"
        description="From routine check-ups to full smile makeovers, our specialists cover it all under one calm, modern roof."
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </section>
  );
}
