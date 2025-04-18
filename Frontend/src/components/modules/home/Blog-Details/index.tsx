'use client';
import { TBlog } from '@/types/blog';
import Image from 'next/image';
import { FaUser, FaCalendarAlt, FaTag } from 'react-icons/fa';

const BlogDetails = ({ blog }: { blog: TBlog }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Image */}
      <div className="relative w-full h-[450px]">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
        {/* Blog Meta Info */}
      
          <h1 className="text-4xl font-bold text-black py-5 drop-shadow-lg text-center px-4">{blog.title}</h1>
     
        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-800" />
            <span className="font-semibold">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-800" />
            <span>{new Date(blog.createdAt).toDateString()}</span>
          </div>
        </div>

        {/* Blog Content */}
        <p className="text-gray-700 text-lg mt-6 leading-relaxed">{blog.content}</p>

        {/* Tags Section */}
     
      </div>
    </div>
  );
};

export default BlogDetails;
