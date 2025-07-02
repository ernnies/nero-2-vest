import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

// Mock data for demonstration (in production, fetch from blockchain)
const mockProjects = [
  { name: 'Project Alpha', description: 'A decentralized gaming platform.' },
  { name: 'Project Beta', description: 'A social media dApp with privacy features.' },
];

const InvestorView: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-nero-dark"
      >
        Investor Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default InvestorView;