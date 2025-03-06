
interface SubsegmentNameInputProps {
  subsegmentName: string;
  onNameChange: (name: string) => void;
}

const SubsegmentNameInput = ({ subsegmentName, onNameChange }: SubsegmentNameInputProps) => {
  return (
    <div className="mb-6">
      <label htmlFor="subsegment-name" className="block text-sm font-medium text-hubu-gray-600 mb-2">
        Nombre del subsegmento
      </label>
      <input
        id="subsegment-name"
        type="text"
        value={subsegmentName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Nombre del nuevo subsegmento"
        className="w-full p-2 border border-hubu-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-hubu-purple/30 focus:border-hubu-purple/30"
      />
    </div>
  );
};

export default SubsegmentNameInput;
