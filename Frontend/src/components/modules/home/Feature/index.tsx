'use client';

import { FaWeightHanging, FaPalette, FaCog, FaRegFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: FaWeightHanging,
    title: "Light weight",
    description: "Crafted with lightweight materials for easy portability.",
    color: "#7B2CBF",
  },
  {
    icon: FaPalette,
    title: "Colors wide range",
    description: "Vibrant color options to match your style.",
    color: "#FF6B6B",
  },
  {
    icon: FaCog,
    title: "Aerograde aluminium",
    description: "Made with high-grade aluminum for strength and durability.",
    color: "#00A8E8",
  },
  {
    icon: FaRegFileAlt,
    title: "Certified quality",
    description: "Officially certified for safety and quality standards.",
    color: "#43AA8B",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white text-center relative overflow-hidden">
      {/* Background Title */}
      <h2 className="text-[10rem] font-extrabold text-gray-100 absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-0">
        FEATURES
      </h2>

      {/* Main Title */}
      <div className="relative z-10">
        <h3 className="text-4xl font-bold text-gray-900">Special Features</h3>
        <div className="w-10 h-1 bg-red-500 mx-auto mt-2 mb-12" />
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 max-w-6xl mx-auto relative z-10">
        {features.map(({ icon: Icon, title, description, color }, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 group cursor-pointer"
          >
            <motion.div
              initial={{ rotate: 0, color: "#000000" }}
              whileHover={{ rotate: 360, color }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-6xl"
            >
              <Icon />
            </motion.div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-gray-600 text-sm max-w-[200px]">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
