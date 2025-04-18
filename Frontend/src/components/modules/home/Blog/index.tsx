"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import BlogCard from "@/components/ui/core/RecipeBlogCard";
import { getAllBlogs } from "@/services/blogs";
import { TBlog } from "@/types/blog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Blogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        toast.error("Error fetching blogs");
      }
    };
    fetchBlogs();
  }, []);

  return (
    <NMContainer >
      <div className="py-5 bg-white text-center relative overflow-hidden">
        <h2 className="text-[4rem] lg:text-[7rem] font-extrabold text-gray-100 absolute  left-1/2 transform -translate-x-1/2 pointer-events-none z-0">
         BLOGS
        </h2>

        {/* Main Title */}
        <div className="relative z-10 lg:pb-14">
          <h3 className="text-4xl font-bold text-gray-900">Blogs & News</h3>
          <div className="w-10 h-1 bg-red-500 mx-auto mt-2 mb-12" />
        </div>


        {/* Blog Cards Grid */}
        <div className="relative mx-5 z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0,3).map((blog, idx) => (
            <BlogCard key={idx} blogs={blog} />
          ))}
        </div>
      </div>
    </NMContainer>
  );
};

export default Blogs;
