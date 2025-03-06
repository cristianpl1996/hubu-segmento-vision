
import { Eye, Users } from "lucide-react";

interface PreviewSectionProps {
  previewCount: number;
}

const PreviewSection = ({ previewCount }: PreviewSectionProps) => {
  return (
    <div className="bg-hubu-gray-50 p-4 rounded-md mb-6">
      <div className="flex items-center mb-2">
        <Eye className="h-4 w-4 text-hubu-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-hubu-gray-600">Vista previa</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-4 w-4 text-hubu-gray-400 mr-2" />
          <span className="text-sm text-hubu-gray-500">Clientes en el subsegmento:</span>
        </div>
        <span className="font-medium text-hubu-purple">
          {previewCount > 0 ? previewCount : "Sin selección"}
        </span>
      </div>
    </div>
  );
};

export default PreviewSection;
