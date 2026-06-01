import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-out ' +
  'active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-100';

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-br from-clinical-500 to-clinical-700 shadow-soft ' +
    'hover:shadow-lift hover:-translate-y-0.5',
  secondary:
    'text-clinical-700 bg-white border border-clinical-100 shadow-soft ' +
    'hover:border-clinical-300 hover:-translate-y-0.5 hover:shadow-card',
  ghost:
    'text-slate-700 hover:bg-pearl-200 hover:text-clinical-700',
  subtle:
    'text-clinical-700 bg-clinical-50 hover:bg-clinical-100',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    to: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Brand button with gradient primary, layered shadows and full interactive states. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className } = props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if (props.as === 'link') {
      const { as: _as, variant: _v, size: _s, className: _c, to, ...rest } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={classes}
          {...rest}
        />
      );
    }

    const { as: _as, variant: _v, size: _s, className: _c, type, ...rest } =
      props as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        className={classes}
        {...rest}
      />
    );
  },
);
