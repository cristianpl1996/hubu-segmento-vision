
interface SegmentInfoProps {
  segmentName: string;
}

const SegmentInfo = ({ segmentName }: SegmentInfoProps) => {
  return (
    <div className="mb-6">
      <div className="text-sm text-hubu-gray-500 mb-2">Segmento principal</div>
      <div className="p-3 bg-hubu-gray-50 rounded-md text-hubu-gray-700 font-medium">
        {segmentName}
      </div>
    </div>
  );
};

export default SegmentInfo;
