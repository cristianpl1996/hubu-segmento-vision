
import SubsegmentModalComponent from "./subsegment-modal/SubsegmentModal";

interface SubsegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
}

const SubsegmentModal = ({ isOpen, onClose, segmentName }: SubsegmentModalProps) => {
  // This is a wrapper component to maintain compatibility with existing code
  // while we transition to the new component structure
  return (
    <SubsegmentModalComponent
      isOpen={isOpen}
      onClose={onClose}
      setPreviewCount={() => {}}
    />
  );
};

export default SubsegmentModal;
