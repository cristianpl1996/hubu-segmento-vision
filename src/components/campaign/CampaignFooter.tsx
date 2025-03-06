
import { Save, X, Rocket, ArrowLeft, ArrowRight } from "lucide-react";

interface CampaignFooterProps {
  step: number;
  onBack: () => void;
  onContinue: () => void;
  onLaunchCampaign: () => void;
  onSaveDraft: () => void;
  onCancel: () => void;
}

const CampaignFooter = ({ 
  step, 
  onBack, 
  onContinue,
  onLaunchCampaign,
  onSaveDraft,
  onCancel
}: CampaignFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-hubu-gray-200 p-4 flex justify-between items-center">
      {step < 3 ? (
        <>
          <button 
            onClick={step === 1 ? onCancel : onBack}
            className="btn-secondary text-sm flex items-center"
          >
            {step === 1 ? (
              <>
                <X className="h-3.5 w-3.5 mr-1.5" /> 
                Cancelar
              </>
            ) : (
              <>
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> 
                Atrás
              </>
            )}
          </button>
          <button
            onClick={onContinue}
            className="btn-primary text-sm flex items-center"
          >
            Continuar
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </button>
        </>
      ) : (
        <>
          <div className="flex space-x-2">
            <button 
              onClick={onCancel}
              className="btn-secondary text-sm flex items-center"
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Cancelar
            </button>
            <button 
              onClick={onSaveDraft}
              className="btn-secondary text-sm flex items-center"
            >
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Guardar borrador
            </button>
          </div>
          <button
            onClick={onLaunchCampaign}
            className="btn-primary text-sm flex items-center"
          >
            <Rocket className="h-3.5 w-3.5 mr-1.5" />
            Lanzar campaña
          </button>
        </>
      )}
    </div>
  );
};

export default CampaignFooter;
