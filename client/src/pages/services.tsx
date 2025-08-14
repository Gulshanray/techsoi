import { Code, Smartphone, Database, Cloud, Shield, Zap, Users, Trophy, Target } from 'lucide-react';
import { Link } from 'wouter';

export default function ServicesPage() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Web Development",
      description: "Master modern web technologies including React, Node.js, Express, and MongoDB. Build complete web applications from frontend to backend.",
      features: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "REST APIs", "Authentication", "Deployment"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Create stunning mobile applications for iOS and Android using React Native and Flutter. Learn to build cross-platform apps efficiently.",
      features: ["React Native", "Flutter & Dart", "iOS Development", "Android Development", "App Store Deployment", "Mobile UI/UX"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Science & Analytics",
      description: "Dive into data science with Python, machine learning algorithms, and data visualization. Transform data into meaningful insights.",
      features: ["Python Programming", "Machine Learning", "Data Visualization", "Pandas & NumPy", "TensorFlow", "SQL & NoSQL"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Computing & DevOps",
      description: "Learn cloud platforms like AWS, Azure, and Google Cloud. Master DevOps practices, containerization, and infrastructure as code.",
      features: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring & Logging", "Microservices"],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity",
      description: "Protect digital assets with comprehensive cybersecurity training. Learn ethical hacking, network security, and risk management.",
      features: ["Ethical Hacking", "Network Security", "Risk Assessment", "Penetration Testing", "Security Protocols", "Compliance"],
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Explore artificial intelligence and machine learning concepts. Build intelligent systems and work with neural networks.",
      features: ["Neural Networks", "Deep Learning", "Natural Language Processing", "Computer Vision", "AI Ethics", "Model Deployment"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8 text-blue-600" />, number: "5,000+", label: "Students Trained" },
    { icon: <Trophy className="w-8 h-8 text-green-600" />, number: "95%", label: "Job Placement Rate" },
    { icon: <Target className="w-8 h-8 text-purple-600" />, number: "50+", label: "Industry Partners" },
    { icon: <Code className="w-8 h-8 text-orange-600" />, number: "100+", label: "Projects Completed" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tech education designed to transform you into a skilled professional. 
            Choose from our wide range of courses and start your journey today.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-lg border ${service.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden group`}>
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">What You'll Learn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <Link href='/contact'>
                  <button className={`w-full bg-gradient-to-r ${service.color} text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TechSol?</h2>
            <p className="text-lg text-gray-600">We're committed to your success with industry-leading education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of real-world experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hands-on Projects</h3>
              <p className="text-gray-600">Build real-world projects that showcase your skills to potential employers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Career Support</h3>
              <p className="text-gray-600">Get job placement assistance and career guidance throughout your journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}