

// --- 2. FRONTEND (React Component Logic) ---
import { Clock, Users, Star, CheckCircle2, Play, Download, X } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { Link } from 'wouter';

// --- Brochure Modal Component ---
function BrochureModal({ isOpen, onClose, courseTitle, onSubmit, isSubmitting, submissionStatus }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative transform transition-all">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 disabled:opacity-50" disabled={isSubmitting}>
          <X size={24} />
        </button>
        
        {submissionStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Thank You!</h2>
            <p className="text-gray-600 mt-2">Your details have been saved. The brochure is downloading now.</p>
            <button onClick={onClose} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Brochure</h2>
            <p className="text-gray-600 mb-6">For: <span className="font-semibold text-blue-600">{courseTitle}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
              </div>
              
              {submissionStatus === 'error' && (
                  <p className="text-sm text-center text-red-600">⚠️ Database error. Please try again later.</p>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Submit & Download</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Web Development");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const categories = [ "Web Development", "Mobile Development", "Data Science", "Cloud Computing", "Cyber Security", "Design", "Marketing" ];

  const courses = [
    { id: 1, title: "Full Stack Web Development", pdfUrl: "/pdfs/Java Full Stack.pdf", subtitle: "MERN/MEAN Stack", icon: "💻", category: "Web Development", duration: "3-5 Months", students: 150, rating: 4.8, description: "Master both front-end and back-end technologies to build complete and robust web applications.", curriculum: ["HTML, CSS, JavaScript", "React & Redux", "Node.js & Express"] },
    { id: 2, title: "Backend with Node.js and Express.js", pdfUrl: "/pdfs/backend-with-nodejs.pdf", subtitle: "Server-side Development", icon: "📐", category: "Web Development", duration: "10 Weeks", students: 120, rating: 4.5, description: "Build robust backend systems and APIs with Node.js and Express.", curriculum: ["Node.js Fundamentals", "Express.js", "Database Integration"] },
    { id: 3, title: "Learn MongoDB with Mongoose", pdfUrl: "/pdfs/learn-mongodb.pdf", subtitle: "Database Management", icon: "🗃️", category: "Data Science", duration: "8 Weeks", students: 120, rating: 4.5, description: "Master NoSQL database design and management with MongoDB.", curriculum: ["MongoDB Basics", "Mongoose ODM", "Data Modeling"] },
    { id: 4, title: "Learn React with Redux toolkit", pdfUrl: "/pdfs/learn-react-redux.pdf", subtitle: "Modern React Development", icon: "🔵", category: "Web Development", duration: "10 Weeks", students: 120, rating: 4.5, description: "Build modern, scalable React applications with Redux Toolkit.", curriculum: ["React Hooks", "Redux Toolkit", "State Management"] },
    { id: 5, title: "Mobile App Development with React Native", pdfUrl: "/pdfs/mobile-app-react-native.pdf", subtitle: "Cross-platform Mobile Apps", icon: "📱", category: "Mobile Development", duration: "12 Weeks", students: 95, rating: 4.6, description: "Create native mobile apps for iOS and Android using React Native.", curriculum: ["React Native Basics", "Navigation", "Native Modules"] },
    { id: 6, title: "Python for Data Science", pdfUrl: "/pdfs/DATA science.pdf", subtitle: "Data Analysis & Machine Learning", icon: "🐍", category: "Data Science", duration: "14 Weeks", students: 150, rating: 4.7, description: "Learn data science fundamentals with Python and machine learning.", curriculum: ["Python Basics", "Pandas & NumPy", "Data Visualization"] },
    { id: 7, title: "Graphic Designing", pdfUrl: "/pdfs/GRAPHIC designing techhsol.pdf", subtitle: "Visual Communication & Design Tools", icon: "🎨", category: "Design", duration: "3-5 Months", students: 85, rating: 4.5, description: "Unleash your creativity and learn the art of visual communication with industry-standard design tools.", curriculum: ["Adobe Photoshop", "Adobe Illustrator", "Design Principles"] },
    { id: 8, title: "AutoCAD-2D/3D/Sketchup", pdfUrl: "/pdfs/Auto CAD.pdf", subtitle: "Computer-Aided Design & Modeling", icon: "🏗️", category: "Design", duration: "3-5 Months", students: 70, rating: 4.6, description: "Master 2D drafting and 3D modeling with AutoCAD and Sketchup for architectural and engineering designs.", curriculum: ["2D Drafting", "3D Modeling", "Sketchup Essentials"] },
    { id: 9, title: "Digital Marketing", pdfUrl: "/pdfs/Digital marketing.pdf", subtitle: "SEO, SMM, and Content Strategy", icon: "📈", category: "Marketing", duration: "3-5 Months", students: 110, rating: 4.7, description: "Learn to grow businesses online through effective marketing strategies across various digital channels.", curriculum: ["Search Engine Optimization (SEO)", "Social Media Marketing (SMM)", "Content Marketing"] },
    { id: 10, title: "Cyber Security", pdfUrl: "/pdfs/cyber-security.pdf", subtitle: "Ethical Hacking & Network Defense", icon: "🛡️", category: "Cyber Security", duration: "3-5 Months", students: 95, rating: 4.8, description: "Become a security professional by learning to protect systems, networks, and data from cyber threats.", curriculum: ["Network Security", "Ethical Hacking", "Cryptography"] },
    { id: 11, title: "Data Analyst", pdfUrl: "/pdfs/Data analyst.pdf", subtitle: "Excel, SQL, and Visualization", icon: "📊", category: "Data Science", duration: "3-5 Months", students: 125, rating: 4.8, description: "Learn to interpret data, analyze results using statistical techniques, and provide ongoing reports.", curriculum: ["Basic to Advanced Excel", "SQL for Data Analysis", "Tableau/Power BI"] },
    { id: 12, title: "AWS Cloud Solutions Architect", pdfUrl: "/pdfs/AWS.pdf", subtitle: "Infrastructure Design on AWS", icon: "☁️", category: "Cloud Computing", duration: "3-5 Months", students: 105, rating: 4.7, description: "Become proficient in AWS cloud services and infrastructure to design and deploy scalable applications.", curriculum: ["EC2 & S3", "VPC Networking", "IAM & Security"] },
    { id: 13, title: "Full-Stack Python Development", pdfUrl: "/pdfs/python full stack developer.pdf", subtitle: "Django + React", icon: "🐍", category: "Web Development", duration: "16 Weeks", students: 115, rating: 4.8, description: "Master full-stack development using Python's powerful Django framework with a modern React frontend.", curriculum: ["Python Fundamentals", "Django ORM", "REST APIs"] },
    { id: 14, title: "Deep Learning Specialization", pdfUrl: "/pdfs/machine learning.pdf", subtitle: "TensorFlow & Keras", icon: "🧠", category: "Data Science", duration: "14 Weeks", students: 80, rating: 4.9, description: "Dive deep into neural networks and build advanced AI models for image recognition and NLP.", curriculum: ["Neural Networks", "TensorFlow API", "Computer Vision (CNNs)"] },
    { id: 15, title: "Cloud Security Engineering", pdfUrl: "/pdfs/cloud-security-engineering.pdf", subtitle: "Securing AWS & Azure", icon: "🔒", category: "Cyber Security", duration: "12 Weeks", students: 90, rating: 4.7, description: "Learn to design and implement security solutions for cloud infrastructure on major platforms.", curriculum: ["Cloud Security Principles", "Identity & Access Management (IAM)", "Network Security in Cloud"] },
    { id: 16, title: "UI/UX Design with Figma", pdfUrl: "/pdfs/ui-ux-design-figma.pdf", subtitle: "Prototyping & User Experience", icon: "🎨", category: "Design", duration: "10 Weeks", students: 130, rating: 4.8, description: "Master the complete design process from user research to high-fidelity, interactive prototypes using Figma.", curriculum: ["User Research", "Wireframing", "High-Fidelity Prototyping"] },
    { id: 17, title: "E-commerce Marketing Strategy", pdfUrl: "/pdfs/ecommerce-marketing-strategy.pdf", subtitle: "Shopify, SEO & Social Ads", icon: "🛒", category: "Marketing", duration: "8 Weeks", students: 100, rating: 4.6, description: "Learn strategies to grow an online store, focusing on platform optimization, targeted ads, and SEO.", curriculum: ["Shopify Management", "E-commerce SEO", "Facebook & Instagram Ads"] },
    { id: 18, title: "DevOps on AWS", pdfUrl: "/pdfs/devops-on-aws.pdf", subtitle: "CI/CD & Infrastructure as Code", icon: "⚙️", category: "Cloud Computing", duration: "15 Weeks", students: 95, rating: 4.9, description: "Automate software delivery pipelines and manage cloud infrastructure using modern DevOps tools on AWS.", curriculum: ["CI/CD Pipelines with Jenkins", "Docker & Containers", "Kubernetes (EKS)"] }
  ];

  const filteredCourses = courses.filter(course => course.category === selectedCategory);

  const handleOpenModal = (course: SetStateAction<null>) => {
    setSelectedCourse(course);
    setSubmissionStatus(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleFormSubmit = async (formData: any) => {
    if (!selectedCourse) return;
    setIsSubmitting(true);
    setSubmissionStatus(null);
    
    try {
      // This fetch call points to the API route defined in the backend part.
      const response = await fetch('/api/submit-brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course: selectedCourse.title }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmissionStatus('success');

      // Trigger the PDF download after successful submission
      const link = document.createElement('a');
      link.href = selectedCourse.pdfUrl;
      link.download = `${selectedCourse.title.replace(/\s+/g, '-')}-Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Learn With Us CTA */}
          <div className="bg-gradient-to-br from-[#0d0d25] via-[#1a1a3d] to-[#0d0d25] py-20 px-6 rounded-3xl text-white shadow-xl max-w-5xl mx-auto mb-16">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold">What Do You Want to Master?</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Whether you dream of becoming a <span className="text-yellow-400 font-medium">Full Stack Developer</span>,
                a <span className="text-green-400 font-medium">Data Analyst</span>, a <span className="text-pink-400 font-medium">Graphic Designer</span>,
                or even a <span className="text-blue-400 font-medium">Digital Marketer</span> — <span className="text-blue-500 font-semibold">TechSol</span> is the place to begin.
              </p>
              <p className="text-md text-gray-400">
                Our expert mentors and real-world projects will make your journey practical and placement-focused.
              </p>
              <a href="tel:+917302670626" className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-10 py-4 rounded-xl text-lg shadow-lg">
                🚀 Start Learning Today
              </a>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className={`relative h-48 bg-gray-100 flex items-center justify-center`}>
                  <div className="text-8xl">{course.icon}</div>
                </div>

                <div className="p-6 space-y-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.subtitle}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{course.students} students</span></div>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span>{course.rating}</span></div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{course.duration}</span></div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">What you'll learn:</h4>
                    <div className="space-y-1">
                      {course.curriculum.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleOpenModal(course)} className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                        <Download size={16}/> Brochure
                      </button>
                      <Link href="/contact" className="w-full">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg">
                          Enroll Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Courses Stand Out</h2>
              <p className="text-lg text-gray-600">Comprehensive learning experience designed for success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Play className="w-8 h-8 text-blue-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Learning</h3>
                <p className="text-gray-600">Hands-on projects and real-world applications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Mentors</h3>
                <p className="text-gray-600">Learn from industry professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certification</h3>
                <p className="text-gray-600">Industry-recognized certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BrochureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseTitle={selectedCourse?.title}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submissionStatus={submissionStatus}
      />
    </>
  );
}