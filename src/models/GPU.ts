import { PowerComponent, PowerComponentType } from "./PowerComponent";
import { DataValidationService } from "../services/DataValidationService";


export interface GPUType extends PowerComponentType {
  memoryGB: number;
  clockMHz: number;
}

export class GPU extends PowerComponent {
  memoryGB: number;
  clockMHz: number;

  constructor(data: GPUType) {
    super(data);

    if(!DataValidationService.isPositiveInteger(data.memoryGB)) {
      throw new Error('Invalid data: memoryGB must be a positive integer.');
    }

    if(!DataValidationService.isPositiveInteger(data.clockMHz)) {
      throw new Error('Invalid data: clockMHz must be a positive integer.');
    }

    this.memoryGB = data.memoryGB;
    this.clockMHz = data.clockMHz;
  }
}