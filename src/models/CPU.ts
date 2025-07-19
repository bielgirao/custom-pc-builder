import { Socket, SOCKETS } from "../types/hardware";
import { DataValidationService } from "../services/DataValidationService";
import { PowerComponent, PowerComponentType } from "./PowerComponent";

export interface CPUType extends PowerComponentType {
  cores: number;
  socket: Socket;
}

export class CPU extends PowerComponent {
  cores: number;
  socket: Socket;

  constructor(data: CPUType) {
    super(data);

    if (!DataValidationService.isPositiveInteger(data.cores)) {
      throw new Error("Invalid data: cores must be a positive integer.");
    }

    if (!DataValidationService.isValidType<Socket>(data.socket, SOCKETS)) {
      throw new Error('Invalid data: socket must be valid.');
    }

    this.cores = data.cores;
    this.socket = data.socket;
  }
}