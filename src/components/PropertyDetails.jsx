import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Home,
  DollarSign,
  Building,
  Calendar,
  Layers,
  Clock,
  Star,
  User,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Download,
  CalendarClock,
  Loader,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
} from "lucide-react";
import Amenities from "./Amenities";
import Location from "./Location";
import Gallary from "./Gallary";
import { ContactDialog } from "./Contact";
import config from "../../config";

const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/propert-details?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setPropertyData(data.property_details);

        // Check if the description is long enough to warrant a "Read More" button
        // This is a rough estimate - you might need to adjust based on your actual content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.property_details.property_description;
        const textContent = tempDiv.textContent || tempDiv.innerText;
        setIsDescriptionLong(textContent.length > 300);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, []);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const getTruncatedDescription = (htmlContent) => {
    if (!htmlContent || !isDescriptionLong) return { __html: htmlContent };

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const paragraphs = tempDiv.getElementsByTagName("p");

    // Only keep the first paragraph or first 300 characters
    if (paragraphs.length > 0) {
      tempDiv.innerHTML = paragraphs[0].outerHTML;
    } else {
      const textContent = tempDiv.textContent || tempDiv.innerText;
      tempDiv.textContent = textContent.substring(0, 300) + "...";
    }

    return { __html: tempDiv.innerHTML };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-purple-400 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-yellow-900/20 p-6 rounded-xl max-w-md w-full text-center">
          <AlertCircle size={40} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"></div>
          <img
            src={
              propertyData.og_image 
              
            }
            alt={propertyData.property_name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                {propertyData.property_status}
              </span>
              <span className="px-3 py-1 bg-yellow-900/20 text-yellow-400 text-sm font-medium rounded-full">
                {propertyData.property_type}
              </span>
              <span className="px-3 py-1 bg-gray-800/60 text-gray-300 text-sm font-medium rounded-full flex items-center">
                <Calendar size={14} className="mr-1" />
                Last Updated: {propertyData.last_updated}
              </span>
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {propertyData.property_name}
            </h1>
            {/* <div className="mt-2 flex items-center text-gray-300">
            <MapPin size={16} className="mr-1 text-purple-400" />
            <span>Balewadi, Pune</span>
          </div> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Property Quick Stats */}
          <div className="bg-gray-800/60 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm mb-10 transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-800/60 transition-colors duration-300 group">
                  <div className="flex items-center text-gray-400 mb-2">
                    <IndianRupee
                      size={18}
                      className="mr-2 text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <span>Starting Price</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    ₹ {propertyData.property_price} Cr*
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Premium Commercial Space
                  </div>
                </div>

                {/* Size */}
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-800/60 transition-colors duration-300 group">
                  <div className="flex items-center text-gray-400 mb-2">
                    <Layers
                      size={18}
                      className="mr-2 text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <span>Area Range</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {propertyData.property_price_range}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Built-up Area
                  </div>
                </div>

                {/* Property Type */}
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-800/60 transition-colors duration-300 group">
                  <div className="flex items-center text-gray-400 mb-2">
                    <Building
                      size={18}
                      className="mr-2 text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <span>Property Type</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {propertyData.property_type_price_range}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    By {propertyData.builder_name}
                  </div>
                </div>
              </div>

              {/* Builder Info */}
              <div className="mt-6 p-6 bg-black/80 rounded-lg border border-gray-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-purple-600/20 flex items-center justify-center mr-4 border border-purple-500">
                      <Briefcase size={24} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {propertyData.builder_name}
                      </h3>
                      <p className="text-gray-400 text-sm">Premium Developer</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        openDialog();
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium rounded-lg transition duration-200 flex items-center"
                    >
                      <Phone size={16} className="mr-2" />
                      Contact
                    </button>
                    <button
                      onClick={() => {
                        openDialog();
                      }}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg transition duration-200 flex items-center border border-gray-700"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Visit US
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-800 mb-8" id="property-details">
            <nav className="flex flex-wrap space-x-1 md:space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "overview"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("amenities")}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "amenities"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Amenities
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "location"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Location
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "gallery"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Gallery
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/60 rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-sm mb-8">
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-purple-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Property Overview
                  </h2>
                </div>

                <div className="prose prose-invert max-w-none text-gray-300">
                  <div
                    dangerouslySetInnerHTML={
                      showFullDescription || !isDescriptionLong
                        ? createMarkup(propertyData.property_description)
                        : getTruncatedDescription(
                            propertyData.property_description
                          )
                    }
                  />

                  {isDescriptionLong && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="mt-4 flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {showFullDescription ? (
                        <>
                          <ChevronUp size={18} className="mr-1" />
                          Read Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} className="mr-1" />
                          Read More
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-1">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300 max-w-full sm:max-w-xl w-full mx-auto">
                    <h3 className="text-white font-medium mb-4 flex items-center">
                      <Building size={18} className="text-purple-400 mr-2" />
                      Property Specifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400 mr-4">Property ID:</span>
                        <span className="text-gray-200 font-medium">
                          {propertyData.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400 mr-4">
                          Property Type:
                        </span>
                        <span className="text-gray-200 font-medium">
                          {propertyData.property_type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400 mr-4">Developer:</span>
                        <span className="text-gray-200 font-medium">
                          {propertyData.builder_name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400 mr-4">
                          Last Updated:
                        </span>
                        <span className="text-gray-200 font-medium">
                          {propertyData.last_updated}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-400 mr-4">Status:</span>
                        <span className="text-gray-200 font-medium">
                          {propertyData.property_status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "amenities" && <Amenities />}

            {activeTab === "location" && (
              <Location
                mapIframe={propertyData.property_map}
                propertyName={propertyData.property_name}
              />
            )}

            {activeTab === "gallery" && <Gallary />}
          </div>

          {/* CTA Section */}
          <div className="relative mt-12 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
              style={{
                backgroundImage: propertyData?.og_image
                  ? `url('${propertyData?.og_image}')`
                  : "none", // Handle null/undefined
              }}
            ></div>

            <div className="relative z-10 p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Secure Your Space in {propertyData.property_name}?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Don't miss this opportunity to invest in Pune's premium
                commercial property. Contact us today for exclusive offers and
                detailed information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    openDialog();
                  }}
                  className="px-6 py-3 bg-white hover:bg-white/80 text-gray-900 font-medium rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Get Brochure
                </button>
                <button
                  onClick={() => {
                    openDialog();
                  }}
                  className="px-6 py-3 bg-black/80 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center hover:bg-black"
                >
                  <CalendarClock size={18} className="mr-2" />
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default PropertyDetails;
