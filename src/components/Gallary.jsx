import React, { useState, useEffect,useRef } from "react";
import {
  Loader,
  Maximize,
 
  
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
} from "lucide-react";
import config from "../../config";
// import Lightbox from "./Lightbox";

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

      {/* Gallery Grid with fixed height and scroll */}
      <div className="h-96 overflow-y-auto pr-2 custom-scrollbar">
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
      </div>

      {/* Lightbox Component */}
      {selectedImage && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
};const Lightbox = ({ images, currentIndex, setCurrentIndex, closeLightbox }) => {
  const lightboxContentRef = useRef(null);
  const selectedImage = images[currentIndex];

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentIndex]);

  // Handle global click event to close lightbox when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        lightboxContentRef.current &&
        !lightboxContentRef.current.contains(e.target) &&
        !e.target.closest(".lightbox-control")
      ) {
        closeLightbox();
      }
    };

    // Add delay to prevent immediate closing
    setTimeout(() => {
      window.addEventListener("click", handleGlobalClick);
    }, 100);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [closeLightbox]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      {/* Container with half screen height */}
      <div className="bg-gray-800 rounded-lg w-1/2 h-1/2 max-h-[50vh] relative flex flex-col">
        {/* Prominently visible close button */}
        <div className="absolute top-2 right-2 z-10">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full lightbox-control flex items-center justify-center"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>
        </div>

        {/* Image viewer with navigation */}
        <div
          ref={lightboxContentRef}
          className="flex-1 relative flex items-center justify-center overflow-hidden p-4"
        >
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-purple-600 transition-colors duration-300 z-10 lightbox-control"
            onClick={goToPrevious}
          >
            <ChevronLeft size={20} />
          </button>

          <img
            src={selectedImage.photo}
            alt="Enlarged view"
            className="max-h-full max-w-full object-contain rounded-lg"
          />

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 p-2 rounded-full text-white hover:bg-purple-600 transition-colors duration-300 z-10 lightbox-control"
            onClick={goToNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Image counter */}
        <div className="text-gray-300 bg-gray-800/60 px-4 py-2 flex items-center justify-center">
          <Camera size={16} className="mr-2" />
          <span>
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto p-2 bg-gray-900">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`w-12 h-12 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                idx === currentIndex ? "border-purple-500" : "border-gray-700"
              }`}
              onClick={() => setCurrentIndex(idx)}
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
    </div>
  );
};

export default Gallery;
