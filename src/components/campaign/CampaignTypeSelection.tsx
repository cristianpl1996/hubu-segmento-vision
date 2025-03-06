
import { useState, useEffect } from "react";
import { campaignTypes, CampaignType, getIconComponent } from "./campaignTypes";
import { dynamic } from "@/lib/utils";

interface CampaignTypeSelectionProps {
  campaignType: CampaignType | null;
  onSelectCampaignType: (type: CampaignType) => void;
  campaignName: string;
  onChangeCampaignName: (name: string) => void;
}

const CampaignTypeSelection = ({ 
  campaignType, 
  onSelectCampaignType,
  campaignName,
  onChangeCampaignName
}: CampaignTypeSelectionProps) => {
  const [loadedIcons, setLoadedIcons] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadIcons = async () => {
      const iconPromises = campaignTypes.map(async type => {
        const IconComponent = await getIconComponent(type.icon);
        return { id: type.id, component: IconComponent };
      });

      const loadedIconsArray = await Promise.all(iconPromises);
      const iconsMap = loadedIconsArray.reduce((acc, { id, component }) => {
        acc[id] = component;
        return acc;
      }, {});

      setLoadedIcons(iconsMap);
    };

    loadIcons();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="campaignName" className="block text-sm font-medium text-hubu-gray-700 mb-1">
          Nombre de la campaña
        </label>
        <input
          id="campaignName"
          type="text"
          value={campaignName}
          onChange={(e) => onChangeCampaignName(e.target.value)}
          className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hubu-purple focus:border-transparent"
          placeholder="Ej: Campaña de Navidad 2025"
        />
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-medium text-hubu-gray-700 mb-3">
          Selecciona el tipo de campaña
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {campaignTypes.map((type) => {
            const IconComponent = loadedIcons[type.id];
            
            return (
              <button
                key={type.id}
                onClick={() => onSelectCampaignType(type.id)}
                className={`flex items-start p-3 rounded-lg border transition-all ${
                  campaignType === type.id 
                    ? `border-${type.primaryColor.split('-')[0]}-300 bg-${type.lightColor.split('-')[0]}-50` 
                    : 'border-hubu-gray-200 hover:bg-hubu-gray-50'
                }`}
              >
                <div className={`h-8 w-8 rounded-md ${type.lightColor} flex items-center justify-center mr-3`}>
                  {IconComponent && <IconComponent className={`h-4 w-4 ${type.primaryColor}`} />}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-hubu-gray-700">{type.title}</h4>
                  <p className="text-xs text-hubu-gray-500 mt-1">{type.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampaignTypeSelection;
