
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SegmentGroupProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
  hasSubsegments?: boolean;
  subsegments?: React.ReactNode;
}

const SegmentGroup = ({ 
  title, 
  count, 
  icon, 
  children,
  hasSubsegments = false,
  subsegments
}: SegmentGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [areSubsegmentsOpen, setAreSubsegmentsOpen] = useState(true);

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
            
            {hasSubsegments && subsegments && (
              <div className="mt-4 ml-6 border-l-2 border-hubu-gray-200 pl-4">
                <div 
                  className="flex items-center mb-3 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAreSubsegmentsOpen(!areSubsegmentsOpen);
                  }}
                >
                  <h3 className="text-base font-medium text-hubu-gray-600 flex items-center">
                    Subsegmentos
                  </h3>
                  <div className="ml-2">
                    {areSubsegmentsOpen ? (
                      <ChevronUp className="h-4 w-4 text-hubu-gray-400 group-hover:text-hubu-gray-600 transition-colors" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-hubu-gray-400 group-hover:text-hubu-gray-600 transition-colors" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {areSubsegmentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {subsegments}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SegmentGroup;
