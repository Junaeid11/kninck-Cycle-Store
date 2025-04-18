'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import bikeImg from "./../../../../assets/pngwing.com (1).png"; // Bike Image
import bgRed from "./../../../../assets/Vector 1.png";
import Link from "next/link";

const HeroSection = () => {
  return (
<div className="h-auto lg:h-[80vh] bg-slate-100 font-poppins flex items-center relative overflow-hidden">
  <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 w-full">

    {/* Text Section */}
    <div className="w-full lg:w-1/2 text-center lg:text-left z-10 p-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight tracking-tight">
        Ride Into <span className="text-[#538fde]">Freedom</span> with Every Turn
      </h1>
      <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
        Unleash your journey with premium bicycles crafted for performance and style. Whether for daily rides or weekend adventures, explore a collection built for speed, comfort, and power.
      </p>
      <Link href="/all-products">
        <button className="mt-6 bg-[#538fde] hover:bg-[#4388e3] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
          Shop Cycles
        </button>
      </Link>
    </div>

    {/* Bike Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center z-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src={bikeImg}
          alt="Cycle Product"
          className="w-[250px] sm:w-[350px] md:w-[450px] object-contain"
        />
      </motion.div>
    </div>
  </div>

  {/* Background Image */}
  <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full hidden lg:block pointer-events-none">
    <Image src={bgRed} layout="fill" objectFit="cover" alt="Red Background" />
  </div>
</div>

  );
};

export default HeroSection;
