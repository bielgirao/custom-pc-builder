import { CPUType } from "../models/CPU";
import { MotherboardType } from "../models/Motherboard";
import { CaseType } from "../models/Case";
import { RAMData } from "../models/RAM";

export class DomainValidationService {
  static isSocketCompatible(cpu: CPUType, mb: MotherboardType): boolean {
    return cpu.socket === mb.socket;
  }

  static isMotherboardFormFactorCompatible(mb: MotherboardType, pcCase: CaseType): boolean {
    return pcCase.formFactorSupport.includes(mb.formFactor);
  }

  static isRamCompatible(ram: RAMData, mb: MotherboardType): boolean {
    return mb.supportedRamType === ram.type;
  }
}