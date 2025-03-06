
import { X } from "lucide-react";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader = ({ onClose }: ModalHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-hubu-gray-200 p-4 flex justify-between items-center">
      <h2 className="text-lg font-medium text-hubu-gray-700">Dividir en subsegmentos</h2>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-hubu-gray-100">
        <X className="h-5 w-5 text-hubu-gray-400" />
      </button>
    </div>
  );
};

export default ModalHeader;
