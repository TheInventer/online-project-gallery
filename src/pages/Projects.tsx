
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Extract all unique tags from projects
  const allTags = Array.from(new Set(
    projectsData.flatMap(project => project.tags)
  )).sort();
  
  // Filter projects based on selected tag
  const filteredProjects = selectedTag 
    ? projectsData.filter(project => project.tags.includes(selectedTag))
    : projectsData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-portfolio-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore my latest work. Each project represents a unique challenge and solution.
            </p>
          </div>
        </section>
        
        {/* Projects grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filter tags */}
            <div className="mb-10 flex flex-wrap gap-2 justify-center">
              <button 
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedTag === null 
                    ? 'bg-portfolio-blue text-white' 
                    : 'bg-gray-200 text-portfolio-gray hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedTag === tag 
                      ? 'bg-portfolio-blue text-white' 
                      : 'bg-gray-200 text-portfolio-gray hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-portfolio-gray">
                  No projects found matching the selected filter.
                </p>
                <button
                  className="mt-4 text-portfolio-blue hover:text-portfolio-lightBlue transition-colors"
                  onClick={() => setSelectedTag(null)}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
