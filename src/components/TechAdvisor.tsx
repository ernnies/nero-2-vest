import React, { useState } from 'react';
import { motion } from 'framer-motion';

const techSuggestions = {
  GameFi: [
    'Unity + NERO SDK for game logic',
    'IPFS for decentralized asset storage',
    'Chainlink VRF for random number generation',
  ],
  SocialFi: [
    'Lens Protocol for decentralized social graphs',
    'IPFS for content storage',
    'The Graph for indexing social data',
  ],
  DeFi: [
    'OpenZeppelin for secure smart contracts',
    'Chainlink for price feeds',
    'Uniswap SDK for liquidity pools',
  ],
};

const TechAdvisor: React.FC = () => {
  const [projectType, setProjectType] = useState<keyof typeof techSuggestions>('GameFi');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-nero-dark">Tech Advisor</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-nero-dark">Project Type</label>
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as keyof typeof techSuggestions)}
          className="mt-1 block w-full rounded-md border-nero-gray shadow-sm focus:border-nero-blue focus:ring-nero-blue"
        >
          <option value="GameFi">GameFi</option>
          <option value="SocialFi">SocialFi</option>
          <option value="DeFi">DeFi</option>
        </select>
      </div>
      <div>
        <h3 className="text-lg font-medium text-nero-dark">Recommended Technologies</h3>
        <ul className="mt-2 space-y-2">
          {techSuggestions[projectType].map((tech, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-nero-gray text-sm"
            >
              - {tech}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default TechAdvisor;