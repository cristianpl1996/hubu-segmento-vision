
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, TestTube, Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import Layout from "@/components/Layout";

interface SegmentWithSelection {
  id: number;
  name: string;
  description: string;
  clientCount: number;
  selected: boolean;
}

const MassCampaigns = () => {
  const [step, setStep] = useState(1);
  const [communicationChannel, setCommunicationChannel] = useState("email");
  const [schedulingOption, setSchedulingOption] = useState("immediate");
  const [enableABTesting, setEnableABTesting] = useState(false);
  const [segments, setSegments] = useState<SegmentWithSelection[]>([
    { id: 1, name: "Clientes Frecuentes", description: "Compran al menos 1 vez al mes", clientCount: 213, selected: false },
    { id: 2, name: "Clientes Inactivos", description: "Sin compras en los últimos 90 días", clientCount: 587, selected: false },
    { id: 3, name: "Compradores Premium", description: "Ticket promedio superior a $5,000", clientCount: 142, selected: false },
    { id: 4, name: "Nuevos Registros", description: "Creados en los últimos 30 días", clientCount: 321, selected: false },
    { id: 5, name: "Compradores Categoría X", description: "Han comprado productos de esta categoría", clientCount: 276, selected: false },
    { id: 6, name: "Cerca de Cumpleaños", description: "Cumpleaños en los próximos 30 días", clientCount: 123, selected: false },
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

  const totalSelectedClients = segments
    .filter(segment => segment.selected)
    .reduce((total, segment) => total + segment.clientCount, 0);
  
  const selectedSegmentsCount = segments.filter(segment => segment.selected).length;

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
          <div className="font-medium text-lg text-hubu-gray-700 mb-4">Selecciona segmentos para la campaña</div>
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
                {segments.map((segment) => (
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
        </div>

        {selectedSegmentsCount > 0 && (
          <>
            <div className="mb-6">
              <div className="font-medium text-lg text-hubu-gray-700 mb-4">
                Configuración de la campaña masiva
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
    </Layout>
  );
};

export default MassCampaigns;
