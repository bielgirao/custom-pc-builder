import { Component } from "../models/Component";

export class PriceCalculator {
  static calculateTotalPrice = (components: Component[]): number => {
    if (!components || components.length === 0) return 0;
    return components.reduce((acc, component) => {
      if(!component || !component.price) return acc;
      return acc + component.price
    }, 0);
  }
}