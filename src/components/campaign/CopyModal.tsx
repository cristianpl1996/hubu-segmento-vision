
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, FileSpreadsheet, SlidersHorizontal, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import SegmentCopyTable from "./SegmentCopyTable";
import useBulkEdit from "@/hooks/useBulkEdit";

interface SegmentWithSelection {
  id: number;
  name: string;
  description: string;
  clientCount: number;
  selected: boolean;
  category?: string;
  generatedCopy?: string;
}

interface CopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  segments: SegmentWithSelection[];
  onUpdateCopy: (id: number, newCopy: string) => void;
}

const CopyModal = ({ isOpen, onClose, segments, onUpdateCopy }: CopyModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const { toast } = useToast();
  
  const { 
    selectedIds, 
    toggleSelection, 
    selectAll, 
    deselectAll, 
    searchText, 
    replaceText, 
    setSearchText, 
    setReplaceText,
    applyBulkEdit
  } = useBulkEdit(segments, onUpdateCopy);
  
  const filteredSegments = useMemo(() => {
    if (!searchTerm) return segments;
    
    return segments.filter(segment => 
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.generatedCopy?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [segments, searchTerm]);
  
  const segmentsByCategory = useMemo(() => {
    const categories: Record<string, SegmentWithSelection[]> = {};
    
    segments.forEach(segment => {
      const category = segment.category || "Sin categoría";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(segment);
    });
    
    return categories;
  }, [segments]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleExportToExcel = () => {
    toast({
      title: "Exportación iniciada",
      description: "Los datos se están exportando a Excel"
    });
    // Aquí iría la lógica real de exportación
  };
  
  const handleApplyBulkEdit = () => {
    if (selectedIds.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona al menos un segmento para aplicar la edición masiva",
        variant: "destructive"
      });
      return;
    }
    
    if (!searchText) {
      toast({
        title: "Error",
        description: "Ingresa un texto para buscar",
        variant: "destructive"
      });
      return;
    }
    
    const affected = applyBulkEdit();
    
    toast({
      title: "Edición masiva aplicada",
      description: `Se modificaron ${affected} copys`
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            Copys por segmento ({segments.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar segmentos..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportToExcel}
                className="text-hubu-gray-600"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exportar a Excel
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos los segmentos</TabsTrigger>
              <TabsTrigger value="categorias">Por categorías</TabsTrigger>
              <TabsTrigger value="edicion">Edición masiva</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="todos" className="h-full data-[state=active]:flex flex-col">
                <div className="overflow-y-auto flex-1">
                  <SegmentCopyTable 
                    segments={filteredSegments}
                    onUpdateCopy={onUpdateCopy}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="categorias" className="h-full data-[state=active]:flex flex-col">
                <div className="overflow-y-auto flex-1 space-y-6">
                  {Object.entries(segmentsByCategory).map(([category, categorySegments]) => (
                    <div key={category} className="border rounded-md overflow-hidden">
                      <div className="bg-hubu-gray-50 p-3 font-medium text-hubu-gray-700">
                        {category} ({categorySegments.length})
                      </div>
                      <div>
                        <SegmentCopyTable 
                          segments={categorySegments}
                          onUpdateCopy={onUpdateCopy}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="edicion" className="h-full data-[state=active]:flex flex-col">
                <div className="mb-4 p-4 border rounded-md bg-hubu-gray-50">
                  <h3 className="font-medium text-hubu-gray-700 mb-2 flex items-center">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Edición masiva de copys
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-hubu-gray-600 mb-1 block">Buscar texto:</label>
                      <Input 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Texto a reemplazar"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-hubu-gray-600 mb-1 block">Reemplazar por:</label>
                      <Input 
                        value={replaceText} 
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder="Nuevo texto"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button onClick={handleApplyBulkEdit} size="sm">
                      <Check className="mr-1 h-4 w-4" />
                      Aplicar cambios
                    </Button>
                  </div>
                </div>
                
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={selectAll}>Seleccionar todos</Button>
                    <Button variant="outline" size="sm" onClick={deselectAll}>Deseleccionar todos</Button>
                  </div>
                  <div className="text-sm text-hubu-gray-500">
                    {selectedIds.length} segmentos seleccionados
                  </div>
                </div>
                
                <div className="overflow-y-auto flex-1">
                  <SegmentCopyTable 
                    segments={filteredSegments}
                    onUpdateCopy={onUpdateCopy}
                    selectionMode
                    selectedIds={selectedIds}
                    onToggleSelection={toggleSelection}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyModal;
