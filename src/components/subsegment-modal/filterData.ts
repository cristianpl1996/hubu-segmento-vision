
export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count: number;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

// Mock data for filters
export const filterOptions: FilterCategory[] = [
  {
    id: "frequency",
    label: "Frecuencia de compra",
    options: [
      { id: "high", label: "Alta", value: "high", count: 238 },
      { id: "medium", label: "Media", value: "medium", count: 456 },
      { id: "low", label: "Baja", value: "low", count: 322 },
    ],
  },
  {
    id: "ticket",
    label: "Ticket promedio",
    options: [
      { id: "high", label: "Alto", value: "high", count: 194 },
      { id: "medium", label: "Medio", value: "medium", count: 512 },
      { id: "low", label: "Bajo", value: "low", count: 310 },
    ],
  },
  {
    id: "category",
    label: "Categoría de producto más comprado",
    options: [
      { id: "electronics", label: "Electrónicos", value: "electronics", count: 215 },
      { id: "clothing", label: "Ropa", value: "clothing", count: 342 },
      { id: "home", label: "Hogar", value: "home", count: 189 },
      { id: "beauty", label: "Belleza", value: "beauty", count: 126 },
      { id: "food", label: "Alimentación", value: "food", count: 144 },
    ],
  },
  {
    id: "margin",
    label: "Margen generado por cliente",
    options: [
      { id: "high", label: "Alto", value: "high", count: 168 },
      { id: "medium", label: "Medio", value: "medium", count: 486 },
      { id: "low", label: "Bajo", value: "low", count: 362 },
    ],
  },
];
