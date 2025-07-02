import React, { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import TechAdvisor from '../components/TechAdvisor';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  roadmap: string;
}

const StartupDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleProjectSubmit = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectForm onSubmit={handleProjectSubmit} />
      <TechAdvisor />
      {projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 text-nero-dark">Your Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-nero-dark">{project.name}</h3>
                <p className="text-nero-gray text-sm">{project.description}</p>
                <p className="text-nero-gray text-sm mt-2"><strong>Roadmap:</strong> {project.roadmap}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StartupDashboard;