
import { Segment } from "../data/segmentData";
import SegmentGroup from "./SegmentGroup";
import SegmentCard from "./SegmentCard";
import SubsegmentCard from "./SubsegmentCard";
import { Filter, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SegmentListProps {
  segmentsByConfig: Segment[];
  idealCustomers: Segment[];
  isLoading: boolean;
  searchResults: Segment[] | null;
}

const SegmentList = ({ segmentsByConfig, idealCustomers, isLoading, searchResults }: SegmentListProps) => {
  const navigate = useNavigate();

  const handleReview = (id: number) => {
    navigate(`/segment/${id}`);
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return <div className="py-4 text-center text-hubu-gray-500">Buscando segmentos...</div>;
  }

  if (searchResults) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((segment) => (
            <SegmentCard
              key={segment.id}
              name={segment.name}
              description={segment.description}
              date={segment.date}
              isAIGenerated={segment.isAIGenerated}
              hasCustomConfig={segment.hasCustomConfig}
              onReview={() => handleReview(segment.id)}
            />
          ))
        ) : (
          <div className="col-span-2 py-4 text-center text-hubu-gray-500">
            No se encontraron segmentos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <SegmentGroup 
        title="Segmentos creados por configuración establecida" 
        count={segmentsByConfig.length}
        icon={<Filter className="h-5 w-5 text-hubu-gray-400" />}
        hasSubsegments={segmentsByConfig.some(segment => segment.hasSubsegments)}
        subsegments={
          <div className="grid grid-cols-1 gap-3 mt-2">
            {segmentsByConfig
              .flatMap(segment => segment.subsegments)
              .map(subsegment => (
                <SubsegmentCard
                  key={subsegment.id}
                  name={subsegment.name}
                  count={subsegment.count}
                  description={subsegment.description}
                  date={subsegment.date}
                  onReview={() => handleReview(subsegment.id)}
                />
              ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segmentsByConfig.map((segment) => (
            <SegmentCard
              key={segment.id}
              name={segment.name}
              description={segment.description}
              date={segment.date}
              isAIGenerated={segment.isAIGenerated}
              hasCustomConfig={segment.hasCustomConfig}
              onReview={() => handleReview(segment.id)}
            />
          ))}
        </div>
      </SegmentGroup>
      
      <SegmentGroup 
        title="Clientes ideales" 
        count={idealCustomers.length}
        icon={<UsersRound className="h-5 w-5 text-hubu-gray-400" />}
        hasSubsegments={idealCustomers.some(segment => segment.hasSubsegments)}
        subsegments={
          <div className="grid grid-cols-1 gap-3 mt-2">
            {idealCustomers
              .flatMap(segment => segment.subsegments)
              .map(subsegment => (
                <SubsegmentCard
                  key={subsegment.id}
                  name={subsegment.name}
                  count={subsegment.count}
                  description={subsegment.description}
                  date={subsegment.date}
                  onReview={() => handleReview(subsegment.id)}
                />
              ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {idealCustomers.map((segment) => (
            <SegmentCard
              key={segment.id}
              name={segment.name}
              description={segment.description}
              date={segment.date}
              isAIGenerated={segment.isAIGenerated}
              hasCustomConfig={segment.hasCustomConfig}
              onReview={() => handleReview(segment.id)}
            />
          ))}
        </div>
      </SegmentGroup>
    </motion.div>
  );
};

export default SegmentList;
