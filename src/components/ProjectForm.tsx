import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface ProjectFormProps {
  onSubmit: (project: { name: string; description: string; roadmap: string }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roadmap, setRoadmap] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !roadmap) {
      toast.error('Please fill in all fields');
      return;
    }
    onSubmit({ name, description, roadmap });
    setName('');
    setDescription('');
    setRoadmap('');
    toast.success('Project created successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-nero-dark">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-nero-dark">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-nero-gray shadow-sm focus:border-nero-blue focus:ring-nero-blue"
            placeholder="My Startup Project"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-nero-dark">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-nero-gray shadow-sm focus:border-nero-blue focus:ring-nero-blue"
            placeholder="Describe your project..."
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-nero-dark">Roadmap</label>
          <textarea
            value={roadmap}
            onChange={(e) => setRoadmap(e.target.value)}
            className="mt-1 block w-full rounded-md border-nero-gray shadow-sm focus:border-nero-blue focus:ring-nero-blue"
            placeholder="Outline your roadmap..."
            rows={4}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 bg-nero-blue text-white rounded-lg hover:bg-nero-blue/80 transition duration-300"
        >
          Create Project
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ProjectForm;