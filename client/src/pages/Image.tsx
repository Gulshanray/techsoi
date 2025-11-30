import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface GalleryItem {
  id: string;
  category: string;
  src: string;
  title: string;
  type: "image" | "video" | "pdf";
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewSize, setViewSize] = useState<"small" | "medium" | "large">("medium");

  const categories = [
    { id: "all", name: "All" },
    { id: "certificate", name: "Certificates" },
    { id: "classroom", name: "Classrooms" },
,
    { id: "office", name: "Office" },
    { id: "videos", name: "Videos" },
  ];

  const galleryItems: GalleryItem[] = [
    // Certificates (PDFs)
    ...Array.from({ length: 3 }, (_, i) => ({
      id: `cert-${i}`,
      category: "certificate",
      src: `/image/certificate/certificate-${i + 1}.pdf`,
      title: `Certificate ${i + 1}`,
      type: "pdf" as const,
    })),
    // Classroom
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `class-${i}`,
      category: "classroom",
      src: `/image/classroom/classroom-${i + 1}.jpeg`,
      title: `Classroom ${i + 1}`,
      type: "image" as const,
    })),
    
    // Office
    ...Array.from({ length: 2 }, (_, i) => ({
      id: `office-${i}`,
      category: "office",
      src: `/image/office/office-${i + 1}.jpeg`,
      title: `Office ${i + 1}`,
      type: "image" as const,
    })),
    // Videos
    {
      id: "v1",
      category: "videos",
      src: `image/videos/video-1.mp4`,
      title: "Training Session",
      type: "video",
    },
    {
      id: "v2",
      category: "videos",
      src: `image/videos/video-2.mp4`,
      title: "Student",
      type: "video",
    },
     {
      id: "v3",
      category: "videos",
      src: `image/videos/video-3.mp4`,
      title: "Student",
      type: "video",
    },
    {
      id: "v4",
      category: "videos",
      src: `image/videos/video-4.mp4`,
      title: "Student",
      type: "video",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // 📄 Smart handler — opens PDFs in a new tab, shows others in modal
  const handleItemClick = (item: GalleryItem) => {
    if (item.type === "pdf") {
      window.open(item.src, "_blank", "noopener,noreferrer");
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-[#e63946] to-[#d62828] text-white py-24 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            Our Gallery
          </h1>
          <p className="text-lg text-red-100 max-w-3xl mx-auto leading-relaxed">
            Explore our environment — classrooms, labs, libraries, and real-world learning experiences.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 py-12 px-6">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full px-7 py-2 text-sm font-semibold transition-all duration-300 shadow-md ${
              selectedCategory === cat.id
                ? "bg-[#e63946] text-white shadow-lg scale-105"
                : "bg-white text-[#e63946] border border-[#e63946] hover:bg-[#e63946] hover:text-white"
            }`}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleItemClick(item)}
              className="relative group overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover rounded-3xl"
                  muted
                  loop
                  autoPlay
                />
              ) : item.type === "pdf" ? (
                <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center text-[#e63946]">
                  <span className="text-5xl">📄</span>
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <span className="text-sm text-gray-500">Click to view PDF</span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-3xl transform group-hover:scale-110 transition-transform duration-700"
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <p className="text-white font-semibold text-lg">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Viewer for Images & Videos */}
      <AnimatePresence>
        {selectedItem && selectedItem.type !== "pdf" && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between w-full max-w-3xl mb-4 text-white">
              <div className="flex gap-2">
                {["small", "medium", "large"].map((size) => (
                  <Button
                    key={size}
                    className={`px-4 py-1 rounded-full text-sm ${
                      viewSize === size
                        ? "bg-[#e63946] text-white"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                    onClick={() =>
                      setViewSize(size as "small" | "medium" | "large")
                    }
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setSelectedItem(null)}
                className="bg-white text-[#e63946] px-4 rounded-full hover:bg-[#f1faee]"
              >
                ✕ Close
              </Button>
            </div>

            <motion.div
              className={`bg-white rounded-xl overflow-hidden shadow-2xl p-4 ${
                viewSize === "small"
                  ? "w-64"
                  : viewSize === "medium"
                  ? "w-[32rem]"
                  : "w-[60rem]"
              }`}
            >
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#e63946] to-[#d62828] text-white text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Start Your Learning Journey Today!
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Learn from real projects in Machine Learning, Data Science, and Software Development — build your career with confidence.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[#e63946] px-8 py-3 font-semibold rounded-full shadow hover:scale-105 transition-all">
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
