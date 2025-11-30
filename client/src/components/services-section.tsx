import { Code, Layout, Brain, Cloud, Megaphone, ShieldCheck } from 'lucide-react';

// Service data ko ek array mein daal diya hai taaki code saaf rahe
const services = [
  {
    icon: <Code className="w-8 h-8 text-indigo-600" />,
    title: "Full Stack Web Development",
    description: "Learn to build modern, responsive web applications from front-end to back-end with cutting-edge technologies.",
  },
  {
    icon: <Layout className="w-8 h-8 text-sky-600" />,
    title: "Graphic Designing",
    description: "Master the art of visual communication and create stunning graphics for digital and print media.",
  },
  {
    icon: <Megaphone className="w-8 h-8 text-emerald-600" />,
    title: "Digital Marketing",
    description: "Explore data-driven strategies for SEO, SEM, and social media to drive business growth and engagement.",
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-600" />,
    title: "Data Science & Analyst",
    description: "Harness the power of data. Learn analytics, machine learning, and visualization to make smart decisions.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-orange-600" />,
    title: "AWS / Cloud Solutions",
    description: "Understand scalable cloud infrastructure, deployment, and management with Amazon Web Services.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-rose-600" />,
    title: "Cyber Security",
    description: "Learn to protect digital systems and networks from cyber threats with defensive and offensive techniques.",
  },
];

export default function ServicesSection() {
  return (
    // Section ka background light kar diya gaya hai
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Courses We Offer
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Kickstart your career with our job-ready courses designed by industry experts. We provide skills that matter.
          </p>
        </div>

        {/* Naya, simple grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* services array se map karke cards banaye ja rahe hain */}
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="mb-6">
                {/* Icon ko naya style diya gaya hai */}
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}