
import { GitBranch, ChevronRight, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SubsegmentItemProps {
  subsegment: {
    id: number;
    name: string;
    count: number;
    description: string;
    date: string;
  };
}

const SubsegmentListItem = ({ subsegment }: SubsegmentItemProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleReview = () => {
    // En una implementación real, esto redirigiría a la página de detalle del subsegmento
    navigate(`/segment/${subsegment.id}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`p-4 ${isHovered ? 'bg-hubu-gray-50' : 'bg-white'} transition-colors duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <div className="h-7 w-7 rounded-md bg-hubu-purple/10 flex items-center justify-center mr-3 mt-0.5">
          <GitBranch className="h-3.5 w-3.5 text-hubu-purple" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-hubu-gray-700 text-sm">{subsegment.name}</h4>
            <span className="badge-subsegment text-xs px-2 py-0.5">Subsegmento</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-hubu-gray-400 mb-2">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{subsegment.date}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{subsegment.count} clientes</span>
            </div>
          </div>
          
          <p className="text-xs text-hubu-gray-500 line-clamp-2 mb-3">{subsegment.description}</p>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={handleReview}
              className="btn-secondary text-xs py-1.5 px-3 hover-scale flex items-center"
            >
              Revisar
            </button>
            
            <ChevronRight className={`h-4 w-4 ${isHovered ? 'text-hubu-purple' : 'text-hubu-gray-300'} transition-colors duration-200`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubsegmentListItem;
