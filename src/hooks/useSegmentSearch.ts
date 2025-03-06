
import { useState } from 'react';
import { Segment } from '../data/segmentData';

export const useSegmentSearch = (allSegments: Segment[]) => {
  const [searchResults, setSearchResults] = useState<null | Segment[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const results = allSegments.filter(
        segment => segment.name.toLowerCase().includes(term.toLowerCase()) || 
                 segment.description.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  return {
    searchResults,
    isLoading,
    handleSearch,
    setSearchResults
  };
};
