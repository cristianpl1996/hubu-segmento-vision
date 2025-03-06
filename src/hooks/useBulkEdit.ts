
import { useState, useCallback } from "react";

interface SegmentWithSelection {
  id: number;
  name: string;
  description: string;
  clientCount: number;
  selected: boolean;
  category?: string;
  generatedCopy?: string;
}

const useBulkEdit = (
  segments: SegmentWithSelection[],
  onUpdateCopy: (id: number, newCopy: string) => void
) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  
  const toggleSelection = useCallback((id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);
  
  const selectAll = useCallback(() => {
    setSelectedIds(segments.map(segment => segment.id));
  }, [segments]);
  
  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);
  
  const applyBulkEdit = useCallback(() => {
    if (!searchText || selectedIds.length === 0) return 0;
    
    let affectedCount = 0;
    
    segments.forEach(segment => {
      if (selectedIds.includes(segment.id) && segment.generatedCopy) {
        const newCopy = segment.generatedCopy.replace(
          new RegExp(searchText, 'gi'), 
          replaceText
        );
        
        if (newCopy !== segment.generatedCopy) {
          onUpdateCopy(segment.id, newCopy);
          affectedCount++;
        }
      }
    });
    
    return affectedCount;
  }, [segments, selectedIds, searchText, replaceText, onUpdateCopy]);
  
  return {
    selectedIds,
    toggleSelection,
    selectAll,
    deselectAll,
    searchText,
    setSearchText,
    replaceText,
    setReplaceText,
    applyBulkEdit
  };
};

export default useBulkEdit;
