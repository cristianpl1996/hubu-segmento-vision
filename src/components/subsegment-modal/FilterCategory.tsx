
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count: number;
}

interface FilterCategoryProps {
  id: string;
  label: string;
  options: FilterOption[];
  isExpanded: boolean;
  activeFilters: string[];
  onToggleCategory: (categoryId: string) => void;
  onToggleFilter: (categoryId: string, optionId: string) => void;
}

const FilterCategory = ({
  id,
  label,
  options,
  isExpanded,
  activeFilters,
  onToggleCategory,
  onToggleFilter,
}: FilterCategoryProps) => {
  const isFilterSelected = (optionId: string) => {
    return activeFilters.includes(optionId);
  };

  return (
    <div className="border border-hubu-gray-200 rounded-md overflow-hidden">
      <div 
        className="p-3 bg-hubu-gray-50 flex justify-between items-center cursor-pointer hover:bg-hubu-gray-100"
        onClick={() => onToggleCategory(id)}
      >
        <span className="font-medium text-hubu-gray-600">{label}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-hubu-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-hubu-gray-400" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-3 space-y-2">
          {options.map((option) => (
            <div 
              key={option.id}
              className={`p-2 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                isFilterSelected(option.id)
                  ? "bg-hubu-purple/10 text-hubu-purple"
                  : "hover:bg-hubu-gray-50"
              }`}
              onClick={() => onToggleFilter(id, option.id)}
            >
              <div className="flex items-center">
                <span className={`text-sm ${isFilterSelected(option.id) ? "font-medium" : ""}`}>
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
  );
};

export default FilterCategory;
