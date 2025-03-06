
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
      
      {previewCount > 0 && (
        <div className="mt-3 pt-3 border-t border-hubu-gray-200">
          <div className="text-xs text-hubu-gray-500 mb-1.5">Impacto sobre el segmento principal:</div>
          <div className="w-full bg-hubu-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-hubu-purple h-2 rounded-full"
              style={{ width: `${Math.min(100, (previewCount / 300) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-hubu-gray-400">
            <span>{Math.round((previewCount / 300) * 100)}% del segmento</span>
            <span>{previewCount} clientes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewSection;
