import { Component } from "../models/Component";

export class PowerConsumptionCalculator {
  static calculateTotalPowerConsumption (components: Component[]): number {
    if (!components || components.length === 0) return 0;

    return components.reduce((acc, component) => {
      if(!component || !component.powerConsumption) return acc;
      return acc + Number(component.powerConsumption)
    }, 0)
  }
}