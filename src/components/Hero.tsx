
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Software Engineer III at Uber";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100/80">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-portfolio-blue">
            Ajay Kumar Yadav
          </h1>
          <div className="h-8 mb-4">
            <p className="text-xl text-portfolio-gray">
              {text}<span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-xl text-portfolio-gray mb-8 max-w-xl">
            Building scalable cloud infrastructure and tools for developer productivity. 
            Passionate about creating robust, efficient solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/projects" 
                className="bg-portfolio-lightBlue text-white flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-portfolio-blue"
              >
                View My Work <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/contact" 
                className="border border-portfolio-lightBlue text-portfolio-blue px-4 py-2 rounded-md transition-colors hover:bg-blue-50"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-portfolio-lightBlue/10"></div>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 0 rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500" 
                alt="Ajay Kumar Yadav" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
