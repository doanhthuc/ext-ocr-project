export function ensureArray<T>(value: T | Array<T> | null | undefined) {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}
