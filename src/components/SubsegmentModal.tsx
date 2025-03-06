
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalHeader from "./subsegment-modal/ModalHeader";
import SegmentInfo from "./subsegment-modal/SegmentInfo";
import SubsegmentNameInput from "./subsegment-modal/SubsegmentNameInput";
import FilterSection from "./subsegment-modal/FilterSection";
import PreviewSection from "./subsegment-modal/PreviewSection";
import ModalFooter from "./subsegment-modal/ModalFooter";
import { filterOptions } from "./subsegment-modal/filterData";

interface SubsegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
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
            <SegmentInfo segmentName={segmentName} />

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
