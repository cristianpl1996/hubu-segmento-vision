
import { GitBranch, Users } from "lucide-react";
import { motion } from "framer-motion";

interface SubsegmentCardProps {
  name: string;
  count: number;
  description: string;
  date: string;
  onReview: () => void;
}

const SubsegmentCard = ({
  name,
  count,
  description,
  date,
  onReview,
}: SubsegmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 rounded-lg border-l-2 border-l-hubu-purple border border-hubu-gray-200 overflow-hidden card-hover"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="h-7 w-7 rounded-md bg-hubu-purple/10 flex items-center justify-center mr-3">
            <GitBranch className="h-3.5 w-3.5 text-hubu-purple" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="font-medium text-hubu-gray-700 text-sm">{name}</h3>
                <div className="text-xs text-hubu-gray-400 mt-0.5 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{count} clientes</span>
                </div>
              </div>
              <span className="badge-subsegment text-xs px-2 py-0.5">Subsegmento</span>
            </div>
            <div className="flex items-center text-xs text-hubu-gray-400 mb-2">
              <span>{date}</span>
            </div>
            <p className="text-xs text-hubu-gray-500 line-clamp-2 mb-3">{description}</p>
            <button 
              onClick={onReview}
              className="btn-secondary text-xs py-1.5 px-3 hover-scale"
            >
              Revisar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubsegmentCard;
