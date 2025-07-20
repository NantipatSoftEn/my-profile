import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function for conditionally joining class names together
 * Uses clsx for conditional classes and tailwind-merge to merge Tailwind CSS classes
 * without style conflicts
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
