export const SOCKETS = ['LGA1700', 'AM4', 'LGA1200', 'AM5'] as const;
export type Socket = typeof SOCKETS[number];

export const FORM_FACTORS = ['ATX', 'MicroATX', 'MiniITX'] as const;
export type FormFactor = typeof FORM_FACTORS[number];

export const RAM_TYPES = ['DDR4', 'DDR5'] as const;
export type RAMType = typeof RAM_TYPES[number];

export const STORAGE_TYPES = ['HDD', 'SSD'] as const;
export type StorageType = typeof STORAGE_TYPES[number];

export const STORAGE_INTERFACES = ['SATA', 'NVMe'] as const;
export type StorageInterface = typeof STORAGE_INTERFACES[number];

export const STORAGE_CAPACITIES = ['500GB', '1TB', '2TB'] as const;
export type StorageCapacity = typeof STORAGE_CAPACITIES[number];