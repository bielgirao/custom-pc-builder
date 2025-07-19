import { UUID } from "../types/uuid"
import { DataValidationService } from "../services/DataValidationService";

export interface ComponentType {
  id: UUID;
  name: string;
  price: number;
}

export class Component {
  id: UUID;
  name: string;
  price: number;

  constructor(data: ComponentType) {
    if(!DataValidationService.isValidUUID(data.id)) {
      throw new Error('Invalid data: id must have UUID format.');
    }

    if(!DataValidationService.isNonEmptyString(data.name)) {
      throw new Error('Invalid data: name is required.');
    }

    if(!DataValidationService.isNonNegativeNumber(data.price)) {
      throw new Error('Invalid data: price must be greater than zero.');
    }

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
  }
}