import { generateUUID } from "../utils/uuid";
import { CPUType } from "../models/CPU";
import { MotherboardType } from "../models/Motherboard";
import { RAMData } from "../models/RAM";
import { PCStorageData } from "../models/PCStorage";
import { GPUType } from "../models/GPU";
import { CaseType } from "../models/Case";
import { PSUType } from "../models/PSU";

export const CPUs: CPUType[] = [
  { id: generateUUID(), name: "Intel Core i5-12400F", cores: 6, socket: "LGA1700", powerConsumption: 65, price: 180 },
  { id: generateUUID(), name: "Intel Core i7-12700K", cores: 12, socket: "LGA1700", powerConsumption: 125, price: 350 },
  { id: generateUUID(), name: "AMD Ryzen 5 5600X", cores: 6, socket: "AM4", powerConsumption: 65, price: 200 },
  { id: generateUUID(), name: "AMD Ryzen 7 5800X", cores: 8, socket: "AM4", powerConsumption: 105, price: 320 },
  { id: generateUUID(), name: "Intel Core i5-11600K", cores: 6, socket: "LGA1200", powerConsumption: 125, price: 260 },
  { id: generateUUID(), name: "AMD Ryzen 7 7700X", cores: 8, socket: "AM5", powerConsumption: 105, price: 400 }
];

export const Motherboards: MotherboardType[] = [
  { id: generateUUID(), name: "ASUS PRIME B660-PLUS", socket: "LGA1700", formFactor: "ATX", supportedRamType: "DDR4", powerConsumption: 15, price: 150 },
  { id: generateUUID(), name: "MSI MAG B550 TOMAHAWK", socket: "AM4", formFactor: "ATX", supportedRamType: "DDR4", powerConsumption: 12, price: 180 },
  { id: generateUUID(), name: "Gigabyte Z690 UD", socket: "LGA1700", formFactor: "ATX", supportedRamType: "DDR5", powerConsumption: 15, price: 200 },
  { id: generateUUID(), name: "ASRock B450 Steel Legend", socket: "AM4", formFactor: "MicroATX", supportedRamType: "DDR4", powerConsumption: 10, price: 120 },
  { id: generateUUID(), name: "ASUS ROG Strix X670E-E", socket: "AM5", formFactor: "ATX", supportedRamType: "DDR5", powerConsumption: 20, price: 350 },
  { id: generateUUID(), name: "Gigabyte B560M DS3H", socket: "LGA1200", formFactor: "MicroATX", supportedRamType: "DDR4", powerConsumption: 10, price: 110 },
  { id: generateUUID(), name: "ASUS ROG Strix Z690-I Gaming", socket: "LGA1700", formFactor: "MiniITX", supportedRamType: "DDR5", powerConsumption: 15, price: 300 },
  { id: generateUUID(), name: "ASRock B550 Phantom Gaming-ITX/ax", socket: "AM4", formFactor: "MiniITX", supportedRamType: "DDR4", powerConsumption: 10, price: 200 }
];

export const RAMs: RAMData = [
  { id: generateUUID(), name: "Corsair Vengeance LPX 8GB", type: "DDR4", capacity: 8, speedMHz: 3200, price: 40, powerConsumption: 5 },
  { id: generateUUID(), name: "G.SKILL Ripjaws V 16GB", type: "DDR4", capacity: 16, speedMHz: 3600, price: 75, powerConsumption: 5 },
  { id: generateUUID(), name: "Kingston HyperX Fury 32GB", type: "DDR4", capacity: 32, speedMHz: 3200, price: 140, powerConsumption: 6 },
  { id: generateUUID(), name: "Crucial Ballistix 16GB", type: "DDR4", capacity: 16, speedMHz: 3000, price: 65, powerConsumption: 5 },
  { id: generateUUID(), name: "G.SKILL Trident Z5 RGB 16GB", type: "DDR5", capacity: 16, speedMHz: 5200, price: 150, powerConsumption: 6 },
  { id: generateUUID(), name: "Kingston FURY Beast 32GB", type: "DDR5", capacity: 32, speedMHz: 5600, price: 280, powerConsumption: 7 }
];

export const Storages: PCStorageData = [
  { id: generateUUID(), name: "Samsung 970 EVO Plus", capacity: "500GB", type: "SSD", interface: "NVMe", price: 80, powerConsumption: 5 },
  { id: generateUUID(), name: "WD Blue", capacity: "1TB", type: "SSD", interface: "SATA", price: 90, powerConsumption: 4 },
  { id: generateUUID(), name: "Seagate Barracuda", capacity: "2TB", type: "HDD", interface: "SATA", price: 55, powerConsumption: 6 },
  { id: generateUUID(), name: "Crucial MX500", capacity: "1TB", type: "SSD", interface: "SATA", price: 100, powerConsumption: 4 },
  { id: generateUUID(), name: "Sabrent Rocket", capacity: "2TB", type: "SSD", interface: "NVMe", price: 250, powerConsumption: 8 }
];

export const GPUs: GPUType = [
  { id: generateUUID(), name: "NVIDIA GeForce RTX 3060", memoryGB: 12, clockMHz: 1320, price: 330, powerConsumption: 170 },
  { id: generateUUID(), name: "AMD Radeon RX 6600 XT", memoryGB: 8, clockMHz: 2359, price: 300, powerConsumption: 160 },
  { id: generateUUID(), name: "NVIDIA GeForce RTX 3070", memoryGB: 8, clockMHz: 1500, price: 500, powerConsumption: 220 },
  { id: generateUUID(), name: "AMD Radeon RX 6700 XT", memoryGB: 12, clockMHz: 2321, price: 480, powerConsumption: 230 },
  { id: generateUUID(), name: "NVIDIA GeForce RTX 4080", memoryGB: 16, clockMHz: 2205, price: 1200, powerConsumption: 320 }
];

export const Cases: CaseType = [
  { id: generateUUID(), name: "NZXT H510", formFactorSupport: ["ATX","MicroATX","MiniITX"], color: "Black", price: 70 },
  { id: generateUUID(), name: "Corsair 4000D Airflow", formFactorSupport: ["ATX","MicroATX","MiniITX"], color: "White", price: 80 },
  { id: generateUUID(), name: "Fractal Design Meshify C", formFactorSupport: ["ATX","MicroATX"], color: "Black", price: 90 },
  { id: generateUUID(), name: "Cooler Master NR600", formFactorSupport: ["ATX","MicroATX","MiniITX"], color: "Black", price: 75 }
];

export const PSUs: PSUType = [
  { id: generateUUID(), name: "Corsair RM750", efficiencyRating: 0.94, powerSupply: 750, modular: true, price: 110 },
  { id: generateUUID(), name: "EVGA 600 BR", efficiencyRating: 0.80, powerSupply: 600, modular: false, price: 60 },
  { id: generateUUID(), name: "Seasonic Focus GX-650", efficiencyRating: 0.92, powerSupply: 650, modular: true, price: 100 },
  { id: generateUUID(), name: "Thermaltake Smart", efficiencyRating: 0.75, powerSupply: 500, modular: false, price: 50 },
  { id: generateUUID(), name: "Cooler Master V650", efficiencyRating: 0.88, powerSupply: 650, modular: true, price: 95 }
];

export const data = { CPUs, Motherboards, RAMs, Storages, GPUs, Cases, PSUs };
