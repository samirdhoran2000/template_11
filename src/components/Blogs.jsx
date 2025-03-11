import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Clock,
  Loader,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import config from "../../config";

const BlogCard = ({ blog }) => {
  // Format date from "2024-11-25 16:42:02" to "Nov 25, 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Estimate reading time based on content length
  const calculateReadingTime = (content) => {
    // Strip HTML tags to count only text
    const text = content.replace(/<[^>]*>/g, "");
    // Average reading speed: 225 words per minute
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return minutes;
  };

  return (
    <div className="bg-gray-800/60 rounded-lg overflow-hidden shadow-lg hover:translate-y-[-4px] transition-all duration-300 h-full flex flex-col">
      {/* Blog Image */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"></div>
        <img
          src={blog.post_photo}
          alt={blog.post_title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center mb-3 text-gray-400 text-sm">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(blog.created_at)}</span>
          <span className="mx-2">•</span>
          <Clock size={14} className="mr-1" />
          <span>{calculateReadingTime(blog.post_content)} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-100 mb-3 line-clamp-2">
          {blog.post_title}
        </h3>

        {/* Summary */}
        <p className="text-gray-300 mb-4 text-sm line-clamp-3 flex-grow">
          {blog.post_content_short}
        </p>

        {/* Read More */}
        <div className="mt-auto">
          <a
            href={`/blogs/${blog.post_slug}`}
            className="inline-flex items-center text-purple-400 hover:text-purple-400 group"
          >
            <span className="mr-1">Read Article</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of blogs section
      window.scrollTo({
        top: document.getElementById("blogs-section").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div
        id="blogs-section"
        className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center"
      >
        <Loader size={36} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs-section"
        className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400 max-w-4xl mx-auto">
          <div className="flex items-center">
            <AlertTriangle size={24} className="mr-2" />
            <p>Failed to load blogs: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div
        id="blogs-section"
        className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="text-center text-gray-400 max-w-4xl mx-auto">
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No blogs available</h3>
          <p>Check back later for updates and new content.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="blogs-section" className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Latest Insights
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest articles about Tower 1O8 and the
            commercial property market in Balewadi, Pune.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="px-4 flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === index + 1
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
