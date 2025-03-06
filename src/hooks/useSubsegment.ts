
import { useState } from 'react';

interface Subsegment {
  id: number;
  name: string;
  description: string;
  filters: Record<string, string[]>;
  customerCount: number;
}

export const useSubsegment = () => {
  const [subsegments, setSubsegments] = useState<Subsegment[]>([]);
  
  const addSubsegment = (subsegment: Omit<Subsegment, 'id'>) => {
    const newId = subsegments.length > 0 
      ? Math.max(...subsegments.map(s => s.id)) + 1 
      : 1;
    
    setSubsegments([...subsegments, { ...subsegment, id: newId }]);
    return newId;
  };

  const updateSubsegment = (id: number, updates: Partial<Omit<Subsegment, 'id'>>) => {
    setSubsegments(
      subsegments.map(subsegment => 
        subsegment.id === id ? { ...subsegment, ...updates } : subsegment
      )
    );
  };

  const deleteSubsegment = (id: number) => {
    setSubsegments(subsegments.filter(subsegment => subsegment.id !== id));
  };

  return {
    subsegments,
    addSubsegment,
    updateSubsegment,
    deleteSubsegment
  };
};
