import { cn } from '@/lib/cn';

type Tone = 'clinical' | 'mint' | 'slate';

const tones: Record<Tone, string> = {
  clinical: 'bg-clinical-50 text-clinical-700 ring-clinical-100',
  mint: 'bg-mint-100 text-mint-500 ring-mint-200',
  slate: 'bg-pearl-200 text-slate-600 ring-pearl-300',
};

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

/** Small pill label used for eyebrows, tags and metadata. */
export function Badge({ tone = 'clinical', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
