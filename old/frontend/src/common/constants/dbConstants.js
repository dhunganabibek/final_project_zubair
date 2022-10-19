export const LAPTOP = 'LAPTOP';
export const DESKTOP = 'DESKTOP';
export const MACBOOK = 'MACBOOK';
export const HARDWARE = 'HARDWARE';
export const SOFTWARE = 'SOFTWARE';
export const OTHERS = 'OTHERS';
export const HARDWARE_REPAIR = 'HARDWARE REPAIR';
export const HARDWARE_UPGRADE = 'HARDWARE UPGRADE';
export const HARDWARE_REPLACEMENT = 'HARDWARE REPLACEMENT';
export const SOFTWARE_INSTALLATION = 'SOFTWARE INSTALLATION';
export const SOFTWARE_DEVELOPMENT = 'SOFTWARE DEVELOPMENT';
export const MOTHERBOARD = 'MOTHERBOARD';
export const RAM = 'RAM';
export const SSD = 'SSD';
export const HARD_DISK = 'HARD DISK';
export const SMPS = 'SMPS';
export const USERS = Object.freeze({
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TICKET_MANAGER: 'TICKET_MANAGER',
  CUSTOMER: 'CUSTOMER',
});

export const ISSUES = [
  {
    id: 1,
    type: HARDWARE,
    value: HARDWARE_REPAIR,
  },
  {
    id: 2,
    type: HARDWARE,
    value: HARDWARE_UPGRADE,
  },
  {
    id: 3,
    type: HARDWARE,
    value: HARDWARE_REPLACEMENT,
  },
  {
    id: 4,
    type: SOFTWARE,
    value: SOFTWARE_INSTALLATION,
  },
  {
    id: 5,
    type: SOFTWARE,
    value: SOFTWARE_DEVELOPMENT,
  },
];
export const ISSUE_TYPE = [
  {
    id: 1,
    type: HARDWARE_REPAIR,
    value: MOTHERBOARD,
  },

  {
    id: 2,
    type: HARDWARE_UPGRADE,
    value: RAM,
  },

  {
    id: 3,
    type: HARDWARE_UPGRADE,
    value: SSD,
  },

  {
    id: 4,
    type: HARDWARE_UPGRADE,
    value: HARD_DISK,
  },

  {
    id: 5,
    type: HARDWARE_REPLACEMENT,
    value: HARD_DISK,
  },

  {
    id: 6,
    type: HARDWARE_REPLACEMENT,
    value: RAM,
  },

  {
    id: 7,
    type: HARDWARE_REPLACEMENT,
    value: SMPS,
  },
  {
    id: 8,
    type: HARDWARE_REPLACEMENT,
    value: MOTHERBOARD,
  },
];
