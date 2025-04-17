"use client";

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

const HeroProductSlider = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllMeal();
      setMeals(data.slice(0, 2));
    };
    fetchData();
  }, []);

  return (
   <NMContainer>
     <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 items-center">
        {/* Static Text Section */}
        <div className="space-y-6">
          <h3 className="text-xl text-gray-500 font-medium">
            For Summer Ride
          </h3>
          <h1 className="text-4xl font-extrabold">
            SALE UP <span className="text-black">40%</span>
          </h1>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>☑ Full custom accessories</li>
            <li>☑ Power booster gaming GPS support</li>
            <li>☑ Tube less tyre for better riding</li>
            <li>☑ Capable strong tire & metal body</li>
          </ul>
          <Button className="bg-black text-white hover:bg-gray-800 w-fit">
            Shop Now
          </Button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000 }}
            navigation
            loop
            className="w-full"
          >
            {meals.map((meal) => (
              <SwiperSlide key={meal._id}>
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={() => router.push(`/find-meals/${meal._id}`)}
                >
                  <Image
                    src={meal.imageUrls[0]}
                    alt={meal.name}
                    width={500}
                    height={400}
                    className="object-contain max-h-[400px] transition-all duration-500 hover:scale-105"
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
