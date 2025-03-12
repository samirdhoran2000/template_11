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
import AboutBuilder from "./AboutBuilder";

const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, []);

  // Handle hash changes to sync activeTab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the '#' from the hash
      if (["overview", "amenities", "location", "gallery"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
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
      <AboutBuilder
        heading={propertyData.property_name}
        htmlContent={propertyData?.property_description}
      />
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10"></div>
          <img
            src={propertyData.og_image}
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
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Property Quick Stats */}
          <div className="bg-gray-800/60 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm mb-10 transform hover:-translate-y-1 transition-all duration-300">
            {/* ... (unchanged) */}
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-800 mb-8" id="property-details">
            <nav className="flex flex-wrap space-x-1 md:space-x-8">
              <button
                onClick={() => {
                  setActiveTab("overview");
                  window.location.hash = "overview";
                }}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "overview"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveTab("amenities");
                  window.location.hash = "amenities";
                }}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "amenities"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Amenities
              </button>
              <button
                onClick={() => {
                  setActiveTab("location");
                  window.location.hash = "location";
                }}
                className={`py-4 px-3 font-medium text-sm border-b-2 ${
                  activeTab === "location"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
              >
                Location
              </button>
              <button
                onClick={() => {
                  setActiveTab("gallery");
                  window.location.hash = "gallery";
                }}
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
            <div id="overview">
              {activeTab === "overview" && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-8 bg-purple-600 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-white">
                      Property Overview
                    </h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    {/* Wrap the full description in a scrollable container */}
                    <div
                      className="max-h-[300px] overflow-y-auto"
                      dangerouslySetInnerHTML={createMarkup(
                        propertyData.property_description
                      )}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-1">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300 max-w-full sm:max-w-xl w-full mx-auto">
                      <h3 className="text-white font-medium mb-4 flex items-center">
                        <Building size={18} className="text-purple-400 mr-2" />
                        Property Specifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-gray-400 mr-4">
                            Property ID:
                          </span>
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
            </div>
            <div id="amenities">
              {activeTab === "amenities" && <Amenities />}
            </div>
            <div id="location">
              {activeTab === "location" && (
                <Location
                  mapIframe={propertyData.property_map}
                  propertyName={propertyData.property_name}
                />
              )}
            </div>
            <div id="gallery">{activeTab === "gallery" && <Gallary />}</div>
          </div>

          {/* CTA Section */}
          <div className="relative mt-12 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
              style={{
                backgroundImage: propertyData?.og_image
                  ? `url('${propertyData?.og_image}')`
                  : "none",
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
                  onClick={openDialog}
                  className="px-6 py-3 bg-white hover:bg-white/80 text-gray-900 font-medium rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Get Brochure
                </button>
                <button
                  onClick={openDialog}
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
