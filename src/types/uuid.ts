export type UUID = string & { readonly __brand: unique symbol };

export function asUUID(value: string): UUID {
  return value as UUID;
}