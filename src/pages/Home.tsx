import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-600 mb-6">TaskMaster</h1>
        <div className="space-y-4">
          <Link to="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary text-white py-2 px-6 rounded-lg shadow-subtle"
            >
              Iniciar Sesión
            </motion.button>
          </Link>
          <Link to="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white border-2 border-primary text-primary py-2 px-6 rounded-lg shadow-subtle"
            >
              Registrarse
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};