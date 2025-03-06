
import { ChevronDown, ChevronUp, GitBranch } from "lucide-react";
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
              <div className="mt-4 ml-6 border-l-2 border-hubu-purple pl-4 pt-2 pb-2 relative before:absolute before:w-4 before:h-0.5 before:bg-hubu-purple before:top-0 before:left-0 after:absolute after:w-4 after:h-0.5 after:bg-hubu-purple after:bottom-0 after:left-0">
                <div 
                  className="flex items-center mb-3 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAreSubsegmentsOpen(!areSubsegmentsOpen);
                  }}
                >
                  <div className="mr-2 bg-hubu-purple/10 p-1 rounded">
                    <GitBranch className="h-4 w-4 text-hubu-purple" />
                  </div>
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
                      <button 
                        className="ml-2 mt-3 text-sm text-hubu-purple flex items-center hover:underline"
                      >
                        <GitBranch className="h-3.5 w-3.5 mr-1.5" />
                        Crear nuevo subsegmento
                      </button>
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
