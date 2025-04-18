import { TBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blogs }: { blogs: TBlog }) => {
  return (
    <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-sky-100 border hover:shadow-2xl transition-shadow duration-300">
    <Image
      src={blogs.image}
      alt={blogs.title}
      width={500}
      height={300}
      className="w-full h-52 object-cover"
    />
    <div className="p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{blogs.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{blogs.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">By {blogs.author}</span>
       <Link href={`/blogs/${blogs._id}`}>
       <button className="text-blue-600 hover:underline text-sm font-medium">
          Read More
        </button>
       </Link>
      </div>
    </div>
  </div>
);
};

export default BlogCard;
