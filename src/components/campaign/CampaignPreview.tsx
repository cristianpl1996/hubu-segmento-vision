import { useState, useEffect } from "react";
import { Eye, Users, MailOpen, Calendar, BarChart2, TestTube, Check, Phone, MessageSquare, Mail } from "lucide-react";
import { CampaignType, campaignTypes, getIconComponent } from "./campaignTypes";

interface CampaignPreviewProps {
  segmentName: string;
  clientCount: number;
  campaignType: CampaignType;
  campaignName: string;
  messageConfig: {
    channel: string;
    subject: string;
    content: string;
    template: string;
    discount: string;
    promoCode: string;
  };
  isABTesting: boolean;
  onToggleABTesting: (value: boolean) => void;
}

const CampaignPreview = ({
  segmentName,
  clientCount,
  campaignType,
  campaignName,
  messageConfig,
  isABTesting,
  onToggleABTesting
}: CampaignPreviewProps) => {
  const [IconComponent, setIconComponent] = useState<any>(null);
  const campaignTypeInfo = campaignTypes.find(type => type.id === campaignType);

  useEffect(() => {
    const loadIcon = async () => {
      if (campaignTypeInfo) {
        const Component = await getIconComponent(campaignTypeInfo.icon);
        setIconComponent(Component);
      }
    };
    
    loadIcon();
  }, [campaignTypeInfo]);

  const getChannelIcon = () => {
    switch (messageConfig.channel) {
      case "email":
        return <MailOpen className="h-4 w-4 text-hubu-gray-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-hubu-gray-500" />;
      case "whatsapp":
        return <Phone className="h-4 w-4 text-hubu-gray-500" />;
      default:
        return <Mail className="h-4 w-4 text-hubu-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-hubu-gray-50 rounded-lg p-4">
        <div className="flex items-start mb-4">
          <div className={`h-10 w-10 rounded-md ${campaignTypeInfo?.lightColor} flex items-center justify-center mr-3`}>
            {IconComponent && <IconComponent className={`h-5 w-5 ${campaignTypeInfo?.primaryColor}`} />}
          </div>
          <div>
            <h3 className="font-medium text-hubu-gray-700">{campaignName || "Sin nombre"}</h3>
            <p className="text-sm text-hubu-gray-500">
              Tipo: <span className={campaignTypeInfo?.primaryColor}>{campaignTypeInfo?.title}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 text-hubu-gray-500 mr-2" />
            <span className="text-hubu-gray-600">Segmento: {segmentName}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 text-hubu-gray-500 mr-2" />
            <span className="text-hubu-gray-600">Clientes impactados: {clientCount}</span>
          </div>
          <div className="flex items-center text-sm">
            {getChannelIcon()}
            <span className="ml-2 text-hubu-gray-600">Canal: {messageConfig.channel.charAt(0).toUpperCase() + messageConfig.channel.slice(1)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-hubu-gray-500 mr-2" />
            <span className="text-hubu-gray-600">Fecha de envío: Inmediato</span>
          </div>
          {(messageConfig.discount || messageConfig.promoCode) && (
            <div className="flex items-center text-sm">
              <BarChart2 className="h-4 w-4 text-hubu-gray-500 mr-2" />
              <span className="text-hubu-gray-600">
                {messageConfig.discount && `Descuento: ${messageConfig.discount}%`}
                {messageConfig.discount && messageConfig.promoCode && " | "}
                {messageConfig.promoCode && `Código: ${messageConfig.promoCode}`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-hubu-gray-700 mb-2">Vista previa del mensaje</h4>
        <div className="border border-hubu-gray-200 rounded-md p-4 bg-white">
          {messageConfig.subject && (
            <div className="mb-2 font-medium">{messageConfig.subject}</div>
          )}
          <div className="text-sm text-hubu-gray-600 whitespace-pre-line">
            {messageConfig.content || "Sin contenido definido"}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onToggleABTesting(!isABTesting)}
          className={`flex items-center ${
            isABTesting ? "text-hubu-purple" : "text-hubu-gray-500"
          }`}
        >
          <div className={`h-5 w-5 rounded-md border mr-2 flex items-center justify-center ${
            isABTesting ? "bg-hubu-purple border-hubu-purple" : "border-hubu-gray-300"
          }`}>
            {isABTesting && <Check className="h-3 w-3 text-white" />}
          </div>
          <div className="flex items-center">
            <TestTube className="h-4 w-4 mr-1.5" />
            <span className="text-sm">Habilitar prueba A/B</span>
          </div>
        </button>
      </div>

      {isABTesting && (
        <div className="bg-hubu-purple/5 border border-hubu-purple/20 rounded-md p-4">
          <h4 className="text-sm font-medium text-hubu-purple mb-2 flex items-center">
            <TestTube className="h-4 w-4 mr-1.5" />
            Configuración de prueba A/B
          </h4>
          <p className="text-xs text-hubu-gray-600 mb-3">
            La prueba A/B dividirá a tu audiencia en dos grupos para probar diferentes versiones del mensaje y determinar cuál tiene mejor rendimiento.
          </p>
          <div className="text-sm text-center text-hubu-gray-500">
            La configuración avanzada estará disponible próximamente
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPreview;
