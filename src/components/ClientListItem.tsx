
import { Eye, Mail, Calendar, CreditCard } from "lucide-react";

interface ClientProps {
  client: {
    id: string;
    name: string;
    lastPurchase: {
      date: string;
      amount: number;
    };
    frequency: string;
    averageTicket: number;
    topProducts: string[];
  };
  formatCurrency: (value: number) => string;
}

const ClientListItem = ({ client, formatCurrency }: ClientProps) => {
  // Función para determinar el color de la etiqueta de frecuencia
  const getFrequencyColor = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case 'alta':
        return 'bg-green-100 text-green-700';
      case 'media':
        return 'bg-blue-100 text-blue-700';
      case 'baja':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-hubu-gray-100 text-hubu-gray-600';
    }
  };

  return (
    <tr className="hover:bg-hubu-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-hubu-purple/10 flex items-center justify-center text-hubu-purple text-sm font-medium">
            {client.name.substring(0, 2)}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-hubu-gray-700">{client.name}</div>
            <div className="text-xs text-hubu-gray-500">{client.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-hubu-gray-600">{formatCurrency(client.lastPurchase.amount)}</div>
        <div className="flex items-center text-xs text-hubu-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {client.lastPurchase.date}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full ${getFrequencyColor(client.frequency)}`}>
          {client.frequency}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <CreditCard className="h-3.5 w-3.5 text-hubu-gray-400 mr-1.5" />
          <span className="text-sm text-hubu-gray-600">{formatCurrency(client.averageTicket)}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-1">
          {client.topProducts.map((product, index) => (
            <span key={index} className="inline-flex text-xs bg-hubu-gray-100 text-hubu-gray-600 px-1.5 py-0.5 rounded">
              {product}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex justify-end space-x-2">
          <button className="p-1.5 text-hubu-gray-500 hover:text-hubu-purple rounded-md hover:bg-hubu-purple/10 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-hubu-gray-500 hover:text-hubu-green rounded-md hover:bg-hubu-green/10 transition-colors">
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClientListItem;
