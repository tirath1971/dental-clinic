import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '@/data/seed';
import { useI18n } from '@/i18n/context';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function ServicesGrid() {
  const { t } = useI18n();
  return (
    <section id="services" className="section scroll-mt-24 py-16 lg:py-24">
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.desc')}
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
