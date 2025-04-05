
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-portfolio-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get to know me, my background, and what drives my passion for software development.
            </p>
          </div>
        </section>
        
        {/* About content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Photo & intro */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="rounded-lg overflow-hidden mb-6 shadow-md">
                    <img 
                      src="../Ajayyadav.jpg" 
                      alt="Profile" 
                      className="w-full h-auto"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-portfolio-blue">Ajay Kumar Yadav</h2>
                  <p className="text-portfolio-gray mb-6">
                    Senior Software Engineer, Microsoft
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Artifical Intelligence
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Machine Learning
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Distributed Systems
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Cloud Computing
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                       Microservices
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Kubernetes
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      SQL/NoSQL
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Programming - Java, Go, C#
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Project Management
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Team Management
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Virtualization
                    </span>
                  </div>
                  
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    className="btn-primary inline-block w-full text-center"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:col-span-2">
                <section className="mb-12">
                  <h3 className="section-heading flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue">
                      <GraduationCap size={18} />
                    </span>
                    Education
                  </h3>
                  <div className="space-y-8">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">M.S. in Computer Science</h4>
                      <p className="text-portfolio-gray mb-1">University of Texas, Austin (USA)</p>
                      <p className="text-sm text-portfolio-gray mb-2">2024-2026</p>
                      <p>
                         Learning Machine Learnings, Virtualization, Android, Cloud Computing, and Data Science.
                         Focused on advanced algorithms, machine learning, and data science.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">M.Tech in Computer Science</h4>
                      <p className="text-portfolio-gray mb-1">IIT Delhi</p>
                      <p className="text-sm text-portfolio-gray mb-2">2023-2024</p>
                      <p>
                         Projects and Algorithms at IIT Delhi.<br />
                         Finally dropped out of IIT Delhi to join M.S. Program at University of Texas, Austin.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">B.Tech in Computer Science</h4>
                      <p className="text-portfolio-gray mb-1">National Institute of Technology, Kurukshetra</p>
                      <p className="text-sm text-portfolio-gray mb-2">2009 - 2013</p>
                      <p>
                        Graduated with distinction in Computer Science and Engineering.
                        Focused on algorithm design, data structures, and software development.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section className="mb-12">
                  <h3 className="section-heading flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue">
                      <Briefcase size={18} />
                    </span>
                    Work Experience
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Senior Software Engineer</h4>
                      <p className="text-portfolio-gray mb-1">Microsoft IDC, Noida</p>
                      <p className="text-sm text-portfolio-gray mb-2">Aug, 2021 - Present</p>
                      <p>
                        Building Azure Sovereign Cloud Infrastructure
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Software Engineer II</h4>
                      <p className="text-portfolio-gray mb-1">Disney+ Hotstar</p>
                      <p className="text-sm text-portfolio-gray mb-2">March, 2020 - Aug,  2021</p>
                      <p>
                        Developed core infrastructure for content delivery of Disney+ Hotstar.
                        Worked on optimizing video streaming and enhancing user experience.
                        Lauched Disney+ Hotstar in Singapore, Indonesia, and Malaysia.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Softare Engineer II</h4>
                      <p className="text-portfolio-gray mb-1">Microsoft</p>
                      <p className="text-sm text-portfolio-gray mb-2">Jan 2016 - March 2020</p>
                      <p>
                        Developed tools and services for developer productivity. Worked on projects of Azure DevOps, Github Actions, and Azure Pipelines.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="section-heading flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue">
                      <Award size={18} />
                    </span>
                    Awards & Achievements
                  </h3>
                  
                  
                  
                  <div className="space-y-6">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Above and Beyond Award – Azure Networking</h4>
                      <p className="text-portfolio-gray mb-2">Microsoft</p>
                      <p>
                        Sept, 2024 - Awarded for exceptional performance and contributions to the Azure Networking team.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Technical Excellence Award – Azure Networking </h4>
                      <p className="text-portfolio-gray mb-2">Microsoft</p>
                      <p>
                        Jan 2024 - Awarded for outstanding technical contributions to the Azure Networking team.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Promo – L64 – Software Architect</h4>
                      <p className="text-portfolio-gray mb-2">Microsoft</p>
                      <p>
                        Jan 2024 - Promoted to Software Architect level for exceptional performance and contributions to the team.
                      </p>
                    </div>

                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Hackathon CVP Award</h4>
                      <p className="text-portfolio-gray mb-2">Microsoft</p>
                      <p>
                        Sept 2022 - Awarded for inovative solution in the Microsoft Hackathon.
                      </p>
                    </div>

                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Growth Mindset Award</h4>
                      <p className="text-portfolio-gray mb-2">Microsoft</p>
                      <p>
                        Dec 2022 - Awarded for demonstrating a growth mindset and continuous learning.
                      </p>
                    </div>

                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">BUILDING INDIA'S BIGGEST OTT Contributor Award</h4>
                      <p className="text-portfolio-gray mb-2">Disney+ Hotstar</p>
                      <p>
                        May 2020 - Awarded for exceptional contributions to the Disney+ Hotstar team during the launch of the platform in India and other countries.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
