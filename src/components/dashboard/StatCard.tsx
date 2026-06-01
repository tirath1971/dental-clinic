import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'clinical' | 'mint' | 'amber';
}

const TONES = {
  clinical: 'bg-clinical-50 text-clinical-600',
  mint: 'bg-mint-100 text-mint-500',
  amber: 'bg-amber-50 text-amber-600',
};

export function StatCard({ icon: Icon, label, value, hint, tone = 'clinical' }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', TONES[tone])}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold leading-tight text-slate-900">{value}</p>
        <p className="truncate text-sm text-slate-500">{label}</p>
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
    </Card>
  );
}
