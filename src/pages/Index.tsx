
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-portfolio-lightGray">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProjects />
        
        {/* Skills section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-portfolio-blue">My Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Python', 'Java', 'Docker', 'Kubernetes', 'REST APIs', 'GraphQL', 'Microservices'].map((skill) => (
                <div 
                  key={skill} 
                  className="bg-portfolio-lightGray p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-portfolio-accent/20"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA section */}
        <section className="py-16 bg-portfolio-blue text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              I'm interested in challenging opportunities where I can leverage my experience in cloud infrastructure and software development.
            </p>
            <a 
              href="mailto:ajay.km85@gmail.com" 
              className="bg-portfolio-accent text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-opacity-90"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
