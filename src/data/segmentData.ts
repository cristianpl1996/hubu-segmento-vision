
export const segmentsByConfig = [
  {
    id: 1,
    name: "Subsegmento clientes con frecuencia baja (6)",
    description: "Subsegmento clientes con frecuencia baja en un rango de 1 y 2",
    date: "05/03/2025 12:16 PM",
    isAIGenerated: false,
    hasCustomConfig: true,
    hasSubsegments: true,
    subsegments: [
      {
        id: 101,
        name: "Frecuencia baja, ticket alto",
        count: 24,
        description: "Clientes que compran esporádicamente, pero dejan un ticket alto en cada compra",
        date: "10/03/2025 03:22 PM",
      },
      {
        id: 102,
        name: "Compradores esporádicos de electrónica",
        count: 18,
        description: "Clientes esporádicos con preferencia por productos de electrónica",
        date: "10/03/2025 03:45 PM",
      }
    ]
  },
  {
    id: 2,
    name: "Subsegmento 2 (7)",
    description: "Subsegmento 2",
    date: "05/03/2025 07:24 PM",
    isAIGenerated: false,
    hasCustomConfig: true,
    hasSubsegments: false,
    subsegments: []
  },
];

export const idealCustomers = [
  {
    id: 3,
    name: "Última compra reciente, frecuencia alta, ticket promedio alto (18)",
    description: "Clientes que compran frecuentemente y tienen un alto ticket promedio. Estos clientes realizan compras con una frecuencia alta.",
    date: "05/03/2025 05:29 AM",
    isAIGenerated: true,
    hasCustomConfig: false,
    hasSubsegments: true,
    subsegments: [
      {
        id: 301,
        name: "Compradores premium frecuentes",
        count: 42,
        description: "Clientes recurrentes con preferencia por productos de alta gama",
        date: "12/03/2025 09:15 AM",
      }
    ]
  },
  {
    id: 4,
    name: "Última compra hace un tiempo moderado, frecuencia alta, ticket promedio alto (31)",
    description: "Clientes que compran con una frecuencia promedio de 2 veces al mes y tienen un ticket promedio alto de $ 256.008. Su valor total es importante para el negocio.",
    date: "05/03/2025 05:29 AM",
    isAIGenerated: true,
    hasCustomConfig: false,
    hasSubsegments: false,
    subsegments: []
  },
];

export type Segment = {
  id: number;
  name: string;
  description: string;
  date: string;
  isAIGenerated: boolean;
  hasCustomConfig: boolean;
  hasSubsegments: boolean;
  subsegments: Subsegment[];
};

export type Subsegment = {
  id: number;
  name: string;
  count: number;
  description: string;
  date: string;
};
