import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

// Define navigation links in one place to avoid repetition
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/courses', label: 'Courses' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Helper function for link styles to keep JSX clean
  const getLinkClass = (path: string) => {
    return `transition-colors duration-300 font-medium ${
      location === path
        ? 'text-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="w-32 h-10 rounded-lg overflow-hidden cursor-pointer">
              <img
                src="/logo.jpeg"
                alt="TechSol Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left ${getLinkClass(link.href)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}