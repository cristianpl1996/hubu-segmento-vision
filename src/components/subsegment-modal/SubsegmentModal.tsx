
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalHeader from "./ModalHeader";
import SegmentInfo from "./SegmentInfo";
import SubsegmentNameInput from "./SubsegmentNameInput";
import FilterSection from "./FilterSection";
import PreviewSection from "./PreviewSection";
import ModalFooter from "./ModalFooter";
import { filterOptions } from "./filterData";
import { useSubsegment } from "@/hooks/useSubsegment";
import { useToast } from "@/hooks/use-toast";

interface SubsegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPreviewCount: (count: number) => void;
}

const SubsegmentModal = ({ isOpen, onClose, setPreviewCount }: SubsegmentModalProps) => {
  const [subsegmentName, setSubsegmentName] = useState("");
  const [subsegmentDescription, setSubsegmentDescription] = useState("");
  const [previewCount, setPreviewCountInternal] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    frequency: true,
    ticket: true,
    category: false,
    margin: false,
  });
  const { addSubsegment } = useSubsegment();
  const { toast } = useToast();

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
      
      const updatedFilters = {
        ...prev,
        [categoryId]: newFilters
      };
      
      // Update preview count - mock implementation
      const totalSelectedOptions = Object.values(updatedFilters).reduce(
        (total, filters) => total + filters.length, 0
      );
      
      // Generate a preview count based on filters
      const newPreviewCount = totalSelectedOptions > 0
        ? Math.floor(Math.random() * 300) + 100
        : 0;
      
      setPreviewCountInternal(newPreviewCount);
      setPreviewCount(newPreviewCount);
      
      return updatedFilters;
    });
  };

  const handleCreateSubsegment = () => {
    if (!subsegmentName.trim()) return;
    
    // Create the subsegment
    addSubsegment({
      name: subsegmentName,
      description: subsegmentDescription || `Subsegmento basado en ${Object.keys(activeFilters).length} filtros`,
      filters: activeFilters,
      customerCount: previewCount
    });
    
    // Notify user
    toast({
      title: "Subsegmento creado",
      description: `Se ha creado el subsegmento "${subsegmentName}" con ${previewCount} clientes.`,
    });
    
    // Reset form and close modal
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSubsegmentName("");
    setSubsegmentDescription("");
    setActiveFilters({});
    setPreviewCountInternal(0);
    setPreviewCount(0);
  };

  const handleAISubsegmentation = () => {
    // Mock AI subsegmentation
    const aiFilters = {
      frequency: ["high"],
      ticket: ["high", "medium"],
      category: [],
      margin: ["high"]
    };
    
    setActiveFilters(aiFilters);
    const newPreviewCount = 247;
    setPreviewCountInternal(newPreviewCount);
    setPreviewCount(newPreviewCount);
    
    if (!subsegmentName) {
      setSubsegmentName("Clientes de alto valor");
      setSubsegmentDescription("Clientes con alta frecuencia, ticket medio-alto y alto margen");
    }
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
          <ModalHeader onClose={onClose} />

          <div className="p-4">
            <SegmentInfo segmentName="Segment Name" />

            <SubsegmentNameInput 
              subsegmentName={subsegmentName}
              onNameChange={setSubsegmentName}
            />

            <FilterSection
              filterOptions={filterOptions}
              expandedCategories={expandedCategories}
              activeFilters={activeFilters}
              onToggleCategory={toggleCategory}
              onToggleFilter={toggleFilter}
              onAISubsegmentation={handleAISubsegmentation}
            />

            <PreviewSection previewCount={previewCount} />
          </div>

          <ModalFooter
            onCancel={onClose}
            onCreateSubsegment={handleCreateSubsegment}
            isCreateDisabled={!subsegmentName.trim() || previewCount === 0}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubsegmentModal;
