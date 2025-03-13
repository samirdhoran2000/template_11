import React, { useState, useEffect } from "react";
import {
  MapPin,
  MapIcon,
  Building,
  Clock,
  Navigation,
  Car,
  Plane,
  Train,
  Briefcase,
  Home,
  School,
  ShoppingBag,
  Coffee,
  Loader,
} from "lucide-react";
import config from "../../config";

const Location = () => {
  const [locationData, setLocationData] = useState({
    heading: "",
    subheading: null,
    map: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-map?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const renderMap = () => {
    return { __html: locationData.map };
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
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-8" id="location">
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-3">
          <MapIcon size={28} className="text-purple-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {locationData.heading || "Prime Location"}
          </h2>
        </div>
        {locationData.subheading && (
          <p className="text-gray-300 text-center max-w-2xl">
            {locationData.subheading}
          </p>
        )}
        <div className="w-24 sm:w-32 h-1 bg-purple-600 mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="bg-gray-800/60 rounded-lg overflow-hidden shadow-lg border border-gray-800 w-full h-64 md:h-96">
            {locationData.map ? (
              <div
                dangerouslySetInnerHTML={renderMap()}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                <MapIcon size={48} />
                <p className="ml-2">Map not available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="#contact"
          className="px-8 py-3 w-full sm:w-56 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 justify-center mx-auto"
        >
          <MapPin size={18} />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};

export default Location;
