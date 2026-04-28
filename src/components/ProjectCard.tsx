
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
  type: 'professional' | 'personal';
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-portfolio-blue">{project.title}</h3>
        <p className="text-portfolio-gray mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-portfolio-lightGray text-portfolio-gray px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Link to={`/projects/${project.id}`} className="text-portfolio-blue hover:text-portfolio-lightBlue transition-colors">
            View Details
          </Link>
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-portfolio-blue hover:text-portfolio-lightBlue transition-colors"
          >
            Visit Site <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
