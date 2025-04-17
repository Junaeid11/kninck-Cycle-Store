"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import bikeImg from "./../../../../assets/pngwing.com (1).png"; // Bike Image
import bgRed from "./../../../../assets/Vector 1.png"; 
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="h-[80vh] bg-slate-100 relative flex flex-col lg:flex-row items-center justify-between mx-auto max-w-screen-xl">
      {/* Background Image */}
      <div className="absolute right-0 top-0 w-[55%] h-full hidden lg:block">
        <Image src={bgRed} layout="fill" objectFit="cover" alt="Red Background" />
      </div>
      <div className="relative z-10">
        {/* Animated Bike Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src={bikeImg} className="w-[500px]" alt="Bike" />
        </motion.div>
      </div>
      <div className="relative z-10 text-center lg:text-left lg:w-1/2 px-6">
        <h1 className="text-5xl font-bold text-black lg:text-white">
          Let&rsquo;s go outside and ride <span className="text-black">Cycle</span>
        </h1>
        <p className="py-6 text-gray-500 lg:text-gray-200">
          Discover top-quality cycles and expert services. Whether you&#39;re a pro or a beginner, we have everything you need to ride with confidence and style.
        </p>
        <Link href="/all-products">
          <button className="bg-[#538fde] hover:bg-[#4388e3] text-white font-bold py-3 px-6 rounded-lg transition">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
