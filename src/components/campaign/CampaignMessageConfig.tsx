
import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { CampaignType, campaignTypes } from "./campaignTypes";

interface MessageConfig {
  channel: string;
  subject: string;
  content: string;
  template: string;
  discount: string;
  promoCode: string;
}

interface CampaignMessageConfigProps {
  messageConfig: MessageConfig;
  onChangeMessageConfig: (config: MessageConfig) => void;
  campaignType: CampaignType;
}

const CampaignMessageConfig = ({ 
  messageConfig, 
  onChangeMessageConfig,
  campaignType
}: CampaignMessageConfigProps) => {
  const channels = [
    { id: "email", name: "Email", icon: <Mail className="h-4 w-4" /> },
    { id: "sms", name: "SMS", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "whatsapp", name: "WhatsApp", icon: <Phone className="h-4 w-4" /> }
  ];

  const templates = [
    { id: "default", name: "Plantilla por defecto" },
    { id: "promotional", name: "Promocional" },
    { id: "informative", name: "Informativo" },
    { id: "seasonal", name: "Campaña de temporada" }
  ];

  const selectedCampaignType = campaignTypes.find(type => type.id === campaignType);

  const handleChange = (key: keyof MessageConfig, value: string) => {
    onChangeMessageConfig({
      ...messageConfig,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-hubu-gray-700 mb-3">
          Tipo de campaña: <span className={selectedCampaignType?.primaryColor}>{selectedCampaignType?.title}</span>
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-hubu-gray-700 mb-2">
          Canal de comunicación
        </label>
        <div className="flex space-x-2 mb-4">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => handleChange("channel", channel.id)}
              className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm ${
                messageConfig.channel === channel.id
                  ? "bg-hubu-purple text-white"
                  : "bg-hubu-gray-100 text-hubu-gray-600 hover:bg-hubu-gray-200"
              }`}
            >
              <span className="mr-2">{channel.icon}</span>
              {channel.name}
            </button>
          ))}
        </div>
      </div>

      {messageConfig.channel === "email" && (
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-hubu-gray-700 mb-1">
            Asunto
          </label>
          <input
            id="subject"
            type="text"
            value={messageConfig.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm mb-4"
            placeholder="Ej: Oferta especial solo para ti"
          />
        </div>
      )}

      <div>
        <label htmlFor="template" className="block text-sm font-medium text-hubu-gray-700 mb-1">
          Plantilla
        </label>
        <select
          id="template"
          value={messageConfig.template}
          onChange={(e) => handleChange("template", e.target.value)}
          className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm mb-4"
        >
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-hubu-gray-700 mb-1">
          Contenido del mensaje
        </label>
        <textarea
          id="content"
          value={messageConfig.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm h-24 mb-4"
          placeholder="Escribe el contenido de tu mensaje aquí..."
        />
      </div>

      {(campaignType === "recompra" || campaignType === "crossSelling") && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-hubu-gray-700 mb-1">
              Descuento (%)
            </label>
            <input
              id="discount"
              type="text"
              value={messageConfig.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
              className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm"
              placeholder="Ej: 15%"
            />
          </div>
          <div>
            <label htmlFor="promoCode" className="block text-sm font-medium text-hubu-gray-700 mb-1">
              Código promocional
            </label>
            <input
              id="promoCode"
              type="text"
              value={messageConfig.promoCode}
              onChange={(e) => handleChange("promoCode", e.target.value)}
              className="w-full px-3 py-2 border border-hubu-gray-300 rounded-md shadow-sm"
              placeholder="Ej: PROMO25"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignMessageConfig;
