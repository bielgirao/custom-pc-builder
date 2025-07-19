import { PowerComponent, PowerComponentType } from "./PowerComponent";
import {
  StorageType,
  StorageInterface,
  StorageCapacity,
  STORAGE_TYPES,
  STORAGE_INTERFACES,
  STORAGE_CAPACITIES
} from "../types/hardware";
import { DataValidationService } from "../services/DataValidationService";

export interface PCStorageData extends PowerComponentType {
  type: StorageType;
  interface: StorageInterface;
  capacity: StorageCapacity;
}

export class PCStorage extends PowerComponent {
  type: StorageType;
  interface: StorageInterface;
  capacity: StorageCapacity;

  constructor(data: PCStorageData) {
    super(data);

    if(!DataValidationService.isValidType<StorageType>(data.type, STORAGE_TYPES)) {
      throw new Error('Invalid data: Storage type must be valid.');
    }

    if(!DataValidationService.isValidType<StorageInterface>(data.interface, STORAGE_INTERFACES)) {
      throw new Error('Invalid data: Storage interface must be valid.');
    }

    if(!DataValidationService.isValidType<StorageCapacity>(data.capacity, STORAGE_CAPACITIES)) {
      throw new Error('Invalid data: Storage capacity must be valid.');
    }

    this.type = data.type;
    this.interface = data.interface;
    this.capacity = data.capacity;
  }
}