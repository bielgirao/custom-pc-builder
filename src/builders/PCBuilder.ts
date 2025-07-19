import { CustomPC } from "../models/CustomPC";
import { CPUType } from '../models/CPU';
import { MotherboardType } from '../models/Motherboard';
import { RAMData } from "../models/RAM";
import { PCStorageData } from "../models/PCStorage";
import { CaseType } from "../models/Case";
import { PSUType } from "../models/PSU";
import { GPUType } from "../models/GPU";

const REQUIRED: Array<keyof PCBuilder> = [
  "cpu",
  "motherboard",
  "ram",
  "storage",
  "case",
  "psu",
];

export class PCBuilder {
  private cpu?: CPUType;
  private motherboard?: MotherboardType;
  private ram?: RAMData;
  private storage?: PCStorageData;
  private case?: CaseType;
  private psu?: PSUType;
  private gpu?: GPUType;

  selectCPU(cpu: CPUType): PCBuilder {
    this.cpu = cpu;
    return this;
  }

  selectMotherboard(motherboard: MotherboardType): PCBuilder {
    this.motherboard = motherboard;
    return this;
  }

  selectRAM(ram: RAMData): PCBuilder {
    this.ram = ram;
    return this;
  }

  selectStorage(storage: StorageData): PCBuilder {
    this.storage = storage;
    return this;
  }

  selectCase(pcCase: CaseType): PCBuilder {
    this.case = pcCase;
    return this;
  }

  selectPSU(psu: PSUType): PCBuilder {
    this.psu = psu;
    return this;
  }

  selectGPU(gpu: GPUType): PCBuilder {
    this.gpu = gpu;
    return this;
  }

  get(component: keyof PCBuilder): NonNullable<PCBuilder[keyof PCBuilder]> {
    const value = this[component];
    if (value === undefined) {
      throw new Error(`Invalid parameter: "${component}" is not defined.`);
    }
    return value as NonNullable<PCBuilder[keyof PCBuilder]>;
  }

  build() {
    for (const key of REQUIRED) {
      if (!this[key]) {
        const name = key.charAt(0).toUpperCase() + key.slice(1);
        throw new Error(`${name} is required to build a PC.`);
      }
    }

    return new CustomPC({
      cpu: this.cpu!,
      motherboard: this.motherboard!,
      ram: this.ram!,
      storage: this.storage!,
      case: this.case!,
      psu: this.psu!,
      gpu: this.gpu ?? undefined
    });
  }
}