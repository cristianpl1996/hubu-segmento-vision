import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Copy, Trash2, Plus, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubsegmentModal from "@/components/subsegment-modal/SubsegmentModal";
import PreviewSection from "@/components/subsegment-modal/PreviewSection";
import SegmentLayout from "../components/SegmentLayout";
import { useToast } from "@/hooks/use-toast";
import { useSubsegment } from "@/hooks/useSubsegment";
import { idealCustomers } from "@/data/segmentData";
import Layout from "../components/Layout";

const SegmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const segmentId = id ? parseInt(id, 10) : null;
  const [isSubsegmentModalOpen, setIsSubsegmentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewCount, setPreviewCount] = useState(0);
  const { toast } = useToast();
  const { subsegments, addSubsegment, updateSubsegment, deleteSubsegment } = useSubsegment();
  const [segment, setSegment] = useState(idealCustomers.find(segment => segment.id === segmentId));

  useEffect(() => {
    if (segmentId) {
      const foundSegment = idealCustomers.find(segment => segment.id === segmentId);
      setSegment(foundSegment || undefined);
    }
  }, [segmentId]);

  const handleOpenSubsegmentModal = () => {
    setIsSubsegmentModalOpen(true);
  };

  const handleCloseSubsegmentModal = () => {
    setIsSubsegmentModalOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubsegments = subsegments.filter((subsegment) =>
    subsegment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSubsegment = (id: number) => {
    deleteSubsegment(id);
    toast({
      title: "Subsegmento eliminado",
      description: "El subsegmento ha sido eliminado exitosamente.",
    });
  };

  if (!segment) {
    return (
      <SegmentLayout>
        <div>Segmento no encontrado</div>
      </SegmentLayout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-hubu-gray-600 hover:text-hubu-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Segmentos
            </Link>
            <h1 className="text-2xl font-semibold text-hubu-gray-700 mt-4">{segment.name}</h1>
            <p className="text-hubu-gray-500 mt-1">{segment.description}</p>
          </div>

          <PreviewSection previewCount={previewCount} />

          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-hubu-gray-700">Subsegmentos</h2>
              <Button onClick={handleOpenSubsegmentModal} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Subsegmento
              </Button>
            </div>

            <Input
              type="text"
              placeholder="Buscar subsegmentos..."
              className="mb-4"
              onChange={handleSearch}
            />

            {filteredSubsegments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-hubu-gray-50">
                      <th className="p-3 text-left">Nombre</th>
                      <th className="p-3 text-left">Descripción</th>
                      <th className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubsegments.map((subsegment) => (
                      <tr key={subsegment.id} className="border-b border-hubu-gray-200">
                        <td className="p-3">{subsegment.name}</td>
                        <td className="p-3">{subsegment.description}</td>
                        <td className="p-3 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" /> Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteSubsegment(subsegment.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-hubu-gray-500">No hay subsegmentos creados.</div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-md shadow-sm p-4">
            <h2 className="text-lg font-medium text-hubu-gray-700 mb-4">Detalles del Segmento</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-hubu-gray-600">Clientes:</span>
                <p className="text-hubu-gray-500">300</p>
              </div>
              <div>
                <span className="text-sm font-medium text-hubu-gray-600">Fecha de creación:</span>
                <p className="text-hubu-gray-500">15 de Marzo, 2024</p>
              </div>
              <div>
                <span className="text-sm font-medium text-hubu-gray-600">Etiquetas:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-hubu-blue text-white">Premium</Badge>
                  <Badge className="bg-hubu-green text-white">Activos</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubsegmentModal
        isOpen={isSubsegmentModalOpen}
        onClose={handleCloseSubsegmentModal}
        setPreviewCount={setPreviewCount}
      />
    </Layout>
  );
};

export default SegmentDetail;
