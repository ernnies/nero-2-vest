import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import StartupDashboard from './pages/StartupDashboard';
import InvestorView from './pages/InvestorView';
import './App.css';

const App: React.FC = () => {
  const [eoaAddress, setEoaAddress] = useState('');
  const [aaAddress, setAaAddress] = useState('');

  const handleWalletConnected = async (eoaAddr: string, aaAddr: string) => {
    try {
      setEoaAddress(eoaAddr);
      setAaAddress(aaAddr);
    } catch (error) {
      console.error('Error handling wallet connection:', error);
    }
  };

  return (
    <Router>
      <Layout onWalletConnected={handleWalletConnected}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/startup" element={<StartupDashboard />} />
          <Route path="/investor" element={<InvestorView />} />
        </Routes>
        {eoaAddress && aaAddress && (
          <div className="text-center text-nero-gray text-sm mt-4">
            EOA: {eoaAddress.slice(0, 6)}...{eoaAddress.slice(-4)} | AA: {aaAddress.slice(0, 6)}...{aaAddress.slice(-4)}
          </div>
        )}
      </Layout>
      <ToastContainer position="bottom-right" />
    </Router>
  );
};

export default App;