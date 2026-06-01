import { lazy, Suspense } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { asset } from '@/lib/asset';

// Lazy-load the Three.js canvas so the heavy 3D chunk never blocks first paint.
const ToothCanvas = lazy(() => import('./ToothCanvas'));

/** Static, lightweight stand-in shown before the canvas loads or when motion is reduced. */
function StaticTooth() {
  return (
    <img
      src={asset('/tooth-fallback.svg')}
      alt="Glossy, healthy tooth — the Shining Pearls emblem"
      className="h-full w-full select-none object-contain drop-shadow-[0_20px_45px_rgba(37,99,235,0.25)]"
      draggable={false}
    />
  );
}

/**
 * Hero 3D tooth with graceful degradation:
 *  - respects prefers-reduced-motion (renders the static image instead),
 *  - lazy-loads the canvas with the static image as the Suspense fallback.
 */
export function HeroTooth() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative aspect-square w-full max-w-[440px]"
      aria-label="Interactive 3D model of a glossy tooth"
      role="img"
    >
      {reducedMotion ? (
        <StaticTooth />
      ) : (
        <Suspense fallback={<StaticTooth />}>
          <ToothCanvas />
        </Suspense>
      )}
    </div>
  );
}
