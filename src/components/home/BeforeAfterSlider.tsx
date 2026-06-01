import { useId, useState } from 'react';
import { useI18n } from '@/i18n/context';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/**
 * Accessible before/after image comparison. The position is driven by a real
 * range input, so it's fully keyboard-operable (arrow keys) and screen-reader
 * friendly. Dragging the slider updates the clip of the "after" image.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before treatment',
  afterAlt = 'After treatment',
}: BeforeAfterSliderProps) {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const labelId = useId();

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-pearl-300 shadow-card">
        {/* Before (full, underneath) */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* After (clipped to the slider position) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider handle (visual only) */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 items-center justify-center bg-white shadow-[0_0_0_1px_rgba(37,99,235,0.25)]"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-clinical-600 shadow-lift ring-1 ring-clinical-100">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>

        {/* Corner tags */}
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {t('testimonials.before')}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-clinical-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {t('testimonials.after')}
        </span>

        {/* The actual control — invisible range layered on top, full hit area. */}
        <label id={labelId} className="sr-only">
          {t('testimonials.sliderLabel')}
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-labelledby={labelId}
          aria-valuetext={t('testimonials.sliderValue', { pos })}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2"
        />
      </div>
      <figcaption className="text-center text-sm text-slate-500">
        {t('testimonials.sliderCaption')}
      </figcaption>
    </figure>
  );
}
