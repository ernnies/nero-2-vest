import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  onWalletConnected: (eoaAddress: string, aaAddress: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onWalletConnected }) => {
  return (
    <div className="min-h-screen bg-nero-gray/20">
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-nero-dark text-white p-4 flex justify-between items-center"
      >
        <div className="text-xl font-bold">Nero-2-vest</div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-nero-teal transition duration-300">
            Home
          </Link>
          <Link to="/startup" className="hover:text-nero-teal transition duration-300">
            Startup Dashboard
          </Link>
          <Link to="/investor" className="hover:text-nero-teal transition duration-300">
            Investor View
          </Link>
        </div>
        <WalletConnect onWalletConnected={onWalletConnected} />
      </motion.nav>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;