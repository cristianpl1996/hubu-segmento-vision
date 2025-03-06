
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, TestTube, Mail, MessageSquare, Phone, FileText, ChevronDown, ChevronUp, Search, SlidersHorizontal, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyModal from "@/components/campaign/CopyModal";

interface SegmentWithSelection {
  id: number;
  name: string;
  description: string;
  clientCount: number;
  selected: boolean;
  category?: string;
  generatedCopy?: string;
}

const MassCampaigns = () => {
  const [step, setStep] = useState(1);
  const [communicationChannel, setCommunicationChannel] = useState("email");
  const [schedulingOption, setSchedulingOption] = useState("immediate");
  const [enableABTesting, setEnableABTesting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [segments, setSegments] = useState<SegmentWithSelection[]>([
    { id: 1, name: "Clientes Frecuentes", description: "Compran al menos 1 vez al mes", clientCount: 213, selected: false, category: "Clientes Frecuentes", generatedCopy: "¡Hola! Gracias por ser uno de nuestros clientes más leales. Tenemos una oferta especial solo para ti." },
    { id: 2, name: "Clientes Inactivos", description: "Sin compras en los últimos 90 días", clientCount: 587, selected: false, category: "Clientes en Riesgo", generatedCopy: "¡Te extrañamos! Han pasado más de 90 días desde tu última compra. ¿Qué tal un 20% de descuento en tu próxima orden?" },
    { id: 3, name: "Compradores Premium", description: "Ticket promedio superior a $5,000", clientCount: 142, selected: false, category: "Clientes de Alto Valor", generatedCopy: "Estimado cliente premium, hemos preparado una selección exclusiva de nuestros productos más lujosos especialmente para ti." },
    { id: 4, name: "Nuevos Registros", description: "Creados en los últimos 30 días", clientCount: 321, selected: false, category: "Clientes Nuevos", generatedCopy: "¡Bienvenido a nuestra familia! Como nuevo cliente, disfruta de un 15% de descuento en tu primera compra." },
    { id: 5, name: "Compradores Categoría X", description: "Han comprado productos de esta categoría", clientCount: 276, selected: false, category: "Segmentos por Producto", generatedCopy: "Sabemos que te encantan nuestros productos de la Categoría X. ¡Acabamos de recibir nuevos modelos que creemos que te encantarán!" },
    { id: 6, name: "Cerca de Cumpleaños", description: "Cumpleaños en los próximos 30 días", clientCount: 123, selected: false, category: "Ocasiones Especiales", generatedCopy: "¡Tu cumpleaños se acerca! Queremos celebrarlo contigo con un regalo especial en tu próxima compra." },
    { id: 7, name: "Alto potencial de conversión", description: "Han visitado el sitio más de 5 veces", clientCount: 189, selected: false, category: "Prospectos Calientes", generatedCopy: "Hemos notado tu interés en nuestros productos. ¿Qué tal si te decides hoy con un 10% de descuento?" },
    { id: 8, name: "Abandono de carrito", description: "Dejaron productos en el carrito", clientCount: 432, selected: false, category: "Clientes en Riesgo", generatedCopy: "¡Tu carrito te extraña! Los productos que seleccionaste siguen disponibles. ¿Completamos tu compra?" },
    { id: 9, name: "Compradores de temporada", description: "Compran solo en ciertas épocas", clientCount: 267, selected: false, category: "Compradores Estacionales", generatedCopy: "¡La temporada que esperas ha llegado! Descubre nuestras nuevas colecciones con un descuento especial." },
    { id: 10, name: "Referidos", description: "Llegaron por recomendación", clientCount: 98, selected: false, category: "Adquisición", generatedCopy: "Gracias por confiar en la recomendación de uno de nuestros clientes. Te ofrecemos un 15% en tu primera compra." },
    { id: 11, name: "Clientes recurrentes", description: "Más de 5 compras en el último año", clientCount: 154, selected: false, category: "Clientes Frecuentes", generatedCopy: "Tu lealtad merece ser recompensada. Como cliente recurrente, accede a nuestro programa VIP con beneficios exclusivos." },
    { id: 12, name: "Compradores de oferta", description: "Compran principalmente con descuento", clientCount: 321, selected: false, category: "Sensibles al Precio", generatedCopy: "¡OFERTA EXCLUSIVA! Solo por 48 horas, descuentos de hasta 40% en productos seleccionados." },
  ]);
  
  const { toast } = useToast();

  const handleToggleSegment = (id: number) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, selected: !segment.selected } : segment
    ));
  };

  const handleSelectAll = () => {
    const allSelected = segments.every(segment => segment.selected);
    setSegments(segments.map(segment => ({ ...segment, selected: !allSelected })));
  };

  const filteredSegments = useMemo(() => {
    return segments.filter(segment => 
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [segments, searchTerm]);

  const selectedSegments = useMemo(() => {
    return segments.filter(segment => segment.selected);
  }, [segments]);

  const totalSelectedClients = useMemo(() => {
    return selectedSegments.reduce((total, segment) => total + segment.clientCount, 0);
  }, [selectedSegments]);
  
  const selectedSegmentsCount = selectedSegments.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, filteredSegments.length));
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const segmentCategories = useMemo(() => {
    const categories: Record<string, SegmentWithSelection[]> = {};
    selectedSegments.forEach(segment => {
      if (segment.category) {
        if (!categories[segment.category]) {
          categories[segment.category] = [];
        }
        categories[segment.category].push(segment);
      }
    });
    return categories;
  }, [selectedSegments]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateCopy = (id: number, newCopy: string) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, generatedCopy: newCopy } : segment
    ));
    
    toast({
      title: "Copy actualizado",
      description: `El copy para el segmento "${segments.find(s => s.id === id)?.name}" ha sido actualizado.`,
    });
  };

  const handleOpenCopyModal = () => {
    if (selectedSegmentsCount === 0) {
      toast({
        title: "No hay segmentos seleccionados",
        description: "Por favor, selecciona al menos un segmento para continuar.",
        variant: "destructive"
      });
      return;
    }
    setIsCopyModalOpen(true);
  };

  const handleCloseCopyModal = () => {
    setIsCopyModalOpen(false);
  };

  const handleLaunchCampaign = () => {
    toast({
      title: "Campaña masiva lanzada",
      description: `Campaña lanzada a ${selectedSegmentsCount} segmentos (${totalSelectedClients} clientes).`,
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Borrador guardado",
      description: "La campaña ha sido guardada como borrador.",
    });
  };

  const breadcrumbs = [
    { label: "Inicio", href: "#" },
    { label: "Campañas Masivas", href: "#", active: true }
  ];

  return (
    <Layout>
      <PageHeader 
        title="Campañas Masivas" 
        count={selectedSegmentsCount > 0 ? selectedSegmentsCount : segments.length} 
        breadcrumbs={breadcrumbs}
        onSearch={() => {}} // Would implement search functionality
      />

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium text-lg text-hubu-gray-700">Selecciona segmentos para la campaña</div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hubu-gray-400" />
                <Input 
                  placeholder="Buscar segmentos..." 
                  className="pl-9 w-60"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-hubu-gray-50">
                  <th className="p-3 text-left">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-hubu-gray-300 text-hubu-purple"
                        checked={segments.length > 0 && segments.every(segment => segment.selected)}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-hubu-gray-600">Nombre del Segmento</th>
                  <th className="p-3 text-left text-sm font-medium text-hubu-gray-600">Descripción</th>
                  <th className="p-3 text-right text-sm font-medium text-hubu-gray-600">Clientes</th>
                </tr>
              </thead>
              <tbody>
                {filteredSegments.slice(0, visibleCount).map((segment) => (
                  <tr key={segment.id} className="border-b border-hubu-gray-100 hover:bg-hubu-gray-50">
                    <td className="p-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-hubu-gray-300 text-hubu-purple"
                          checked={segment.selected}
                          onChange={() => handleToggleSegment(segment.id)}
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-hubu-gray-700">{segment.name}</span>
                    </td>
                    <td className="p-3 text-hubu-gray-500">{segment.description}</td>
                    <td className="p-3 text-right font-medium text-hubu-gray-700">{segment.clientCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSegments.length > 5 && (
            <div className="mt-4 text-center">
              {visibleCount < filteredSegments.length ? (
                <Button 
                  variant="outline" 
                  onClick={handleShowMore}
                  className="text-hubu-gray-600"
                >
                  Ver más segmentos <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleShowLess}
                  className="text-hubu-gray-600"
                >
                  Ver menos <ChevronUp className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {selectedSegmentsCount > 0 && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium text-lg text-hubu-gray-700">
                  Configuración de la campaña masiva
                </div>
                <Button 
                  onClick={handleOpenCopyModal}
                  variant="outline"
                  className="flex items-center text-hubu-purple border-hubu-purple/30 hover:bg-hubu-purple/5"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ver todos los copys
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-hubu-gray-700 mb-2">
                    Canal de comunicación
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCommunicationChannel("email")}
                      className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm ${
                        communicationChannel === "email"
                          ? "bg-hubu-purple text-white"
                          : "bg-hubu-gray-100 text-hubu-gray-600 hover:bg-hubu-gray-200"
                      }`}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => setCommunicationChannel("sms")}
                      className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm ${
                        communicationChannel === "sms"
                          ? "bg-hubu-purple text-white"
                          : "bg-hubu-gray-100 text-hubu-gray-600 hover:bg-hubu-gray-200"
                      }`}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      SMS
                    </button>
                    <button
                      onClick={() => setCommunicationChannel("whatsapp")}
                      className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm ${
                        communicationChannel === "whatsapp"
                          ? "bg-hubu-purple text-white"
                          : "bg-hubu-gray-100 text-hubu-gray-600 hover:bg-hubu-gray-200"
                      }`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-hubu-gray-700 mb-2">
                    Opciones de envío
                  </label>
                  <Tabs defaultValue="immediate" value={schedulingOption} onValueChange={setSchedulingOption}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="immediate" className="flex items-center">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                        Inmediato
                      </TabsTrigger>
                      <TabsTrigger value="scheduled" className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        Programado
                      </TabsTrigger>
                      <TabsTrigger value="recurring" className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        Recurrente
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <button
                onClick={() => setEnableABTesting(!enableABTesting)}
                className={`flex items-center ${
                  enableABTesting ? "text-hubu-purple" : "text-hubu-gray-500"
                }`}
              >
                <div className={`h-5 w-5 rounded-md border mr-2 flex items-center justify-center ${
                  enableABTesting ? "bg-hubu-purple border-hubu-purple" : "border-hubu-gray-300"
                }`}>
                  {enableABTesting && <CheckCircle className="h-3 w-3 text-white" />}
                </div>
                <div className="flex items-center">
                  <TestTube className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">Habilitar prueba A/B (IA vs. Manual)</span>
                </div>
              </button>
            </div>

            {selectedSegmentsCount > 10 && (
              <div className="mb-6">
                <div className="font-medium text-hubu-gray-700 mb-2">Segmentos por categoría</div>
                <div className="space-y-2">
                  {Object.entries(segmentCategories).map(([category, categorySegments]) => (
                    <div key={category} className="border border-hubu-gray-200 rounded-md overflow-hidden">
                      <button
                        className="flex justify-between items-center w-full p-3 bg-hubu-gray-50 text-left"
                        onClick={() => {
                          // Expandir/colapsar lógica aquí
                        }}
                      >
                        <span className="font-medium text-hubu-gray-700">{category}</span>
                        <div className="flex items-center">
                          <span className="text-sm text-hubu-gray-500 mr-2">
                            {categorySegments.length} segmentos
                          </span>
                          <ChevronDown className="h-4 w-4 text-hubu-gray-400" />
                        </div>
                      </button>
                      <div className="p-3">
                        <ul className="space-y-1">
                          {categorySegments.map(segment => (
                            <li key={segment.id} className="text-sm text-hubu-gray-600 flex justify-between">
                              <span>{segment.name}</span>
                              <span className="text-hubu-gray-500">{segment.clientCount} clientes</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-hubu-gray-50 rounded-lg p-4 mb-6">
              <div className="font-medium text-hubu-gray-700 mb-2">Resumen de la campaña</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-hubu-gray-600">Segmentos seleccionados:</span>
                  <span className="font-medium text-hubu-gray-700">{selectedSegmentsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hubu-gray-600">Clientes impactados:</span>
                  <span className="font-medium text-hubu-gray-700">{totalSelectedClients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hubu-gray-600">Canal:</span>
                  <span className="font-medium text-hubu-gray-700">
                    {communicationChannel === "email" ? "Email" : 
                     communicationChannel === "sms" ? "SMS" : "WhatsApp"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hubu-gray-600">Envío:</span>
                  <span className="font-medium text-hubu-gray-700">
                    {schedulingOption === "immediate" ? "Inmediato" : 
                     schedulingOption === "scheduled" ? "Programado" : "Recurrente"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hubu-gray-600">Prueba A/B:</span>
                  <span className="font-medium text-hubu-gray-700">
                    {enableABTesting ? "Activada" : "Desactivada"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="space-x-3">
                <button className="px-4 py-2 border border-hubu-gray-300 rounded-md text-hubu-gray-700 hover:bg-hubu-gray-50">
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveDraft}
                  className="px-4 py-2 border border-hubu-purple/70 text-hubu-purple rounded-md hover:bg-hubu-purple/5"
                >
                  Guardar como borrador
                </button>
              </div>
              <button 
                onClick={handleLaunchCampaign}
                className="btn-primary"
              >
                Lanzar campaña masiva
              </button>
            </div>
          </>
        )}
      </div>

      <CopyModal
        isOpen={isCopyModalOpen}
        onClose={handleCloseCopyModal}
        segments={selectedSegments}
        onUpdateCopy={handleUpdateCopy}
      />
    </Layout>
  );
};

export default MassCampaigns;
