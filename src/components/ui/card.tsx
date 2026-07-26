import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** Card surface built on the `card` design tokens. */
const Card = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card"
    className={cn(
      'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-ambient',
      className
    )}
    {...props}
  />
);

/** Header region of a card, laying out its title, description, and action. */
export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-header"
    className={cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      className
    )}
    {...props}
  />
);

/** Title line of a card header. */
export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-title"
    className={cn('font-semibold leading-none', className)}
    {...props}
  />
);

/** Muted supporting text under a card title. */
export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="card-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

/** Trailing action slot aligned to the top-right of a card header. */
export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-action"
    className={cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      className
    )}
    {...props}
  />
);

/** Main body region of a card. */
export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="card-content" className={cn('px-6', className)} {...props} />
);

/** Footer region of a card. */
export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-footer"
    className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
    {...props}
  />
);

export default Card;
