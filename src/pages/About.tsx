
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
              Get to know me, my background, and what drives my passion for web development.
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
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&h=1000" 
                      alt="Profile" 
                      className="w-full h-auto"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-portfolio-blue">Jane Doe</h2>
                  <p className="text-portfolio-gray mb-6">
                    Web Developer & Designer
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      React
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      JavaScript
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      UI/UX
                    </span>
                    <span className="bg-portfolio-lightGray text-portfolio-gray px-3 py-1 rounded-full text-sm">
                      Node.js
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
                      <h4 className="text-xl font-bold mb-1">Master of Computer Science</h4>
                      <p className="text-portfolio-gray mb-1">Stanford University</p>
                      <p className="text-sm text-portfolio-gray mb-2">2018 - 2020</p>
                      <p>
                        Specialized in Human-Computer Interaction and Web Technologies.
                        Thesis on responsive design patterns for cross-platform applications.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Bachelor of Science in Information Technology</h4>
                      <p className="text-portfolio-gray mb-1">University of California</p>
                      <p className="text-sm text-portfolio-gray mb-2">2014 - 2018</p>
                      <p>
                        Graduated with honors. Focused on web development and UI/UX design principles.
                        Active member of the Web Development Club.
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
                      <h4 className="text-xl font-bold mb-1">Senior Frontend Developer</h4>
                      <p className="text-portfolio-gray mb-1">Tech Innovations Inc.</p>
                      <p className="text-sm text-portfolio-gray mb-2">Jan 2021 - Present</p>
                      <p>
                        Lead the frontend development team in creating responsive, 
                        user-friendly interfaces for enterprise applications. 
                        Implemented modern React patterns and improved performance metrics by 40%.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Web Developer</h4>
                      <p className="text-portfolio-gray mb-1">Digital Solutions Agency</p>
                      <p className="text-sm text-portfolio-gray mb-2">Jun 2018 - Dec 2020</p>
                      <p>
                        Developed websites and web applications for various clients across different industries.
                        Worked with React, Node.js, and various CMS platforms to deliver custom solutions.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Web Design Intern</h4>
                      <p className="text-portfolio-gray mb-1">Creative Studios</p>
                      <p className="text-sm text-portfolio-gray mb-2">May 2017 - Aug 2017</p>
                      <p>
                        Assisted the design team in creating website mockups and implementing them with HTML, CSS, and JavaScript.
                        Collaborated with senior designers to improve user experience across multiple projects.
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
                      <h4 className="text-xl font-bold mb-1">Best Website Design</h4>
                      <p className="text-portfolio-gray mb-1">Web Design Annual Awards</p>
                      <p className="text-sm text-portfolio-gray mb-2">2022</p>
                      <p>
                        Recognized for exceptional design and user experience in the e-commerce category.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Innovation in Web Technology</h4>
                      <p className="text-portfolio-gray mb-1">TechFest</p>
                      <p className="text-sm text-portfolio-gray mb-2">2021</p>
                      <p>
                        Awarded for developing an innovative accessibility solution for web applications.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-portfolio-blue/20 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-portfolio-blue rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-xl font-bold mb-1">Hackathon Winner</h4>
                      <p className="text-portfolio-gray mb-1">CodeCon</p>
                      <p className="text-sm text-portfolio-gray mb-2">2019</p>
                      <p>
                        First place in a 48-hour hackathon, developing a web app for community resource sharing.
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
