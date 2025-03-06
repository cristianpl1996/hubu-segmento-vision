
interface ModalFooterProps {
  onCancel: () => void;
  onCreateSubsegment: () => void;
  isCreateDisabled: boolean;
}

const ModalFooter = ({ onCancel, onCreateSubsegment, isCreateDisabled }: ModalFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-hubu-gray-200 p-4 flex justify-between items-center">
      <button 
        onClick={onCancel}
        className="btn-secondary"
      >
        Cancelar
      </button>
      <button
        onClick={onCreateSubsegment}
        disabled={isCreateDisabled}
        className="btn-primary disabled:opacity-50 disabled:bg-hubu-gray-300"
      >
        Crear subsegmento
      </button>
    </div>
  );
};

export default ModalFooter;
