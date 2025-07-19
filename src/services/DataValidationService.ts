export class DataValidationService {
  static isNonNegativeNumber(value: number): boolean {
    return !isNaN(value) && value >= 0;
  }

  static isNonEmptyString(value: string): boolean {
    return value.trim().length > 0;
  }

  static isValidUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  static isPositiveInteger(value: number): boolean {
    return Number.isInteger(value) && value > 0;
  }

  static isBoolean(value: unknown): boolean {
    return typeof value === 'boolean';
  }

  static isValidType<T extends string>(value: unknown, validTypes: readonly T[]): boolean {
    return typeof value === 'string' && validTypes.includes(value as T);
  }
}