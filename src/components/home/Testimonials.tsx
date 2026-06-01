import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { cn } from '@/lib/cn';

interface Review {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Elena M.',
    role: 'Whitening patient',
    rating: 5,
    quote:
      'I was so nervous, but the team made it completely painless. My teeth are several shades brighter and I keep smiling!',
  },
  {
    name: 'James T.',
    role: 'Implant patient',
    rating: 5,
    quote:
      'Dr. Gandhi explained every step. The implant feels exactly like a real tooth — best decision I have made.',
  },
  {
    name: 'Priya & kids',
    role: 'Family check-ups',
    rating: 5,
    quote:
      'My children actually look forward to the dentist now. Warm, gentle and genuinely caring with little ones.',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300',
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Testimonials() {
  return (
    <section id="results" className="section scroll-mt-24 py-16 lg:py-24">
      <SectionHeading
        eyebrow="Smiles we're proud of"
        title="Real results, happy patients"
        description="See a sample transformation and hear from the people who trust us with their smiles."
      />

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <BeforeAfterSlider
            beforeSrc="/cases/case-1-before.svg"
            afterSrc="/cases/case-1-after.svg"
            beforeAlt="Patient smile before whitening and alignment"
            afterAlt="Patient smile after whitening and alignment"
          />
        </motion.div>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-4"
        >
          {REVIEWS.map((review) => (
            <motion.div key={review.name} variants={item}>
              <Card className="flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} />
                  <Quote className="h-5 w-5 text-clinical-200" aria-hidden="true" />
                </div>
                <p className="text-pretty leading-relaxed text-slate-700">
                  “{review.quote}”
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-clinical-500 to-clinical-700 text-sm font-bold text-white">
                    {review.name.charAt(0)}
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-slate-500">{review.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
