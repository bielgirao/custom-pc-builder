import { Component, ComponentType } from "./Component";
import { DataValidationService } from "../services/DataValidationService";


export interface PSUType extends ComponentType {
  efficiencyRating: number;
  powerSupply: number; // in watts
  modular: boolean;
}

export class PSU extends Component {
  efficiencyRating: number;
  powerSupply: number; // in watts
  modular: boolean;

  constructor(data: PSUType) {
    super(data);

    if(!DataValidationService.isNonNegativeNumber(data.efficiencyRating)) {
      throw new Error("Invalid data: efficiencyRating must be greater than zero.");
    }

    if(!DataValidationService.isPositiveInteger(data.powerSupply)) {
      throw new Error("Invalid data: powerSupply must be a positive integer.");
    }

    if(!DataValidationService.isBoolean(data.modular)) {
      throw new Error("Invalid data: modular must be a boolean value.");
    }

    this.efficiencyRating = data.efficiencyRating;
    this.powerSupply = data.powerSupply;
    this.modular = data.modular;
  }

  getPowerConsumption(): number {
    return this.powerSupply * this.efficiencyRating;
  }
}