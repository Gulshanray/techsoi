import { Star } from 'lucide-react';

// Data for the featured courses marquee
const featuredCourses = [
  { name: 'Python Programming', color: 'text-blue-600' },
  { name: 'Java Development', color: 'text-purple-600' },
  { name: 'Artificial Intelligence', color: 'text-red-500' },
  { name: 'Machine Learning ', color: 'text-orange-500' },
  { name: 'Data Science', color: 'text-green-500' },
  { name: 'Web Development', color: 'text-yellow-500' },
  { name: 'Full-Stack Development', color: 'text-red-600' },
  { name: 'Cloud Computing ', color: 'text-rose-500' },
  { name: 'DevOps & CI/CD', color: 'text-rose-700' },
  { name: 'Cybersecurity', color: 'text-emerald-500' },
];

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Text */}
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Advance your engineering
            <br />
            skills with our courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Master in-demand skills through practical learning and insights from industry professionals at top-tier companies.
          </p>
        </div>

        {/* Featured Courses Marquee */}
        <div className="text-center mt-24">
          <p className="text-gray-500 mb-8 text-lg">
            📚 Popular Courses Our Students Love
          </p>

          <div className="relative overflow-hidden group">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Course List */}
            <div className="flex gap-16 animate-marquee group-hover:pause whitespace-nowrap">
              {[...featuredCourses, ...featuredCourses].map((course, index) => (
                <div
                  key={index}
                  className={`text-2xl font-semibold ${course.color} min-w-[180px]`}
                >
                  {course.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
}
