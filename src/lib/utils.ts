/** Joins truthy class names. Keeps JSX class expressions readable. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
