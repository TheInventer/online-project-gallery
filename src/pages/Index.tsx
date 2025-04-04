
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-portfolio-cream">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProjects />
        
        {/* Skills section */}
        <section className="py-16 bg-white" ref={skillsRef}>
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-portfolio-dark"
              initial={{ opacity: 0, y: -20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              My Skills
            </motion.h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Python', 'Java', 'Docker', 'Kubernetes', 'REST APIs', 'GraphQL', 'Microservices'].map((skill, index) => (
                <motion.div 
                  key={skill} 
                  className="bg-portfolio-cream p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={skillVariants}
                  transition={{ duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(244, 162, 97, 0.2)'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Contact CTA section */}
        <section className="py-16 bg-portfolio-dark text-white text-center" ref={ctaRef}>
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              I'm interested in challenging opportunities where I can leverage my experience in cloud infrastructure and software development.
            </p>
            <motion.a 
              href="mailto:ajay.km85@gmail.com" 
              className="bg-portfolio-orange text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-portfolio-orange/90 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
