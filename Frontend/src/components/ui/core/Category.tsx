'use client';

import { ICategory } from '@/types/category';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-[#d6e2efb8] dark:bg-neutral-900 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-4"
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px] group-hover:rotate-1 transition-transform duration-500">
        <div className="bg-white dark:bg-neutral-800 rounded-full w-full h-full flex items-center justify-center">
          <Image
            src={category.icon}
            alt={category.name}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold tracking-tight text-neutral-800 dark:text-white">
        {category.name}
      </h3>
     
      
    </motion.div>
  );
};

export default CategoryCard;
