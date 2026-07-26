import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class name values into a single deduplicated Tailwind class string.
 * @param inputs Class name values to merge.
 * @returns The merged class name string.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
