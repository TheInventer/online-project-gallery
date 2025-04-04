
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
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000" 
                      alt="Profile" 
                      className="w-full h-auto"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-portfolio-blue">Ajay Kumar Yadav</h2>
                  <p className="text-portfolio-gray mb-6">
                    Software Engineer III at Uber
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      JavaScript
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      React
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      TypeScript
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
                      <h4 className="text-xl font-bold mb-1">Bachelor of Technology in Computer Science</h4>
                      <p className="text-portfolio-gray mb-1">Institute of Engineering & Technology, Lucknow</p>
                      <p className="text-sm text-portfolio-gray mb-2">2014 - 2018</p>
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
                      <h4 className="text-xl font-bold mb-1">Software Engineer III</h4>
                      <p className="text-portfolio-gray mb-1">Uber</p>
                      <p className="text-sm text-portfolio-gray mb-2">May, 2022 - Present</p>
                      <p>
                        Working on the Cloud Engineering team, building and maintaining critical infrastructure
                        that powers Uber's services. Implementing tools and services to enhance developer productivity
                        and system reliability.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Software Development Engineer II</h4>
                      <p className="text-portfolio-gray mb-1">Amazon</p>
                      <p className="text-sm text-portfolio-gray mb-2">May 2019 - Apr 2022</p>
                      <p>
                        Developed and maintained critical components of Amazon's marketplace platform.
                        Lead the development of key features and services that improved customer experience
                        and operational efficiency.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Software Development Engineer</h4>
                      <p className="text-portfolio-gray mb-1">Paytm</p>
                      <p className="text-sm text-portfolio-gray mb-2">Jun 2018 - May 2019</p>
                      <p>
                        Worked on Paytm's payment gateway systems, implementing robust solutions for online transactions.
                        Contributed to scaling the platform to handle increased transaction volume and improved system stability.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="section-heading flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-portfolio-blue/10 flex items-center justify-center text-portfolio-blue">
                      <Award size={18} />
                    </span>
                    Skills & Expertise
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Python', 'Java', 'Docker', 'Kubernetes', 'REST APIs', 'GraphQL', 'Microservices'].map((skill) => (
                      <div 
                        key={skill} 
                        className="bg-portfolio-lightGray p-3 rounded-lg text-portfolio-gray flex items-center justify-center text-center"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Cloud Technologies</h4>
                      <p className="text-portfolio-gray mb-2">AWS, GCP, Azure</p>
                      <p>
                        Extensive experience with cloud platforms and infrastructure as code.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Frontend Development</h4>
                      <p className="text-portfolio-gray mb-2">React, Redux, HTML/CSS</p>
                      <p>
                        Designing and implementing responsive, user-friendly interfaces for web applications.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Backend Development</h4>
                      <p className="text-portfolio-gray mb-2">Node.js, Java, Python</p>
                      <p>
                        Building scalable, efficient server-side applications and APIs.
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
