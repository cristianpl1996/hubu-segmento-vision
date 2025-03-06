
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonData {
  value: number;
  formatted: string;
  label: string;
  percentage: number;
  isPercentageOfTotal?: boolean;
}

interface SegmentMetricCardProps {
  title: string;
  value: string;
  suffix?: string;
  icon: React.ReactNode;
  comparison: ComparisonData;
}

const SegmentMetricCard = ({ 
  title, 
  value, 
  suffix, 
  icon, 
  comparison 
}: SegmentMetricCardProps) => {
  const isPositive = comparison.percentage > 0;
  const isNeutral = comparison.percentage === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-hubu-gray-200 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-hubu-gray-600">{title}</h3>
        <div className="h-9 w-9 rounded-full bg-hubu-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex items-end">
          <span className="text-2xl font-semibold text-hubu-gray-700">{value}</span>
          {suffix && (
            <span className="ml-1 text-sm text-hubu-gray-500 mb-0.5">{suffix}</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        {!isNeutral && !comparison.isPercentageOfTotal && (
          <div className={`flex items-center text-xs font-medium ${
            isPositive ? 'text-hubu-green' : 'text-red-500'
          }`}>
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(comparison.percentage)}%
          </div>
        )}
        
        {comparison.isPercentageOfTotal && (
          <div className="flex items-center text-xs font-medium text-hubu-purple">
            {comparison.percentage}%
          </div>
        )}
        
        <span className="text-xs text-hubu-gray-400 ml-1">
          {comparison.isPercentageOfTotal ? 'del ' : 'vs. '}
          {comparison.label}
        </span>
      </div>
    </motion.div>
  );
};

export default SegmentMetricCard;
