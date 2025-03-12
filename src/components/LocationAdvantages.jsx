import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MapPin,
  Loader,
  LocateFixed,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Train,
  Building,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Landmark,
  TrainFront,
  Plane,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  // Unconditional hook calls
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel states
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const slideContainerRef = useRef(null);

  // Responsive visible count
  const [visibleCount, setVisibleCount] = useState(3);

  // Contact dialog state
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Fetch data (always called)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-advantages?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update visibleCount on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prepare fallback values so hooks are always called
  const locationAdvantages = data?.location_advantages || [];
  const heading = data?.page?.[0]?.heading || "Location Highlights";

  // Build an extended array for infinite looping (useMemo is now always called)
  const extendedLocations = useMemo(() => {
    if (locationAdvantages.length === 0) return [];
    return [
      locationAdvantages[locationAdvantages.length - 1],
      ...locationAdvantages,
      locationAdvantages[0],
    ];
  }, [locationAdvantages]);

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(extendedLocations.length - 2);
      setTimeout(() => setTransitionEnabled(true), 50);
    } else if (currentIndex === extendedLocations.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
      setTimeout(() => setTransitionEnabled(true), 50);
    }
  };

  // Touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - e.targetTouches[0].clientX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (touchStart - touchEnd > 75) {
      nextSlide();
    } else if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Mouse events for drag
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
    if (slideContainerRef.current) {
      slideContainerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
    const diff = touchStart - e.clientX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (touchStart - touchEnd > 75) {
      nextSlide();
    } else if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
    if (slideContainerRef.current) {
      slideContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      if (slideContainerRef.current) {
        slideContainerRef.current.style.cursor = "grab";
      }
    }
  };

  // Auto-advance the carousel every 5 seconds if not dragging
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  // Calculate transform value for the carousel container
  const transformValue = isDragging
    ? `translateX(calc(-${
        (currentIndex * 100) / visibleCount
      }% - ${dragOffset}px))`
    : `translateX(-${(currentIndex * 100) / visibleCount}%)`;

  // Adjust active dot index to exclude clones
  const getActiveDotIndex = () => {
    if (currentIndex === 0) return locationAdvantages.length - 1;
    if (currentIndex === extendedLocations.length - 1) return 0;
    return currentIndex - 1;
  };

  // Map location names to corresponding icons
  const getLocationIcon = (locationName) => {
    const iconMap = {
      "PUNE - BANGALORE": <LocateFixed size={24} className="text-purple-400" />,
      "Metro Station": <Train size={24} className="text-purple-400" />,
      "Balewadi Stadium": <Building size={24} className="text-purple-400" />,
      "Phoenix Market City": (
        <ShoppingBag size={24} className="text-purple-400" />
      ),
      Hinjewadi: <Briefcase size={24} className="text-purple-400" />,
      "Pune University": (
        <GraduationCap size={24} className="text-purple-400" />
      ),
      Shivajinagar: <Landmark size={24} className="text-purple-400" />,
      "Pune Station": <TrainFront size={24} className="text-purple-400" />,
      "Pune Airport": <Plane size={24} className="text-purple-400" />,
    };

    return (
      iconMap[locationName] || <MapPin size={24} className="text-purple-400" />
    );
  };

  // Render based on loading, error, or main content
  return (
    <>
      {loading ? (
        <div className="bg-gray-900 min-h-[400px] flex items-center justify-center">
          <Loader size={30} className="text-purple-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-gray-900 p-8 rounded-lg">
          <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
            <p>Failed to load location data: {error}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Carousel Navigation Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-medium text-gray-200">
                Strategic Location{" "}
                <span className="text-purple-400">Advantages</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-800/60 border border-gray-700 text-gray-300 transition-colors duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-800/60 border border-gray-700 text-gray-300 transition-colors duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div
              className="relative overflow-hidden"
              ref={slideContainerRef}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div
                className="flex"
                style={{
                  transform: transformValue,
                  transition: isDragging
                    ? "none"
                    : transitionEnabled
                    ? "transform 500ms ease-in-out"
                    : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {extendedLocations.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-none px-3 transition-transform ${
                      visibleCount === 1
                        ? "w-full"
                        : visibleCount === 2
                        ? "w-1/2"
                        : "w-full sm:w-1/2 lg:w-1/3"
                    }`}
                    style={{
                      opacity:
                        index >= currentIndex &&
                        index < currentIndex + visibleCount
                          ? 1
                          : 0.3,
                      transform:
                        index >= currentIndex &&
                        index < currentIndex + visibleCount
                          ? "scale(1)"
                          : "scale(0.9)",
                      transition:
                        "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="bg-gray-800/60 rounded-lg overflow-hidden h-full border border-gray-800 group hover:border-purple-500 transition-colors duration-300">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center mr-4">
                            <MapPin size={24} className="text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-gray-100 group-hover:text-purple-400 transition-colors duration-300">
                              {item.location}
                            </h4>
                            <p className="text-gray-400 flex items-center">
                              <MapPin size={14} className="mr-1" />{" "}
                              {item.distance}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6 flex-grow">
                          {item.description}
                        </p>

                        <div className="mt-auto">
                          <a
                            href="#"
                            className="inline-flex items-center text-purple-400 hover:text-purple-400"
                          >
                            View on map{" "}
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4">
              {locationAdvantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index + 1)}
                  className={`h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
                    getActiveDotIndex() === index
                      ? "bg-gray-800"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Enquiry Button */}
            <div className="mt-10 text-center">
              <button
                onClick={openDialog}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105"
              >
                Enquiry About All Locations
              </button>
            </div>
          </div>
        </div>
      )}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default LocationAdvantages;
