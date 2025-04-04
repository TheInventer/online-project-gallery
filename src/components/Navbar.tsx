
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-portfolio-blue">My Portfolio</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-portfolio-gray"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="header-link animated-underline pb-1">
            Home
          </Link>
          <Link to="/projects" className="header-link animated-underline pb-1">
            Projects
          </Link>
          <Link to="/about" className="header-link animated-underline pb-1">
            About Me
          </Link>
          <Link to="/contact" className="header-link animated-underline pb-1">
            Contact
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden py-4 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <Link 
                to="/" 
                className="w-full text-center py-2 px-4 header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/projects" 
                className="w-full text-center py-2 px-4 header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/about" 
                className="w-full text-center py-2 px-4 header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About Me
              </Link>
              <Link 
                to="/contact" 
                className="w-full text-center py-2 px-4 header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
