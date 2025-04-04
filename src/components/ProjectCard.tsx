
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md"
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <motion.img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-portfolio-blue">{project.title}</h3>
        <p className="text-portfolio-gray mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="text-xs bg-blue-50 text-portfolio-gray px-2 py-1 rounded-full"
              whileHover={{ 
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                scale: 1.05
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ x: 3 }}>
            <Link to={`/projects/${project.id}`} className="text-portfolio-lightBlue hover:text-portfolio-blue transition-colors">
              View Details
            </Link>
          </motion.div>
          <motion.a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-portfolio-lightBlue hover:text-portfolio-blue transition-colors"
            whileHover={{ x: 3 }}
          >
            Visit Site <ExternalLink size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
