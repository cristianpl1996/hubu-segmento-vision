
import { Edit, Users } from "lucide-react";

interface CampaignHeaderProps {
  segmentName: string;
  clientCount: number;
  onEditFilters: () => void;
}

const CampaignHeader = ({ segmentName, clientCount, onEditFilters }: CampaignHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-hubu-gray-500 mb-1">Segmento seleccionado</div>
          <div className="text-hubu-gray-700 font-medium">{segmentName}</div>
        </div>
        <button 
          onClick={onEditFilters}
          className="text-xs bg-hubu-gray-100 hover:bg-hubu-gray-200 text-hubu-gray-600 px-2 py-1 rounded flex items-center"
        >
          <Edit className="h-3 w-3 mr-1" />
          Editar filtros
        </button>
      </div>
      
      <div className="flex items-center text-sm text-hubu-gray-500 mt-2">
        <Users className="h-4 w-4 text-hubu-gray-400 mr-1.5" />
        <span><strong>{clientCount}</strong> clientes</span>
      </div>
      
      <div className="h-px bg-hubu-gray-200 w-full my-4"></div>
    </div>
  );
};

export default CampaignHeader;
