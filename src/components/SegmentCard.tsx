
import { Circle, Flag, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SubsegmentModal from "./SubsegmentModal";

interface SegmentCardProps {
  name: string;
  description: string;
  date: string;
  isAIGenerated?: boolean;
  hasCustomConfig?: boolean;
  onReview: () => void;
}

const SegmentCard = ({
  name,
  description,
  date,
  isAIGenerated = false,
  hasCustomConfig = false,
  onReview,
}: SegmentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border border-hubu-gray-200 overflow-hidden card-hover"
      >
        <div className="p-5">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-md bg-hubu-purple/10 flex items-center justify-center mr-3">
              <Circle className="h-4 w-4 text-hubu-purple" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-hubu-gray-700">{name}</h3>
                <div className="flex space-x-2">
                  {hasCustomConfig && (
                    <span className="badge-config animate-in" style={{ animationDelay: "0.1s" }}>
                      Configuración
                    </span>
                  )}
                  {isAIGenerated && (
                    <span className="badge-ai animate-in" style={{ animationDelay: "0.2s" }}>
                      Generado IA
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center text-xs text-hubu-gray-400 mb-3">
                <span>{date}</span>
                {hasCustomConfig && (
                  <div className="flex items-center ml-2">
                    <Flag className="h-3 w-3 text-hubu-gray-400 mr-1" />
                    <span>Configuración</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-hubu-gray-500 line-clamp-2 mb-4">{description}</p>
              <div className="flex space-x-2">
                <button 
                  onClick={onReview}
                  className="btn-secondary text-sm hover-scale"
                >
                  Revisar
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-segmentation text-sm hover-scale flex items-center"
                  title="Dividir en subsegmentos"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <SubsegmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        segmentName={name}
      />
    </>
  );
};

export default SegmentCard;
