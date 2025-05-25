// Utility function for conditional className merging (inspired by tailwind-merge)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}