import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Shared easing curve used by every animation on the site. */
export const EASE = [0.22, 0.8, 0.2, 1] as const;