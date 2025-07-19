import { FORM_FACTORS, FormFactor, RAM_TYPES, RAMType, Socket, SOCKETS } from "../types/hardware";
import { PowerComponent, PowerComponentType } from "./PowerComponent";
import { DataValidationService } from "../services/DataValidationService";


export interface MotherboardType extends PowerComponentType {
  socket: Socket;
  formFactor: FormFactor;
  supportedRamType: RAMType;
}

export class Motherboard extends PowerComponent {
  socket: Socket;
  formFactor: FormFactor;
  supportedRamType: RAMType;

  constructor(data: MotherboardType) {
    super(data);

    if (!DataValidationService.isValidType<Socket>(data.socket, SOCKETS)) {
      throw new Error('Invalid data: socket must be valid.');
    }

    if (!DataValidationService.isValidType<FormFactor>(data.formFactor, FORM_FACTORS)) {
      throw new Error('Invalid data: formFactor must be valid.');
    }

    if (!DataValidationService.isValidType<RAMType>(data.supportedRamType, RAM_TYPES)) {
      throw new Error('Invalid data: supportedRAMType must be valid.');
    }

    this.socket = data.socket;
    this.formFactor = data.formFactor;
    this.supportedRamType = data.supportedRamType;
  }
}