import { Clock, Users, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function CoursesSection() {
  // The data is now included directly inside the component file.
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Cloud Computing",
    "Cyber Security",
    "Design",
    "Marketing",
  ];

  const courses = [
    {
      id: 1,
      title: "Modern Web Development",
      subtitle: "React & Node.js",
      icon: "💻",
      category: "Web Development",
      students: 145,
      rating: 4.8,
      classes: "25 Classes",
      bgColor: "bg-orange-100",
    },
    {
      id: 2,
      title: "iOS & Android Apps",
      subtitle: "React Native",
      icon: "📱",
      category: "Mobile Development",
      students: 90,
      rating: 4.6,
      classes: "20 Classes",
      bgColor: "bg-purple-100",
    },
    {
      id: 3,
      title: "Introduction to Data Science",
      subtitle: "Python, Pandas, & NumPy",
      icon: "🐍",
      category: "Data Science",
      students: 160,
      rating: 4.9,
      classes: "30 Classes",
      bgColor: "bg-blue-100",
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      subtitle: "Cloud Concepts & Services",
      icon: "☁️",
      category: "Cloud Computing",
      students: 115,
      rating: 4.7,
      classes: "18 Classes",
      bgColor: "bg-red-100",
    },
    {
      id: 5,
      title: "Cyber Security Fundamentals",
      subtitle: "Network & Data Protection",
      icon: "🛡️",
      category: "Cyber Security",
      students: 95,
      rating: 4.5,
      classes: "22 Classes",
      bgColor: "bg-teal-100",
    },
    {
      id: 6,
      title: "Graphic Design Masterclass",
      subtitle: "Photoshop & Illustrator",
      icon: "🎨",
      category: "Design",
      students: 100,
      rating: 4.8,
      classes: "20 Classes",
      bgColor: "bg-indigo-100",
    },
    {
      id: 7,
      title: "Digital Marketing Strategy",
      subtitle: "SEO, SMM & Content",
      icon: "📈",
      category: "Marketing",
      students: 125,
      rating: 4.7,
      classes: "15 Classes",
      bgColor: "bg-green-100",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Web Development");

  const filteredCourses = courses.filter(
    (course) => course.category === selectedCategory
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h2>
          <p className="text-lg text-gray-600">
            Discover a wide range of courses designed to help you grow your
            career.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition-all text-sm font-medium ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Popular Courses */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900">
            Popular in {selectedCategory}
          </h3>
          <Link href="/courses">
            <button className="text-purple-600 hover:text-purple-700 transition-colors border border-purple-200 px-6 py-2 rounded-full hover:bg-purple-50">
              View All Courses
            </button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Icon area */}
              <div
                className={`relative h-36 ${course.bgColor} flex items-center justify-center rounded-t-lg`}
              >
                <div className="text-5xl">{course.icon}</div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">{course.subtitle}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.classes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No courses found for "{selectedCategory}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}