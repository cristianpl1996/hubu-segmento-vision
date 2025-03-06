
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CampaignHeader from "./CampaignHeader";
import CampaignTypeSelection from "./CampaignTypeSelection";
import CampaignMessageConfig from "./CampaignMessageConfig";
import CampaignPreview from "./CampaignPreview";
import CampaignFooter from "./CampaignFooter";
import { CampaignType } from "./campaignTypes";
import { useToast } from "@/hooks/use-toast";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
  clientCount: number;
  segmentId: number;
}

const CampaignModal = ({ 
  isOpen, 
  onClose, 
  segmentName, 
  clientCount,
  segmentId
}: CampaignModalProps) => {
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [messageConfig, setMessageConfig] = useState({
    channel: "email",
    subject: "",
    content: "",
    template: "default",
    discount: "",
    promoCode: ""
  });
  const [isABTesting, setIsABTesting] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleContinue = () => {
    if (step === 1 && !campaignType) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un tipo de campaña",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !messageConfig.content) {
      toast({
        title: "Error",
        description: "Por favor, define el contenido del mensaje",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleLaunchCampaign = () => {
    // In a real implementation, this would launch the campaign
    toast({
      title: "Campaña lanzada",
      description: `La campaña "${campaignName}" ha sido lanzada exitosamente.`,
    });
    onClose();
  };

  const handleSaveDraft = () => {
    // In a real implementation, this would save the campaign as a draft
    toast({
      title: "Borrador guardado",
      description: "La campaña ha sido guardada como borrador.",
    });
    onClose();
  };

  const handleEditFilters = () => {
    // This would redirect to the segment edit page
    window.location.href = `/segment/${segmentId}/edit`;
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { x: "100%", opacity: 0.5 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onClose}
      >
        <motion.div
          className="bg-white h-full w-full max-w-md overflow-y-auto"
          variants={modalVariants}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-white border-b border-hubu-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-hubu-gray-700">
              {step === 1 ? "Crear campaña" : 
               step === 2 ? "Configurar mensaje" : 
               "Previsualización de campaña"}
            </h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-hubu-gray-100">
              <X className="h-5 w-5 text-hubu-gray-400" />
            </button>
          </div>

          <div className="p-4">
            <CampaignHeader 
              segmentName={segmentName} 
              clientCount={clientCount}
              onEditFilters={handleEditFilters}
            />

            {step === 1 && (
              <CampaignTypeSelection
                campaignType={campaignType}
                onSelectCampaignType={setCampaignType}
                campaignName={campaignName}
                onChangeCampaignName={setCampaignName}
              />
            )}

            {step === 2 && (
              <CampaignMessageConfig
                messageConfig={messageConfig}
                onChangeMessageConfig={setMessageConfig}
                campaignType={campaignType!}
              />
            )}

            {step === 3 && (
              <CampaignPreview
                segmentName={segmentName}
                clientCount={clientCount}
                campaignType={campaignType!}
                campaignName={campaignName}
                messageConfig={messageConfig}
                isABTesting={isABTesting}
                onToggleABTesting={setIsABTesting}
              />
            )}
          </div>

          <CampaignFooter
            step={step}
            onBack={handleBack}
            onContinue={handleContinue}
            onLaunchCampaign={handleLaunchCampaign}
            onSaveDraft={handleSaveDraft}
            onCancel={onClose}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CampaignModal;
