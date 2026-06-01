import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DoctorCard } from './DoctorCard';
import { DOCTORS } from '@/data/seed';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24 bg-white/60 py-16 lg:py-24">
      <div className="section">
        <SectionHeading
          eyebrow="Meet the team"
          title="Specialists you'll feel at ease with"
          description="A friendly, highly-qualified team — each a specialist in their field, all committed to gentle, honest care."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
