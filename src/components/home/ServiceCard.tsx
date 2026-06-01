import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ServiceIcon3D } from '@/components/icons/ServiceIcon3D';
import { useI18n } from '@/i18n/context';
import type { Service } from '@/types';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ServiceCard({ service }: { service: Service }) {
  const { t } = useI18n();
  const name = t(`services.${service.icon}.name`);
  return (
    <motion.div variants={item}>
      <Link
        to={`/book?service=${service.id}`}
        className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-100"
        aria-label={t('common.book') + ' · ' + name}
      >
        <Card interactive className="flex h-full flex-col gap-4 p-6">
          <ServiceIcon3D
            icon={service.icon}
            className="h-16 w-16 transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">{name}</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              {t(`services.${service.icon}.desc`)}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between pt-2 text-sm">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Clock className="h-4 w-4 text-clinical-500" aria-hidden="true" />
              {t('services.meta', { mins: service.durationMins, price: service.fromPrice })}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-clinical-700 transition-transform duration-200 group-hover:translate-x-0.5">
              {t('common.book')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
