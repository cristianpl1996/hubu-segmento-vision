
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Edit, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SegmentWithSelection {
  id: number;
  name: string;
  description: string;
  clientCount: number;
  selected: boolean;
  category?: string;
  generatedCopy?: string;
}

interface SegmentCopyTableProps {
  segments: SegmentWithSelection[];
  onUpdateCopy: (id: number, newCopy: string) => void;
  selectionMode?: boolean;
  selectedIds?: number[];
  onToggleSelection?: (id: number) => void;
}

const SegmentCopyTable = ({ 
  segments, 
  onUpdateCopy,
  selectionMode = false,
  selectedIds = [],
  onToggleSelection = () => {}
}: SegmentCopyTableProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCopy, setEditingCopy] = useState("");
  
  const handleStartEditing = (segment: SegmentWithSelection) => {
    setEditingId(segment.id);
    setEditingCopy(segment.generatedCopy || "");
  };
  
  const handleSaveEdit = () => {
    if (editingId !== null) {
      onUpdateCopy(editingId, editingCopy);
      setEditingId(null);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  const isSelected = (id: number) => selectedIds.includes(id);
  
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-hubu-gray-50">
          {selectionMode && (
            <th className="p-3 text-left text-sm font-medium text-hubu-gray-600 w-12">
              Sel.
            </th>
          )}
          <th className="p-3 text-left text-sm font-medium text-hubu-gray-600 w-64">Segmento</th>
          <th className="p-3 text-left text-sm font-medium text-hubu-gray-600">Copy generado</th>
          <th className="p-3 text-left text-sm font-medium text-hubu-gray-600 w-20">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {segments.map((segment) => (
          <tr 
            key={segment.id} 
            className={cn(
              "border-b border-hubu-gray-100", 
              editingId === segment.id ? "bg-hubu-purple/5" : "hover:bg-hubu-gray-50",
              isSelected(segment.id) && "bg-hubu-purple/10"
            )}
          >
            {selectionMode && (
              <td className="p-3 align-top">
                <input 
                  type="checkbox" 
                  className="rounded border-hubu-gray-300 text-hubu-purple"
                  checked={isSelected(segment.id)} 
                  onChange={() => onToggleSelection(segment.id)}
                />
              </td>
            )}
            <td className="p-3 align-top">
              <div className="font-medium text-hubu-gray-700">{segment.name}</div>
              <div className="text-xs text-hubu-gray-500 mt-1">{segment.clientCount} clientes</div>
              {segment.category && (
                <div className="text-xs text-hubu-gray-500 mt-1">
                  <span className="bg-hubu-gray-100 px-2 py-0.5 rounded-full">
                    {segment.category}
                  </span>
                </div>
              )}
            </td>
            <td className="p-3">
              {editingId === segment.id ? (
                <Textarea 
                  value={editingCopy} 
                  onChange={(e) => setEditingCopy(e.target.value)}
                  rows={4}
                  className="w-full text-sm"
                />
              ) : (
                <div className="text-sm text-hubu-gray-700 whitespace-pre-line">
                  {segment.generatedCopy || "No hay copy generado"}
                </div>
              )}
            </td>
            <td className="p-3 align-top">
              {editingId === segment.id ? (
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleSaveEdit}
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <Check className="h-4 w-4 text-hubu-green" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCancelEdit}
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <X className="h-4 w-4 text-hubu-gray-500" />
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleStartEditing(segment)}
                  className="flex items-center justify-center w-8 h-8 p-0"
                >
                  <Edit className="h-4 w-4 text-hubu-gray-500" />
                </Button>
              )}
            </td>
          </tr>
        ))}
        {segments.length === 0 && (
          <tr>
            <td colSpan={selectionMode ? 4 : 3} className="p-8 text-center text-hubu-gray-500">
              No se encontraron segmentos
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SegmentCopyTable;
