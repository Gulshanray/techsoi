import { Code } from 'lucide-react';
import { SiX, SiLinkedin, SiFacebook, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
  
    { icon: SiLinkedin, url: 'https://www.linkedin.com/company/108076189/admin/dashboard/' },
    { icon: SiFacebook, url: 'https://facebook.com/yourpage' },
    { icon: SiInstagram, url: 'https://www.instagram.com/techsol_institute/?hl=en' },
  ];

  return (
    <footer className="relative py-16 bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] border-t border-white/10 overflow-hidden">
      {/* Glowing circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-16 w-40 h-40 bg-tech-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-24 w-56 h-56 bg-tech-accent/20 rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-tech-primary to-tech-accent rounded-xl flex items-center justify-center animate-pulse shadow-lg shadow-tech-accent/20">
                <Code className="text-white text-xl" />
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TechSol
              </span>
            </div>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Transforming businesses with revolutionary digital solutions.
              <br />
              Experience the future of technology today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-tech-accent hover:scale-110 transform transition-all duration-300 border border-white/10"
                >
                  <Icon className="text-white text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              {['services', 'courses', 'reviews', 'contact'].map((id, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="hover:text-tech-accent transition-colors duration-200 text-left"
                  >
                    {id === 'services' && 'Our Services'}
                    {id === 'courses' && 'Training Courses'}
                    {id === 'reviews' && 'Client Reviews'}
                    {id === 'contact' && 'Contact Us'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                'Web Development',
                'Mobile Apps',
                'AI Solutions',
                'Cloud Computing',
                'Digital Marketing',
              ].map((service, index) => (
                <li
                  key={index}
                  className="hover:text-tech-accent transition-colors cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p className="mb-4 md:mb-0">
            © 2025 <span className="text-white font-semibold">TechSol</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-tech-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-tech-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-tech-accent transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
