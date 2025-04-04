import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projects';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projectsData.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);
  
  if (!project) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-portfolio-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <button 
                  onClick={() => navigate('/projects')}
                  className="flex items-center gap-1 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Projects
                </button>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white text-portfolio-blue px-4 py-2 rounded-md font-medium transition-colors hover:bg-gray-100 mt-4 md:mt-0"
              >
                Visit Live Site <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
        
        {/* Project content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <h2 className="section-heading">Project Overview</h2>
                <p className="text-portfolio-gray mb-8">
                  {project.description}
                </p>
                
                <p className="text-portfolio-gray mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in metus at orci tempus fringilla. 
                  Integer euismod, nisi vel tincidunt hendrerit, risus urna vehicula nunc, eget ultrices nisl risus 
                  vel nulla. Donec finibus sollicitudin arcu, at ultrices sapien facilisis a.
                </p>
                
                <h3 className="text-xl font-bold mb-4 text-portfolio-blue">Key Features</h3>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-portfolio-gray">
                  <li>Responsive design that works on all devices</li>
                  <li>Modern UI with smooth animations</li>
                  <li>Optimized for performance and SEO</li>
                  <li>Secure authentication and data handling</li>
                  <li>Intuitive user experience with minimal learning curve</li>
                </ul>
                
                <h3 className="text-xl font-bold mb-4 text-portfolio-blue">Technical Details</h3>
                <p className="text-portfolio-gray mb-4">
                  This project was built using a modern tech stack including React for the frontend, 
                  Node.js for the backend, and MongoDB for the database. The UI is designed with 
                  Tailwind CSS for responsive styling.
                </p>
                <p className="text-portfolio-gray">
                  For authentication, we used JWT tokens and implemented secure password hashing. 
                  The application is deployed on AWS with CI/CD pipelines for seamless updates.
                </p>
              </div>
              
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-portfolio-blue border-b pb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue shrink-0">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase text-portfolio-gray">Date</h4>
                        <p>January 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue shrink-0">
                        <Tag size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase text-portfolio-gray">Category</h4>
                        <p>Web Development</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-sm uppercase text-portfolio-gray mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <hr className="my-6 border-gray-200" />
                  
                  <h3 className="text-xl font-bold mb-4 text-portfolio-blue">Need a similar project?</h3>
                  <p className="text-portfolio-gray mb-4">
                    If you're interested in a similar project or have any questions, feel free to reach out.
                  </p>
                  <a 
                    href="/contact" 
                    className="btn-primary block text-center"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Other projects section */}
        <section className="py-16 bg-portfolio-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-portfolio-blue">Other Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectsData
                .filter(p => p.id !== project.id)
                .slice(0, 3)
                .map(p => (
                  <div key={p.id} className="project-card bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={p.imageUrl} 
                        alt={p.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-portfolio-blue">{p.title}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <a 
                          href={`/projects/${p.id}`} 
                          className="text-portfolio-blue hover:text-portfolio-lightBlue transition-colors"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
