'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NMContainer from "@/components/ui/core/NMContainer";
import Link from "next/link";

const HeroProductSlider = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllMeal();
      setMeals(data.slice(1, 3));
    };
    fetchData();
  }, []);

  return (
    <NMContainer>
      <section className="w-full relative bg-white py-20 text-center font-poppins overflow-hidden">
        
        {/* Background Watermark */}
        <h2 className="text-[6rem] sm:text-[8rem] lg:text-[9rem] font-extrabold text-gray-100 absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-0 select-none tracking-widest">
          OFFER
        </h2>

        {/* Main Title Section */}
        <div className="relative z-10 mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800">Summer Cycling Deals</h3>
          <div className="w-12 h-1 bg-[#538fde] mx-auto mt-3" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 md:px-10 relative z-10">
          
          {/* Text Section */}
          <div className="space-y-6 text-left">
            <h4 className="text-lg text-gray-500 font-medium uppercase tracking-wide">
              Exclusive Offer for Summer Riders
            </h4>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Save <span className="text-[#538fde]">15%</span> on Select Cycles
            </h1>
            <ul className="space-y-2 text-gray-700 text-base leading-relaxed">
              <li>✔ Custom accessories for pro riders</li>
              <li>✔ GPS-integrated smart control panel</li>
              <li>✔ Tubeless tires for smoother rides</li>
              <li>✔ Reinforced alloy frame and strong grip tires</li>
            </ul>
            <Link href="/find-products">
              <Button className="bg-[#538fde] hover:bg-[#3b7fd6] mt-6 text-white px-6 py-3 text-base font-semibold rounded-md shadow-lg transition duration-300 w-fit">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3500 }}
              navigation
              loop
              className="w-full"
            >
              {meals.map((meal) => (
                <SwiperSlide key={meal._id}>
                  <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => router.push(`/find-products/${meal._id}`)}
                  >
                    <Image
                      src={meal.imageUrls[0]}
                      alt={meal.name}
                      width={500}
                      height={400}
                      className="object-contain max-h-[400px] rounded-xl  transition-transform duration-500"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </NMContainer>
  );
};

export default HeroProductSlider;
