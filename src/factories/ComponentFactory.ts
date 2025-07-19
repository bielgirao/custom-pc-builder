import { CPUs, Motherboards, RAMs, Storages, Cases, GPUs, PSUs } from "../data/componentsData";
import { CPU, CPUType } from "../models/CPU";
import { Motherboard, MotherboardType } from "../models/Motherboard";
import { RAM, RAMData } from "../models/RAM";
import { PCStorage, PCStorageData } from "../models/PCStorage";
import { Case, CaseType } from "../models/Case";
import { PSU, PSUType } from "../models/PSU";
import { GPU, GPUType } from "../models/GPU";


type ComponentDataMap = {
  cpu: CPUType[];
  motherboard: MotherboardType[];
  ram: RAMData[];
  storage: PCStorageData[];
  case: CaseType[];
  psu: PSUType[];
  gpu: GPUType[];
}

type ComponentClassMap = {
  cpu: typeof CPU;
  motherboard: typeof Motherboard;
  ram: typeof RAM;
  storage: typeof PCStorage;
  case: typeof Case;
  psu: typeof PSU;
  gpu: typeof GPU;
}

const dataMap: ComponentTypeMap = {
  cpu: CPUs,
  motherboard: Motherboards,
  ram: RAMs,
  storage: Storages,
  case: Cases,
  psu: PSUs,
  gpu: GPUs,
}

const classMap: ComponentClassMap = {
  cpu: CPU,
  motherboard: Motherboard,
  ram: RAM,
  storage: PCStorage,
  case: Case,
  psu: PSU,
  gpu: GPU,
}

export class ComponentFactory {
  static create<T extends keyof ComponentDataMap>(
    type: T,
    modelName: string
  ): InstanceType<ComponentClassMap[T]> {
    const list = dataMap[type] as Array<any>;
    const raw = list.find(item => item.name === modelName);
    if (!raw) {
      throw new Error(`Model "${modelName}" not found for type "${type}".`);
    }
    const Cls = classMap[type] as any;
    return new Cls(raw);
  }
}