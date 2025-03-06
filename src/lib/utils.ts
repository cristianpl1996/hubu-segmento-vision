
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A utility for dynamically importing components
 */
export function dynamic<T>(importFn: () => Promise<{ default: T }>): Promise<T> {
  return importFn().then(mod => mod.default);
}
