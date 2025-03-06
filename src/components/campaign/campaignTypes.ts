
export type CampaignType = 
  | "retention" 
  | "recompra" 
  | "crossSelling" 
  | "fidelizacion" 
  | "personalizada";

export interface CampaignTypeInfo {
  id: CampaignType;
  title: string;
  description: string;
  icon: string;
  primaryColor: string;
  lightColor: string;
}

export const campaignTypes: CampaignTypeInfo[] = [
  {
    id: "retention",
    title: "Retención",
    description: "Recupera clientes que podrían abandonar",
    icon: "user-minus",
    primaryColor: "text-orange-500",
    lightColor: "bg-orange-50"
  },
  {
    id: "recompra",
    title: "Recompra",
    description: "Incentiva una nueva compra en clientes existentes",
    icon: "shopping-cart",
    primaryColor: "text-purple-500",
    lightColor: "bg-purple-50"
  },
  {
    id: "crossSelling",
    title: "Cross-Selling",
    description: "Ofrece productos complementarios",
    icon: "trending-up",
    primaryColor: "text-blue-500",
    lightColor: "bg-blue-50"
  },
  {
    id: "fidelizacion",
    title: "Fidelización",
    description: "Fortalece la relación con tus mejores clientes",
    icon: "award",
    primaryColor: "text-green-500",
    lightColor: "bg-green-50"
  },
  {
    id: "personalizada",
    title: "Personalizada",
    description: "Crea una campaña a tu medida",
    icon: "settings",
    primaryColor: "text-gray-500",
    lightColor: "bg-gray-50"
  }
];

export const getIconComponent = (iconName: string) => {
  const icons = {
    "user-minus": () => import("lucide-react").then(mod => mod.UserMinus),
    "shopping-cart": () => import("lucide-react").then(mod => mod.ShoppingCart),
    "trending-up": () => import("lucide-react").then(mod => mod.TrendingUp),
    "award": () => import("lucide-react").then(mod => mod.Award),
    "settings": () => import("lucide-react").then(mod => mod.Settings),
  };
  
  return icons[iconName] ? icons[iconName]() : icons["settings"]();
};
