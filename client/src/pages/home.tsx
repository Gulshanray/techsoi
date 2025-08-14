import { useEffect } from 'react';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import CoursesSection from '@/components/courses-section';
import ReviewsSection from '@/components/reviews-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  useEffect(() => {
    // Scroll reveal animation
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.scroll-reveal');
      
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <CoursesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
