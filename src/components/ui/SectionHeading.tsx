import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Reusable eyebrow + title + description block with a staggered reveal. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Badge tone="mint">{eyebrow}</Badge>}
      <h2
        className={cn(
          'max-w-2xl text-balance text-3xl font-bold tracking-tightest text-slate-900 sm:text-4xl',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
