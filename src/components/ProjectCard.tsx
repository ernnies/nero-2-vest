import React from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: { name: string; description: string };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-lg font-semibold text-nero-dark">{project.name}</h3>
      <p className="text-nero-gray text-sm mt-2">{project.description}</p>
      <div className="mt-4 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-nero-blue flex items-center space-x-1"
        >
          <EyeIcon className="h-5 w-5" />
          <span>View Details</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;