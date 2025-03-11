import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  MessageSquare,
  Eye,
  Heart,
  ArrowLeft,
} from "lucide-react";
import config from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import { ContactDialog } from "./Contact";

const BlogContent = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs/${id}?website=${config.SLUG_URL}`
        );
        console.log("response ", response);

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlog(data.blogs[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]); // Added id to dependency array

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300">Loading blog content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-xl text-red-400 mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-xl text-yellow-400 mb-2">No Blog Found</h2>
          <p className="text-gray-300">
            The requested blog content could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-4 flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:text-purple-400 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          {/* Blog Header */}
          <div className="relative rounded-lg overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"></div>
            <img
              src={blog.post_photo}
              alt={blog.post_title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center space-x-2 text-gray-300 mb-2">
                <Calendar size={16} />
                <span className="text-sm">{formatDate(blog.created_at)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {blog.post_title}
              </h1>
            </div>
          </div>

          {/* Blog Meta */}
          {/* <div className="bg-gray-800/60 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-1">
                <Eye size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">1.2K views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart size={16} className="text-purple-400" />
                <span className="text-sm text-gray-400">85 likes</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">12 comments</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-purple-400 transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-purple-400 transition-colors">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div> */}

          {/* Blog Short Content */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <p className="text-gray-200 text-lg leading-relaxed">
              {blog.post_content_short}
            </p>
          </div>

          {/* Blog Full Content */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-hidden relative">
            <div
              className="prose prose-invert max-w-none"
              style={{
                maxHeight: expanded ? "none" : "16rem" /* 64px * 4 = 16rem */,
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: blog.post_content }} />
            </div>

            {/* Gradient overlay when collapsed */}
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
            )}

            {/* Read More/Less Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center space-x-2 px-6 py-2 rounded-full bg-purple-600 text-white border border-purple-500 hover:bg-purple-700 transition-colors"
              >
                <span>{expanded ? "Read Less" : "Read More"}</span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                openDialog();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-colors"
            >
              Check Pricing & Availability
            </button>
            <button
              onClick={() => {
                openDialog();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-lg border border-gray-700 text-gray-200 font-medium hover:bg-white/5 hover:text-purple-400 transition-colors"
            >
              Contact for Site Visit
            </button>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default BlogContent;
