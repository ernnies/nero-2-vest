import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-nero-dark mb-4"
      >
        Welcome to Nero-2-vest
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-nero-gray text-lg mb-8 text-center max-w-2xl"
      >
        Build your startup on NERO Chain with privacy and efficiency. Connect with investors and get tailored tech recommendations to bring your ideas to life.
      </motion.p>
      <div className="flex space-x-4">
        <Link to="/startup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-nero-blue text-white rounded-lg hover:bg-nero-blue/80 transition duration-300"
          >
            Startup Dashboard
          </motion.button>
        </Link>
        <Link to="/investor">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-nero-teal text-white rounded-lg hover:bg-nero-teal/80 transition duration-300"
          >
            Investor View
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Home;