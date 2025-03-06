
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SegmentGroupProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const SegmentGroup = ({ title, count, icon, children }: SegmentGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8">
      <div 
        className="flex items-center mb-4 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <div className="mr-2">{icon}</div>}
        <h2 className="text-lg font-medium text-hubu-gray-600 flex items-center">
          {title} <span className="ml-2 text-hubu-gray-400">({count})</span>
        </h2>
        <div className="ml-auto">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-hubu-gray-400 group-hover:text-hubu-gray-600 transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-hubu-gray-400 group-hover:text-hubu-gray-600 transition-colors" />
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SegmentGroup;
