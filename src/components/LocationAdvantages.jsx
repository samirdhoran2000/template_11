import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);


  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Map location names to corresponding icons
  // const getLocationIcon = (locationName) => {
  //   const iconMap = {
  //     "PUNE - BANGALORE": <LocateFixed size={24} className="text-purple-400" />,
  //     "Metro Station": <Train size={24} className="text-purple-400" />,
  //     "Balewadi Stadium": <Building size={24} className="text-purple-400" />,
  //     "Phoenix Market City": (
  //       <ShoppingBag size={24} className="text-purple-400" />
  //     ),
  //     Hinjewadi: <Briefcase size={24} className="text-purple-400" />,
  //     "Pune University": (
  //       <GraduationCap size={24} className="text-purple-400" />
  //     ),
  //     Shivajinagar: <Landmark size={24} className="text-purple-400" />,
  //     "Pune Station": <TrainFront size={24} className="text-purple-400" />,
  //     "Pune Airport": <Plane size={24} className="text-purple-400" />,
  //   };

  //   return (
  //     iconMap[locationName] || <MapPin size={24} className="text-purple-400" />
  //   );
  // };
  const getLocationIcon = () => {
    // const iconMap = {
    //   "PUNE - BANGALORE": <LocateFixed size={24} className="text-purple-400" />,
    //   "Metro Station": <Train size={24} className="text-purple-400" />,
    //   "Balewadi Stadium": <Building size={24} className="text-purple-400" />,
    //   "Phoenix Market City": (
    //     <ShoppingBag size={24} className="text-purple-400" />
    //   ),
    //   Hinjewadi: <Briefcase size={24} className="text-purple-400" />,
    //   "Pune University": (
    //     <GraduationCap size={24} className="text-purple-400" />
    //   ),
    //   Shivajinagar: <Landmark size={24} className="text-purple-400" />,
    //   "Pune Station": <TrainFront size={24} className="text-purple-400" />,
    //   "Pune Airport": <Plane size={24} className="text-purple-400" />,
    // };

    return (
      <MapPin size={24} className="text-purple-400" />
    );
  };

  // Fetch data from API
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update visible count based on screen size
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

    // Initial call
    handleResize();

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Navigation functions
  const goToNext = () => {
    if (data && data.location_advantages) {
      setActiveIndex((prevIndex) =>
        prevIndex + visibleCount >= data.location_advantages.length
          ? 0
          : prevIndex + 1
      );
    }
  };

  const goToPrev = () => {
    if (data && data.location_advantages) {
      setActiveIndex((prevIndex) =>
        prevIndex === 0
          ? Math.max(0, data.location_advantages.length - visibleCount)
          : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[400px] flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg">
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const heading = data.page[0]?.heading || "Location Highlights";
  const locationAdvantages = data.location_advantages || [];

  return (<>
    <div className="bg-gray-900 p-8" >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-medium text-gray-200">
            Strategic Location{" "}
            <span className="text-purple-400">Advantages</span>
          </h3>

          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-800/60 border border-gray-700 text-gray-300 transition-colors duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-800/60 border border-gray-700 text-gray-300 transition-colors duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Locations Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`,
              width: `${(locationAdvantages.length / visibleCount) * 100}%`,
            }}
          >
            {locationAdvantages.map((item) => (
              <div
                key={item.id}
                className="px-3"
                style={{
                  width: `${(100 / locationAdvantages.length) * visibleCount}%`,
                }}
              >
                <div className="bg-gray-800/60 rounded-lg overflow-hidden h-full border border-gray-800 group hover:border-purple-500 transition-colors duration-300">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center mr-4">
                        {getLocationIcon(item.location)}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-100 group-hover:text-purple-400 transition-colors duration-300">
                          {item.location}
                        </h4>
                        <p className="text-gray-400 flex items-center">
                          <MapPin size={14} className="mr-1" /> {item.distance}
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
                        View on map <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <button
          onClick={()=>{openDialog()}}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105">
            Enquiry About All Locations
          </button>
        </div>
      </div>
    </div>
    <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default LocationAdvantages;
