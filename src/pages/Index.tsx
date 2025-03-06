
import { useEffect } from "react";
import Layout from "../components/Layout";
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
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
        </div>
        
        <div className="lg:col-span-1">
          <ConfigPanel />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
