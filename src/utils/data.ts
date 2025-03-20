const names = ['John', 'Jane', 'Alice', 'Eduardo', 'David'];
const lastName = ['Doe', 'Smith', 'Johnson', 'Williams', 'Rodríguez', 'García'];
const streets = [
  'Principal',
  'Bolívar',
  'Miranda',
  'Negro primero',
  'Concepción',
];
const number = Math.floor(Math.random() * 1000);

export const generateName = (): string =>
  `${names[Math.floor(Math.random() * names.length)]} ${
    lastName[Math.floor(Math.random() * lastName.length)]
  }`;

export const generateAge = (): number =>
  Math.floor(Math.random() * (65 - 18 + 1)) + 18;

export const generateAddress = (): string =>
  `${number} ${streets[Math.floor(Math.random() * streets.length)]} St`;
