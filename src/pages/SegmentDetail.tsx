import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Edit, Download, Users, BarChart3, PieChart, LineChart, CreditCard, ShoppingBag, GitBranch, FileSpreadsheet, ExternalLink, MessageSquare, Scale } from "lucide-react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import SegmentMetricCard from "../components/SegmentMetricCard";
import SubsegmentListItem from "../components/SubsegmentListItem";
import ClientListItem from "../components/ClientListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignModal from "../components/campaign/CampaignModal";

// Mock data - en una aplicación real, esto vendría de una API o base de datos
const segmentData = {
  1: {
    id: 1,
    name: "Subsegmento clientes con frecuencia baja (6)",
    description: "Subsegmento clientes con frecuencia baja en un rango de 1 y 2",
    date: "05/03/2025 12:16 PM",
    modifiedDate: "10/03/2025 03:45 PM",
    isAIGenerated: false,
    hasCustomConfig: true,
    totalClients: 24,
    averageTicket: 45800,
    purchaseFrequency: 1.2,
    totalValue: 1099200,
    lastMonthValue: 183200,
    filters: [
      "Frecuencia de compra: Baja (1-2 compras)",
      "Ticket promedio: Entre $30.000 y $60.000",
      "Última compra: Últimos 60 días"
    ],
    topCategories: [
      { name: "Electrónica", percentage: 35 },
      { name: "Hogar", percentage: 25 },
      { name: "Ropa", percentage: 20 },
      { name: "Alimentación", percentage: 15 },
      { name: "Otros", percentage: 5 }
    ],
    subsegments: [
      {
        id: 101,
        name: "Frecuencia baja, ticket alto",
        count: 24,
        description: "Clientes que compran esporádicamente, pero dejan un ticket alto en cada compra",
        date: "10/03/2025 03:22 PM",
      },
      {
        id: 102,
        name: "Compradores esporádicos de electrónica",
        count: 18,
        description: "Clientes esporádicos con preferencia por productos de electrónica",
        date: "10/03/2025 03:45 PM",
      }
    ],
    clients: [
      {
        id: "CL001",
        name: "Juan Pérez",
        lastPurchase: { date: "01/03/2025", amount: 52340 },
        frequency: "Baja",
        averageTicket: 48750,
        topProducts: ["Smart TV Samsung", "Audífonos Sony"]
      },
      {
        id: "CL002",
        name: "María González",
        lastPurchase: { date: "28/02/2025", amount: 39850 },
        frequency: "Baja",
        averageTicket: 43200,
        topProducts: ["Licuadora Oster", "Juego de sábanas"]
      },
      {
        id: "CL003",
        name: "Carlos Ramírez",
        lastPurchase: { date: "20/02/2025", amount: 61200 },
        frequency: "Baja",
        averageTicket: 52100,
        topProducts: ["Laptop HP", "Mouse inalámbrico"]
      },
      {
        id: "CL004",
        name: "Ana Torres",
        lastPurchase: { date: "15/02/2025", amount: 43750 },
        frequency: "Baja",
        averageTicket: 44300,
        topProducts: ["Vestido casual", "Zapatos deportivos"]
      },
      {
        id: "CL005",
        name: "Luis Morales",
        lastPurchase: { date: "10/02/2025", amount: 36980 },
        frequency: "Baja",
        averageTicket: 40250,
        topProducts: ["Productos de despensa", "Botella de vino"]
      }
    ]
  },
  3: {
    id: 3,
    name: "Última compra reciente, frecuencia alta, ticket promedio alto (18)",
    description: "Clientes que compran frecuentemente y tienen un alto ticket promedio. Estos clientes realizan compras con una frecuencia alta.",
    date: "05/03/2025 05:29 AM",
    modifiedDate: "12/03/2025 09:15 AM",
    isAIGenerated: true,
    hasCustomConfig: false,
    totalClients: 42,
    averageTicket: 128500,
    purchaseFrequency: 4.7,
    totalValue: 5397000,
    lastMonthValue: 1156500,
    filters: [
      "Frecuencia de compra: Alta (más de 4 compras mensuales)",
      "Ticket promedio: Superior a $100.000",
      "Última compra: Últimos 7 días"
    ],
    topCategories: [
      { name: "Electrónica", percentage: 40 },
      { name: "Moda Premium", percentage: 30 },
      { name: "Hogar", percentage: 15 },
      { name: "Alimentación Gourmet", percentage: 10 },
      { name: "Otros", percentage: 5 }
    ],
    subsegments: [
      {
        id: 301,
        name: "Compradores premium frecuentes",
        count: 42,
        description: "Clientes recurrentes con preferencia por productos de alta gama",
        date: "12/03/2025 09:15 AM",
      }
    ],
    clients: [
      {
        id: "CL101",
        name: "Roberto Silva",
        lastPurchase: { date: "05/03/2025", amount: 145670 },
        frequency: "Alta",
        averageTicket: 132800,
        topProducts: ["iPhone 15 Pro", "MacBook Air"]
      },
      {
        id: "CL102",
        name: "Sofía Méndez",
        lastPurchase: { date: "04/03/2025", amount: 124350 },
        frequency: "Alta",
        averageTicket: 118900,
        topProducts: ["Bolso Louis Vuitton", "Perfume Chanel"]
      },
      {
        id: "CL103",
        name: "Fernando Castro",
        lastPurchase: { date: "03/03/2025", amount: 138750 },
        frequency: "Alta",
        averageTicket: 129400,
        topProducts: ["Smart TV LG OLED", "Sonos Soundbar"]
      },
      {
        id: "CL104",
        name: "Carolina Herrera",
        lastPurchase: { date: "02/03/2025", amount: 142300 },
        frequency: "Alta",
        averageTicket: 136500,
        topProducts: ["Vestido de diseñador", "Zapatos Jimmy Choo"]
      },
      {
        id: "CL105",
        name: "Martín López",
        lastPurchase: { date: "01/03/2025", amount: 118750 },
        frequency: "Alta",
        averageTicket: 124900,
        topProducts: ["Set de vinos premium", "Cafetera Nespresso"]
      }
    ]
  }
};

// Mock data para los clientes generales (para comparación)
const generalStats = {
  averageTicket: 75200,
  purchaseFrequency: 2.8,
  totalValue: 15840000,
  lastMonthValue: 3384000,
};

const SegmentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  
  // En caso de que el ID no exista en nuestros datos
  if (!id || !segmentData[Number(id)]) {
    return (
      <div className="min-h-screen bg-hubu-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium text-hubu-gray-600 mb-4">Segmento no encontrado</h2>
            <p className="text-hubu-gray-500 mb-8">El segmento que estás buscando no existe o ha sido eliminado.</p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary flex items-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a segmentos
            </button>
          </div>
        </main>
      </div>
    );
  }

  const segment = segmentData[Number(id)];
  
  // Función para formatear números como dinero
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-CL')}`;
  };

  // Función para volver a la página principal
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-hubu-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Barra de navegación */}
        <nav className="flex items-center space-x-1 text-sm mb-6">
          <button onClick={handleBack} className="text-hubu-gray-500 hover:text-hubu-gray-700 flex items-center">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Inicio
          </button>
          <span className="text-hubu-gray-400 mx-1">{'>'}</span>
          <a href="#" className="text-hubu-gray-500 hover:text-hubu-gray-700">Segmentos</a>
          <span className="text-hubu-gray-400 mx-1">{'>'}</span>
          <span className="text-hubu-gray-700 font-medium">{segment.name}</span>
        </nav>
        
        {/* Encabezado del segmento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg border border-hubu-gray-200 p-6 mb-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <h1 className="text-2xl font-semibold text-hubu-gray-700 mr-3">{segment.name}</h1>
                <div className="flex space-x-2">
                  {segment.hasCustomConfig && (
                    <span className="badge-config animate-in" style={{ animationDelay: "0.1s" }}>
                      Configuración
                    </span>
                  )}
                  {segment.isAIGenerated && (
                    <span className="badge-ai animate-in" style={{ animationDelay: "0.2s" }}>
                      Generado IA
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-hubu-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-hubu-gray-400 mr-1.5" />
                  <span>Creado: {segment.date}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-hubu-gray-400 mr-1.5" />
                  <span>Modificado: {segment.modifiedDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-hubu-gray-400 mr-1.5" />
                  <span><strong>{segment.totalClients}</strong> clientes</span>
                </div>
              </div>
              
              <p className="text-hubu-gray-600 mb-4">{segment.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-hubu-gray-600 mb-2">Filtros aplicados:</h3>
                <div className="flex flex-wrap gap-2">
                  {segment.filters.map((filter, index) => (
                    <span key={index} className="inline-flex text-xs bg-hubu-gray-100 text-hubu-gray-600 px-2 py-1 rounded-md">
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <button className="btn-secondary text-sm flex items-center">
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Editar filtros
              </button>
              <button 
                className="btn-primary text-sm flex items-center"
                onClick={() => setIsCampaignModalOpen(true)}
              >
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Crear campaña
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Pestañas para la vista detallada */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-hubu-gray-100">
            <TabsTrigger value="overview" className="text-sm">Visión general</TabsTrigger>
            <TabsTrigger value="clients" className="text-sm">Clientes ({segment.totalClients})</TabsTrigger>
            {segment.subsegments.length > 0 && (
              <TabsTrigger value="subsegments" className="text-sm">
                Subsegmentos ({segment.subsegments.length})
              </TabsTrigger>
            )}
          </TabsList>
          
          {/* Contenido de la pestaña Visión general */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SegmentMetricCard
                title="Ticket promedio"
                value={formatCurrency(segment.averageTicket)}
                icon={<CreditCard className="h-5 w-5 text-hubu-purple" />}
                comparison={{
                  value: generalStats.averageTicket,
                  formatted: formatCurrency(generalStats.averageTicket),
                  label: "Promedio general",
                  percentage: Math.round((segment.averageTicket / generalStats.averageTicket - 1) * 100)
                }}
              />
              <SegmentMetricCard
                title="Frecuencia de compra"
                value={segment.purchaseFrequency.toFixed(1)}
                suffix="compras/mes"
                icon={<ShoppingBag className="h-5 w-5 text-hubu-green" />}
                comparison={{
                  value: generalStats.purchaseFrequency,
                  formatted: generalStats.purchaseFrequency.toFixed(1),
                  label: "Promedio general",
                  percentage: Math.round((segment.purchaseFrequency / generalStats.purchaseFrequency - 1) * 100)
                }}
              />
              <SegmentMetricCard
                title="Valor total (histórico)"
                value={formatCurrency(segment.totalValue)}
                icon={<BarChart3 className="h-5 w-5 text-hubu-blue" />}
                comparison={{
                  value: generalStats.totalValue,
                  formatted: formatCurrency(generalStats.totalValue),
                  label: "Total de clientes",
                  percentage: Math.round((segment.totalValue / generalStats.totalValue) * 100),
                  isPercentageOfTotal: true
                }}
              />
              <SegmentMetricCard
                title="Valor último mes"
                value={formatCurrency(segment.lastMonthValue)}
                icon={<LineChart className="h-5 w-5 text-hubu-orange" />}
                comparison={{
                  value: generalStats.lastMonthValue,
                  formatted: formatCurrency(generalStats.lastMonthValue),
                  label: "Total de clientes",
                  percentage: Math.round((segment.lastMonthValue / generalStats.lastMonthValue) * 100),
                  isPercentageOfTotal: true
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2 bg-white rounded-lg border border-hubu-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-medium text-hubu-gray-700 mb-4">Evolución del segmento</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-hubu-gray-200 rounded-md">
                  <p className="text-hubu-gray-400">Gráfico de evolución temporal</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-hubu-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-hubu-gray-700">Categorías principales</h3>
                  <PieChart className="h-5 w-5 text-hubu-gray-400" />
                </div>
                <div className="space-y-3">
                  {segment.topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-hubu-gray-600">{category.name}</span>
                        <span className="text-hubu-gray-500">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-hubu-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-hubu-purple h-1.5 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="btn-secondary text-sm flex items-center">
                <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5" />
                Exportar a Excel
              </button>
              <button className="btn-secondary text-sm flex items-center">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Enviar a CRM
              </button>
              <button className="btn-secondary text-sm flex items-center">
                <Scale className="h-3.5 w-3.5 mr-1.5" />
                Comparar con otro segmento
              </button>
              <button className="btn-secondary text-sm flex items-center">
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                Añadir nota
              </button>
            </div>
          </TabsContent>
          
          {/* Contenido de la pestaña Clientes */}
          <TabsContent value="clients">
            <div className="bg-white rounded-lg border border-hubu-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-hubu-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-hubu-gray-700">Clientes en el segmento</h3>
                <button className="btn-secondary text-sm flex items-center">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Exportar lista
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-hubu-gray-50 border-b border-hubu-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Última compra</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Frecuencia</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Ticket promedio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Productos principales</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-hubu-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hubu-gray-200">
                    {segment.clients.map((client) => (
                      <ClientListItem 
                        key={client.id} 
                        client={client} 
                        formatCurrency={formatCurrency} 
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-hubu-gray-200 flex justify-between items-center">
                <span className="text-sm text-hubu-gray-500">Mostrando {segment.clients.length} de {segment.totalClients} clientes</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-hubu-gray-200 rounded-md text-hubu-gray-600 text-sm">Anterior</button>
                  <button className="px-3 py-1 bg-hubu-purple text-white rounded-md text-sm">1</button>
                  <button className="px-3 py-1 border border-hubu-gray-200 rounded-md text-hubu-gray-600 text-sm">2</button>
                  <button className="px-3 py-1 border border-hubu-gray-200 rounded-md text-hubu-gray-600 text-sm">Siguiente</button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Contenido de la pestaña Subsegmentos */}
          {segment.subsegments.length > 0 && (
            <TabsContent value="subsegments">
              <div className="bg-white rounded-lg border border-hubu-gray-200 shadow-sm mb-6">
                <div className="p-4 border-b border-hubu-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-hubu-gray-700">
                    Subsegmentos ({segment.subsegments.length})
                  </h3>
                  <button className="btn-primary text-sm flex items-center">
                    <GitBranch className="h-3.5 w-3.5 mr-1.5" />
                    Crear nuevo subsegmento
                  </button>
                </div>
                
                <div className="divide-y divide-hubu-gray-200">
                  {segment.subsegments.map((subsegment) => (
                    <SubsegmentListItem 
                      key={subsegment.id} 
                      subsegment={subsegment}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Campaign Modal */}
      <CampaignModal 
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        segmentName={segment.name}
        clientCount={segment.totalClients}
        segmentId={Number(id)}
      />
    </div>
  );
};

export default SegmentDetail;
