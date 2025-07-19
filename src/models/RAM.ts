import { PowerComponent, PowerComponentType } from "./PowerComponent";
import { RAM_TYPES, RAMType } from "../types/hardware";
import { DataValidationService } from "../services/DataValidationService";

export interface RAMData extends PowerComponentType {
  type: RAMType;
  capacity: number;
  speedMHz: number;
}

export class RAM extends PowerComponent {
  type: RAMType;
  capacity: number;
  speedMHz: number;

  constructor(data: RAMData) {
    super(data);

    if (!DataValidationService.isValidType<RAMType>(data.type, RAM_TYPES)) {
      throw new Error('Invalid data: RAM type must be valid.');
    }

    if (!DataValidationService.isPositiveInteger(data.capacity)) {
      throw new Error('Invalid data: capacity must be a positive integer.');
    }

    if (!DataValidationService.isPositiveInteger(data.speedMHz)) {
      throw new Error('Invalid data: speedMHz must be a positive integer.');
    }

    this.type = data.type;
    this.capacity = data.capacity;
    this.speedMHz = data.speedMHz;
  }
}