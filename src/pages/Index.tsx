
import { useState, useEffect } from "react";
import { PlusCircle, Filter, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SegmentCard from "../components/SegmentCard";
import ConfigPanel from "../components/ConfigPanel";
import SegmentGroup from "../components/SegmentGroup";

// Simulated data
const segmentsByConfig = [
  {
    id: 1,
    name: "Subsegmento clientes con frecuencia baja (6)",
    description: "Subsegmento clientes con frecuencia baja en un rango de 1 y 2",
    date: "05/03/2025 12:16 PM",
    isAIGenerated: false,
    hasCustomConfig: true,
  },
  {
    id: 2,
    name: "Subsegmento 2 (7)",
    description: "Subsegmento 2",
    date: "05/03/2025 07:24 PM",
    isAIGenerated: false,
    hasCustomConfig: true,
  },
];

const idealCustomers = [
  {
    id: 3,
    name: "Última compra reciente, frecuencia alta, ticket promedio alto (18)",
    description: "Clientes que compran frecuentemente y tienen un alto ticket promedio. Estos clientes realizan compras con una frecuencia alta.",
    date: "05/03/2025 05:29 AM",
    isAIGenerated: true,
    hasCustomConfig: false,
  },
  {
    id: 4,
    name: "Última compra hace un tiempo moderado, frecuencia alta, ticket promedio alto (31)",
    description: "Clientes que compran con una frecuencia promedio de 2 veces al mes y tienen un ticket promedio alto de $ 256.008. Su valor total es importante para el negocio.",
    date: "05/03/2025 05:29 AM",
    isAIGenerated: true,
    hasCustomConfig: false,
  },
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    // Simulate search with timeout
    setTimeout(() => {
      const allSegments = [...segmentsByConfig, ...idealCustomers];
      const results = allSegments.filter(
        segment => segment.name.toLowerCase().includes(term.toLowerCase()) || 
                 segment.description.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleReview = (id: number) => {
    console.log(`Reviewing segment with ID: ${id}`);
    // Implementation for reviewing a segment would go here
  };

  // Clear search on component unmount
  useEffect(() => {
    return () => {
      setSearchResults(null);
    };
  }, []);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-hubu-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-hubu-gray-700">Segmentos: 62</h1>
            <nav className="flex items-center space-x-1 text-sm">
              <a href="#" className="text-hubu-gray-500 hover:text-hubu-gray-700">Inicio</a>
              <span className="text-hubu-gray-400 mx-1">{'>'}</span>
              <a href="#" className="text-hubu-gray-700 font-medium">Segmentos</a>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex-1">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Crear segmento
                </motion.button>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse">Cargando resultados...</div>
                </div>
              ) : searchResults ? (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-lg font-medium text-hubu-gray-600">
                      Resultados de búsqueda <span className="text-hubu-gray-400">({searchResults.length})</span>
                    </h2>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.map((segment) => (
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
                  ) : (
                    <div className="bg-white rounded-lg border border-hubu-gray-200 p-8 text-center">
                      <p className="text-hubu-gray-500">No se encontraron resultados para tu búsqueda.</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <motion.div variants={container} initial="hidden" animate="show">
                    <SegmentGroup 
                      title="Segmentos creados por configuración establecida" 
                      count={2}
                      icon={<Filter className="h-5 w-5 text-hubu-gray-400" />}
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
                      count={2}
                      icon={<UsersRound className="h-5 w-5 text-hubu-gray-400" />}
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
                </>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <ConfigPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
