import { PriceCalculator } from "../services/PriceCalculator";
import { PowerConsumptionCalculator } from "../services/PowerConsumptionCalculator";

import { CPUType } from "./CPU";
import { MotherboardType } from "./Motherboard";
import { RAMData } from "./RAM";
import { PCStorageData } from "./PCStorage";
import { CaseType } from "./Case";
import { PSU, PSUType } from "./PSU";
import { GPUType } from "./GPU";


export interface CustomPCType {
  cpu: CPUType,
  motherboard: MotherboardType,
  ram: RAMData,
  storage: PCStorageData,
  case: CaseType,
  psu: PSUType,
  gpu?: GPUType
}

export class CustomPC {
  constructor(private data: CustomPCType) {}

  calculateTotalPrice(): number {
    const components: Array<CustomPCType[keyof CustomPCType]> = Object.values(this.data);
    return PriceCalculator.calculateTotalPrice(components);
  }

  calculatePowerConsumption(): number {
    const components: Array<CustomPCType[keyof CustomPCType]> = Object.values(this.data);
    return PowerConsumptionCalculator.calculateTotalPowerConsumption(components);
  }

  calculatePowerSupply(): number {
    const psu = this.data.psu as PSU;
    if (!psu) {
      return "No PSU data available";
    }
    return psu.powerSupply * psu.efficiencyRating;
  }

  getTotalPrice(): string {
    return `$${this.calculateTotalPrice()}`;
  }

  getPowerConsumption(): string {
    return `${this.calculatePowerConsumption()}W`
  }

  getPowerSupply(): string {
    return `${this.calculatePowerSupply()}W`;
  }

  getComponents(): CustomPCType {
    return this.data;
  }

  isPowerSupplySufficient(): boolean {
    const totalPowerConsumption = this.calculatePowerConsumption();
    const powerSupply = this.calculatePowerSupply();
    return powerSupply >= totalPowerConsumption;
  }
}