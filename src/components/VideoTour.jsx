import React, { useState, useEffect } from "react";
import {
  Play,
  Youtube,
  Loader,
  AlertCircle,
  Video,
  ExternalLink,
} from "lucide-react";
import config from "../../config";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/video?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setVideos(data.property_videos);
        setHeading(data.page.heading);

        // Set the first video as active if available
        if (data.property_videos && data.property_videos.length > 0) {
          setActiveVideo(data.property_videos[0]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openModal = (video) => {
    setActiveVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} />
            <p>Failed to load videos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 text-center">
        <div className="bg-gray-800/60 p-6 rounded-lg inline-block">
          <Video size={40} className="text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">
            No video tours available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 ">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {heading || "Property Virtual Tour"}
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Experience an immersive virtual tour of our premium property.
            Explore the spaces and amenities from the comfort of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800/60 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden group">
                <img
                  src={`https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-black/70 flex items-center justify-center">
                  <button
                    onClick={() => openModal(video)}
                    className="bg-purple-600 text-white h-16 w-16 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-white/50 group"
                  >
                    <Play
                      size={30}
                      className="ml-1 group-hover:text-purple-400"
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Youtube size={20} className="text-purple-400" />
                    <span className="text-gray-300">Virtual Tour</span>
                  </div>
                  <button
                    onClick={() => openModal(video)}
                    className="px-4 py-2 text-gray-300 flex items-center gap-2 rounded-lg border border-gray-700 hover:border-purple-500 hover:text-purple-400 transition-colors duration-300"
                  >
                    <span>Watch Now</span>
                    <Play size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`https://www.youtube.com/watch?v=${videos[0]?.youtube_video_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>View on YouTube</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-2 rounded-lg w-full max-w-4xl">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtube_video_id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-md"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTour;
