import React, { useState, useEffect } from "react";
import { Home, Building, Clock } from "lucide-react";

function HeroSection({ propertyData, loading, error, openDialog }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate hero images every 5 seconds
  useEffect(() => {
    if (!loading && propertyData.hero_banner_img?.desktop?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % propertyData.hero_banner_img.desktop.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, propertyData]);

  return (
    <section className="relative">
      <div className="h-screen w-full relative overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-gray-800 animate-pulse"></div>
        ) : (
          <>
            <div className="hidden md:block h-full w-full">
              {propertyData.hero_banner_img?.desktop?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="md:hidden h-full w-full">
              {propertyData.hero_banner_img?.mobile?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {propertyData.hero_banner_img?.desktop?.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {propertyData.hero_banner_img.desktop.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 flex flex-col justify-center items-center text-white px-4">
        <div className="text-center max-w-4xl">
          {loading ? (
            <>
              <div className="h-12 w-64 bg-gray-800 animate-pulse rounded mx-auto mb-4"></div>
              <div className="h-6 w-48 bg-gray-800 animate-pulse rounded mx-auto mb-6"></div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {propertyData.hero_banner_heading}
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                {propertyData.hero_banner_subheading}
              </p>
            </>
          )}
          <div className="bg-gray-900/80 backdrop-blur-md text-gray-100 rounded-lg p-5 mt-6 border border-gray-800 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 border-b md:border-b-0 md:border-r border-gray-700">
                <Home className="text-purple-400 mb-2" size={24} />
                <h3 className="font-medium">
                  {propertyData.property_type_price_range_text}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {propertyData.property_area_min_max}
                </p>
              </div>
              <div className="flex flex-col items-center p-3">
                <Building className="text-purple-400 mb-2" size={24} />
                <h3 className="font-medium">{propertyData.builder_name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {propertyData.location}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={openDialog}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors flex-1"
              >
                Book Site Visit
              </button>
              <a
                href="#price"
                className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-medium py-2.5 px-6 rounded-md transition-colors flex-1"
              >
                View Details
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <span className="text-purple-400 mr-2">★</span>
              <span className="text-sm">RERA Approved</span>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <span className="text-purple-400 mr-2">★</span>
              <span className="text-sm">Bank Approved</span>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <span className="text-purple-400 mr-2">★</span>
              <span className="text-sm">Special Offer</span>
            </div>
          </div>
          {error && (
            <div className="mt-4 text-yellow-400 text-sm bg-yellow-900/20 p-2 rounded-md">
              {error}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-8 flex items-center justify-center">
            <Clock size={12} className="mr-1" />
            Last Updated:{" "}
            {new Date(propertyData.property_last_updated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
