
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-portfolio-lightGray">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-portfolio-blue">
            Ajay Kumar Yadav
          </h1>
          <p className="text-xl text-portfolio-gray mb-8 max-w-xl">
            Software Engineer III at Uber, building scalable cloud infrastructure and tools
            for developer productivity. Passionate about creating robust, efficient solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/projects" 
              className="bg-portfolio-accent text-white px-4 py-2 rounded-md transition-colors hover:bg-opacity-90 flex items-center gap-2"
            >
              View My Work <ArrowRight size={16} />
            </Link>
            <Link 
              to="/contact" 
              className="border border-portfolio-accent text-portfolio-accent px-4 py-2 rounded-md transition-colors hover:bg-portfolio-accent hover:text-white"
            >
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-portfolio-accent/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500" 
                alt="Ajay Kumar Yadav" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
