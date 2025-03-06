
import { Bot } from "lucide-react";
import FilterCategory from "./FilterCategory";

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count: number;
}

interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterSectionProps {
  filterOptions: FilterCategory[];
  expandedCategories: Record<string, boolean>;
  activeFilters: Record<string, string[]>;
  onToggleCategory: (categoryId: string) => void;
  onToggleFilter: (categoryId: string, optionId: string) => void;
  onAISubsegmentation: () => void;
}

const FilterSection = ({
  filterOptions,
  expandedCategories,
  activeFilters,
  onToggleCategory,
  onToggleFilter,
  onAISubsegmentation,
}: FilterSectionProps) => {
  return (
    <div className="border-t border-hubu-gray-200 pt-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-hubu-gray-700">Filtros de segmentación</h3>
        <button
          onClick={onAISubsegmentation}
          className="btn-primary flex items-center text-sm py-1.5"
        >
          <Bot className="h-3.5 w-3.5 mr-1.5" />
          Sugerir con IA
        </button>
      </div>

      <div className="space-y-3">
        {filterOptions.map((category) => (
          <FilterCategory
            key={category.id}
            id={category.id}
            label={category.label}
            options={category.options}
            isExpanded={expandedCategories[category.id] || false}
            activeFilters={activeFilters[category.id] || []}
            onToggleCategory={onToggleCategory}
            onToggleFilter={onToggleFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
