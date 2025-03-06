
import { useState } from "react";
import { 
  X, 
  Bot, 
  Users, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  AlertCircle,
  Tag 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubsegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
}

interface FilterOption {
  id: string;
  label: string;
  options: {
    id: string;
    label: string;
    value: string;
    count: number;
  }[];
}

const SubsegmentModal = ({ isOpen, onClose, segmentName }: SubsegmentModalProps) => {
  const [subsegmentName, setSubsegmentName] = useState("");
  const [previewCount, setPreviewCount] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    frequency: true,
    ticket: true,
    category: false,
    margin: false,
  });

  // Mock data for filters
  const filterOptions: FilterOption[] = [
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleFilter = (categoryId: string, optionId: string) => {
    setActiveFilters(prev => {
      const currentFilters = prev[categoryId] || [];
      const newFilters = currentFilters.includes(optionId)
        ? currentFilters.filter(id => id !== optionId)
        : [...currentFilters, optionId];
      
      return {
        ...prev,
        [categoryId]: newFilters
      };
    });

    // Update preview count - mock implementation
    const totalSelectedOptions = Object.values(activeFilters).reduce(
      (total, filters) => total + filters.length, 0
    );
    
    // Generate a pseudo-random count based on filters
    setPreviewCount(Math.floor(Math.random() * 300) + 100);
  };

  const handleCreateSubsegment = () => {
    // In a real implementation, this would create the subsegment
    console.log("Creating subsegment with name:", subsegmentName);
    console.log("Active filters:", activeFilters);
    onClose();
  };

  const handleAISubsegmentation = () => {
    // Mock AI subsegmentation
    setActiveFilters({
      frequency: ["high"],
      ticket: ["high", "medium"],
      category: [],
      margin: ["high"]
    });
    setPreviewCount(247);
  };

  const isFilterSelected = (categoryId: string, optionId: string) => {
    return (activeFilters[categoryId] || []).includes(optionId);
  };

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { x: "100%", opacity: 0.5 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onClose}
      >
        <motion.div
          className="bg-white h-full w-full max-w-md overflow-y-auto"
          variants={modalVariants}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-white border-b border-hubu-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-hubu-gray-700">Dividir en subsegmentos</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-hubu-gray-100">
              <X className="h-5 w-5 text-hubu-gray-400" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm text-hubu-gray-500 mb-2">Segmento principal</div>
              <div className="p-3 bg-hubu-gray-50 rounded-md text-hubu-gray-700 font-medium">
                {segmentName}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subsegment-name" className="block text-sm font-medium text-hubu-gray-600 mb-2">
                Nombre del subsegmento
              </label>
              <input
                id="subsegment-name"
                type="text"
                value={subsegmentName}
                onChange={(e) => setSubsegmentName(e.target.value)}
                placeholder="Nombre del nuevo subsegmento"
                className="w-full p-2 border border-hubu-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-hubu-purple/30 focus:border-hubu-purple/30"
              />
            </div>

            <div className="border-t border-hubu-gray-200 pt-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-hubu-gray-700">Filtros de segmentación</h3>
                <button
                  onClick={handleAISubsegmentation}
                  className="btn-primary flex items-center text-sm py-1.5"
                >
                  <Bot className="h-3.5 w-3.5 mr-1.5" />
                  Sugerir con IA
                </button>
              </div>

              <div className="space-y-3">
                {filterOptions.map((category) => (
                  <div key={category.id} className="border border-hubu-gray-200 rounded-md overflow-hidden">
                    <div 
                      className="p-3 bg-hubu-gray-50 flex justify-between items-center cursor-pointer hover:bg-hubu-gray-100"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="font-medium text-hubu-gray-600">{category.label}</span>
                      {expandedCategories[category.id] ? (
                        <ChevronUp className="h-4 w-4 text-hubu-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-hubu-gray-400" />
                      )}
                    </div>
                    
                    {expandedCategories[category.id] && (
                      <div className="p-3 space-y-2">
                        {category.options.map((option) => (
                          <div 
                            key={option.id}
                            className={`p-2 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                              isFilterSelected(category.id, option.id)
                                ? "bg-hubu-purple/10 text-hubu-purple"
                                : "hover:bg-hubu-gray-50"
                            }`}
                            onClick={() => toggleFilter(category.id, option.id)}
                          >
                            <div className="flex items-center">
                              <span className={`text-sm ${isFilterSelected(category.id, option.id) ? "font-medium" : ""}`}>
                                {option.label}
                              </span>
                            </div>
                            <span className="text-xs text-hubu-gray-400">
                              {option.count} clientes
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
          </div>

          <div className="sticky bottom-0 bg-white border-t border-hubu-gray-200 p-4 flex justify-between items-center">
            <button 
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateSubsegment}
              disabled={!subsegmentName.trim() || previewCount === 0}
              className="btn-primary disabled:opacity-50 disabled:bg-hubu-gray-300"
            >
              Crear subsegmento
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubsegmentModal;
