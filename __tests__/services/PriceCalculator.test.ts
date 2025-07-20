import { PriceCalculator } from '../../src/services/PriceCalculator';
import { Component } from "../../src/models/Component";
import { generateUUID } from "../../src/utils/uuid";

describe('PriceCalculator.calculateTotalPrice', () => {
  it('should return 0 for an undefined computer', () => {
    const components = undefined;
    // @ts-expect-error: testing undefined input on runtime behavior
    expect(PriceCalculator.calculateTotalPrice(components)).toBe(0);
  })

  it('should return 0 for an empty computer', () => {
    const components: Component[] = [];
    expect(PriceCalculator.calculateTotalPrice(components)).toBe(0);
  })

  it('should calculate the total price for a computer with one component', () => {
    const components: Component[] = [
      { id: generateUUID(), name: 'Test Component Name', price: 200 }
    ];
    const expected: number = 200;
    expect(PriceCalculator.calculateTotalPrice(components)).toBe(expected);
  })

  it('should calculate the total price for a computer with multiple components', () => {
    const components: Component[] = [
      { id: generateUUID(), name: 'Test Component Name 1', price: 200 },
      { id: generateUUID(), name: 'Test Component Name 2', price: 250 }
    ];
    const expected: number = 450;
    expect(PriceCalculator.calculateTotalPrice(components)).toBe(expected);
  })
})