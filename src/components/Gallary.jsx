import React, { useState, useEffect } from "react";
import {
  Loader,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Image as ImageIcon,
  Maximize,
  ImagePlus,
} from "lucide-react";
import config from "../../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/gallary?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const data = await response.json();
        setImages(data.property_photos);
        setHeading(data.page[0].heading);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

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
          <p>Failed to load gallery: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg" id="gallary">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          {heading || "Property Gallery"}
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4">
          Explore the stunning views of Ceratec Tower 1o8
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            onClick={() => openLightbox(image, index)}
          >
            <img
              src={image.photo}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Maximize size={24} className="text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {/* <div className="mt-8 text-center">
        <button className="px-8 py-3 rounded-full border border-purple-500 text-purple-400 font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center mx-auto">
          <ImagePlus size={18} className="mr-2" />
          View All Images
        </button>
      </div> */}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-center items-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-purple-400 p-2 rounded-full bg-gray-800/60"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-4xl max-h-[80vh] flex justify-center items-center">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-purple-600 transition-colors duration-300 z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={selectedImage.photo}
              alt="Enlarged view"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-purple-600 transition-colors duration-300 z-10"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-gray-300 mt-4 bg-gray-800/60 px-4 py-2 rounded-lg flex items-center">
            <Camera size={16} className="mr-2" />
            <span>
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 max-w-4xl">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                  idx === currentIndex ? "border-purple-500" : "border-gray-700"
                }`}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(idx);
                }}
              >
                <img
                  src={img.photo}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
