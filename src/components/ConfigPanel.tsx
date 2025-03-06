
import { Filter, Plus, EyeIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ConfigPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white rounded-lg border border-hubu-gray-200 p-5 h-fit sticky top-24"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-hubu-gray-700">Configuración de segmentos</h2>
        <Filter className="h-5 w-5 text-hubu-gray-400" />
      </div>
      
      <p className="text-sm text-hubu-gray-500 mb-6">
        Configura los filtros y combinaciones para crear el segmento deseado y llevar a cabo
        estrategias y acciones de comunicación
      </p>
      
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn bg-white border border-hubu-gray-200 hover:bg-hubu-gray-50 text-hubu-gray-700 py-3 px-4 rounded-md flex items-center justify-between group transition-all"
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-hubu-green/10 flex items-center justify-center mr-3 group-hover:bg-hubu-green/20 transition-colors">
              <Plus className="h-4 w-4 text-hubu-green" />
            </div>
            <span>Crear configuración</span>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn bg-white border border-hubu-gray-200 hover:bg-hubu-gray-50 text-hubu-gray-700 py-3 px-4 rounded-md flex items-center justify-between group transition-all"
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-hubu-purple/10 flex items-center justify-center mr-3 group-hover:bg-hubu-purple/20 transition-colors">
              <EyeIcon className="h-4 w-4 text-hubu-purple" />
            </div>
            <span>Ver configuración (2)</span>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn bg-white border border-hubu-gray-200 hover:bg-hubu-gray-50 text-hubu-gray-700 py-3 px-4 rounded-md flex items-center justify-between group transition-all"
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-hubu-gray-100 flex items-center justify-center mr-3 group-hover:bg-hubu-gray-200 transition-colors">
              <Zap className="h-4 w-4 text-hubu-gray-500" />
            </div>
            <span>Campañas automáticas</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConfigPanel;
