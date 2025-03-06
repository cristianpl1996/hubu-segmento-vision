
import { useEffect } from "react";
import SegmentLayout from "../components/SegmentLayout";
import PageHeader from "../components/PageHeader";
import SegmentList from "../components/SegmentList";
import ConfigPanel from "../components/ConfigPanel";
import { segmentsByConfig, idealCustomers } from "../data/segmentData";
import { useSegmentSearch } from "../hooks/useSegmentSearch";

const Index = () => {
  const allSegments = [...segmentsByConfig, ...idealCustomers];
  const { searchResults, isLoading, handleSearch, setSearchResults } = useSegmentSearch(allSegments);

  useEffect(() => {
    return () => {
      setSearchResults(null);
    };
  }, [setSearchResults]);

  const breadcrumbs = [
    { label: "Inicio", href: "#" },
    { label: "Segmentos", href: "#", active: true }
  ];

  return (
    <SegmentLayout sidebar={<ConfigPanel />}>
      <PageHeader 
        title="Segmentos" 
        count={62} 
        breadcrumbs={breadcrumbs}
        onSearch={handleSearch}
      />
      
      <SegmentList 
        segmentsByConfig={segmentsByConfig}
        idealCustomers={idealCustomers}
        isLoading={isLoading}
        searchResults={searchResults}
      />
    </SegmentLayout>
  );
};

export default Index;
