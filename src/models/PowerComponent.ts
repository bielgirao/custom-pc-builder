import { Component, ComponentType } from "./Component";
import { DataValidationService } from "../services/DataValidationService";

export interface PowerComponentType extends ComponentType {
  powerConsumption: number;
}

export class PowerComponent extends Component {
  powerConsumption: number;

  constructor(data: PowerComponentType) {
    super(data);

    if(data.powerConsumption !== undefined && !DataValidationService.isPositiveInteger(data.powerConsumption)) {
      throw new Error('Invalid data: powerConsumption must be a positive integer.');
    }

    this.powerConsumption = data.powerConsumption;
  }
}