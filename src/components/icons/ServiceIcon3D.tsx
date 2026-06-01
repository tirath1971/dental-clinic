import { useId } from 'react';
import type { ServiceIconKey } from '@/types';

interface ServiceIcon3DProps {
  icon: ServiceIconKey;
  className?: string;
}

/** Per-service gradient pairs give each icon its own glossy, dimensional tint. */
const GRADIENTS: Record<ServiceIconKey, [string, string]> = {
  cleaning: ['#7FD0F8', '#0284C7'],
  whitening: ['#5EEAD4', '#0EA5E9'],
  implants: ['#2563EB', '#1E40AF'],
  braces: ['#38BDF8', '#2563EB'],
  rootCanal: ['#5EEAD4', '#14B8A6'],
  pediatric: ['#7FD0F8', '#5EEAD4'],
};

/**
 * High-quality "3D-look" service icons: a glossy rounded tile with a top sheen,
 * soft drop shadow, and a white emblem. Dimensional without needing a real model.
 */
export function ServiceIcon3D({ icon, className }: ServiceIcon3DProps) {
  const id = useId().replace(/:/g, '');
  const [from, to] = GRADIENTS[icon];
  const gradId = `g-${id}`;
  const sheenId = `s-${id}`;
  const shadowId = `sh-${id}`;

  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-20%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={to} floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Glossy tile base */}
      <rect
        x="8"
        y="8"
        width="80"
        height="80"
        rx="22"
        fill={`url(#${gradId})`}
        filter={`url(#${shadowId})`}
      />
      {/* Top sheen for dimensionality */}
      <rect x="8" y="8" width="80" height="44" rx="22" fill={`url(#${sheenId})`} />

      {/* White emblem per service */}
      <g fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        {renderEmblem(icon)}
      </g>
    </svg>
  );
}

function renderEmblem(icon: ServiceIconKey): JSX.Element {
  switch (icon) {
    case 'cleaning':
      // Toothbrush + sparkle
      return (
        <>
          <path d="M34 62 58 38" />
          <path d="M30 58l6 6" />
          <path d="M58 38l4-4a4 4 0 0 0-6-6l-4 4" fill="#ffffff" />
          <path d="M64 60v8M60 64h8" strokeWidth="2.6" />
        </>
      );
    case 'whitening':
      // Tooth with shine
      return (
        <>
          <path d="M48 30c-6 0-9 4-15 4-4 0-6 1-6 6 0 8 4 12 6 20 1 4 2 8 4 8s2-6 3-9c.6-1.8 5-1.8 5.6 0 1 3 1 9 3 9s3-4 4-8c2-8 6-12 6-20 0-5-2-6-6-6-6 0-9-4-13-4z" />
          <path d="M38 42l3 3" strokeWidth="2.6" />
        </>
      );
    case 'implants':
      // Screw/implant post
      return (
        <>
          <path d="M40 28h16l-3 8H43z" fill="#ffffff" />
          <path d="M45 40h6M44 47h8M45 54h6M46 61h4l-2 8z" />
        </>
      );
    case 'braces':
      // Bracket wire
      return (
        <>
          <path d="M28 48h40" />
          <rect x="34" y="42" width="8" height="12" rx="2" fill="#ffffff" stroke="none" />
          <rect x="54" y="42" width="8" height="12" rx="2" fill="#ffffff" stroke="none" />
        </>
      );
    case 'rootCanal':
      // Tooth with roots highlighted
      return (
        <>
          <path d="M48 30c-7 0-10 4-16 4-4 0-6 1-6 6 0 7 4 11 6 18 1 4 2 8 4 8s2-6 3-9" />
          <path d="M52 57c1 3 1 9 3 9s3-4 4-8c2-7 6-11 6-18 0-5-2-6-6-6" />
          <path d="M44 44v18M52 44v18" strokeWidth="2.4" />
        </>
      );
    case 'pediatric':
      // Friendly smile
      return (
        <>
          <circle cx="40" cy="44" r="2.6" fill="#ffffff" stroke="none" />
          <circle cx="56" cy="44" r="2.6" fill="#ffffff" stroke="none" />
          <path d="M38 56c3 4 7 6 10 6s7-2 10-6" />
        </>
      );
    default:
      return <></>;
  }
}
