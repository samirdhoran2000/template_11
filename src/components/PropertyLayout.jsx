import React, { useState, useEffect } from "react";
import {
  Building,
  LayoutGrid,
  Map,
  Loader,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  PenSquare,
  DollarSign,
  Ruler,
  IndianRupee,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const PropertyLayouts = () => {
  const [activeTab, setActiveTab] = useState("unit");
  const [unitLayouts, setUnitLayouts] = useState([]);
  const [floorLayouts, setFloorLayouts] = useState([]);
  const [masterLayouts, setMasterLayouts] = useState([]);
  const [pageHeadings, setPageHeadings] = useState({
    unit: "",
    floor: "",
    master: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);


    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch unit layouts
        const unitRes = await fetch(
          `${config.API_URL}/unit-layout?website=${config.SLUG_URL}`
        );
        const unitData = await unitRes.json();
        setUnitLayouts(unitData.unit_layout);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          unit: unitData.page[0].heading,
        }));

        // Fetch floor layouts
        const floorRes = await fetch(
          `${config.API_URL}/floor-layout?website=${config.SLUG_URL}`
        );
        const floorData = await floorRes.json();
        setFloorLayouts(floorData.Floor_plans);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          floor: floorData.page[0].heading,
        }));

        // Fetch master layouts
        const masterRes = await fetch(
          `${config.API_URL}/master-layout?website=${config.SLUG_URL}`
        );
        const masterData = await masterRes.json();
        setMasterLayouts(masterData.master_layout);
        setPageHeadings((prevHeadings) => ({
          ...prevHeadings,
          master: masterData.page[0].heading,
        }));

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch layouts data",err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    const layouts = getActiveLayouts();
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? layouts.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    const layouts = getActiveLayouts();
    setCurrentSlide((prevSlide) =>
      prevSlide === layouts.length - 1 ? 0 : prevSlide + 1
    );
  };

  const getActiveLayouts = () => {
    switch (activeTab) {
      case "unit":
        return unitLayouts;
      case "floor":
        return floorLayouts;
      case "master":
        return masterLayouts;
      default:
        return [];
    }
  };

  const getCurrentHeading = () => {
    return pageHeadings[activeTab] || "Property Layouts";
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[400px] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader size={36} className="text-purple-400 animate-spin" />
          <p className="text-gray-300">Loading layouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-8">
        <div className="bg-yellow-900/20 p-6 rounded-lg flex items-center gap-4">
          <AlertTriangle size={24} className="text-yellow-400" />
          <p className="text-yellow-400">{error}</p>
        </div>
      </div>
    );
  }

  const activeLayouts = getActiveLayouts();

  return (
    <>
      <div className="bg-gray-800 p-6 md:p-10 " id="layouts">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            {getCurrentHeading()}
          </h2>
          <div className="w-32 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 px-4">
          <div className="flex bg-gray-800 p-1 rounded-lg">
            <button
              className={`flex items-center gap-1 px-2 py-1 lg:px-4 lg:py-2 rounded-md transition text-s lg:text-base ${
                activeTab === "unit"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setActiveTab("unit");
                setCurrentSlide(0);
              }}
            >
              <Building size={18} />
              <span>Unit Layouts</span>
            </button>
            <button
              className={`flex items-center gap-1 px-2 py-1 lg:px-4 lg:py-2 rounded-md transition text-s lg:text-base ${
                activeTab === "floor"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setActiveTab("floor");
                setCurrentSlide(0);
              }}
            >
              <LayoutGrid size={18} />
              <span>Floor Plans</span>
            </button>
            <button
              className={`flex items-center gap-1 px-2 py-1 lg:px-4 lg:py-2 rounded-md transition text-s lg:text-base ${
                activeTab === "master"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setActiveTab("master");
                setCurrentSlide(0);
              }}
            >
              <Map size={18} />
              <span>Master Layout</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {activeLayouts.length === 0 ? (
            <div className="bg-gray-800/60 p-10 rounded-lg text-center">
              <p className="text-gray-300 text-lg">
                No layouts available in this category.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Layout Carousel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-800/60 p-6 md:p-10 rounded-lg">
                {/* Image Side */}
                <div className="relative group">
                  <div className="aspect-w-4 aspect-h-3 bg-black/80 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={activeLayouts[currentSlide]?.layout_image}
                      alt={activeLayouts[currentSlide]?.layout_name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <button
                    className="absolute top-2 right-2 p-2 bg-black/80 rounded-full opacity-80 hover:opacity-100 transition text-gray-200 hover:text-white"
                    onClick={() =>
                      setExpandedImage(
                        activeLayouts[currentSlide]?.layout_image
                      )
                    }
                  >
                    <Maximize2 size={20} />
                  </button>
                  {activeLayouts.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition"
                        onClick={handlePrev}
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition"
                        onClick={handleNext}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Details Side */}
                <div className="flex flex-col">
                  {activeTab === "unit" && (
                    <>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                        {activeLayouts[currentSlide]?.unit_layout_heading ||
                          activeLayouts[currentSlide]?.layout_name}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 rounded-full bg-black/80 text-purple-400">
                            <PenSquare size={18} />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Layout Type</p>
                            <p className="font-medium">
                              {activeLayouts[currentSlide]?.layout_name}
                            </p>
                          </div>
                        </div>

                        {activeLayouts[currentSlide]
                          ?.unit_layout_carpet_area && (
                          <div className="flex items-center gap-3 text-gray-300">
                            <div className="p-2 rounded-full bg-black/80 text-purple-400">
                              <Ruler size={18} />
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">
                                Carpet Area
                              </p>
                              <p className="font-medium">
                                {
                                  activeLayouts[currentSlide]
                                    ?.unit_layout_carpet_area
                                }
                              </p>
                            </div>
                          </div>
                        )}

                        {activeLayouts[currentSlide]?.unit_layout_price && (
                          <div className="flex items-center gap-3 text-gray-300">
                            <div className="p-2 rounded-full bg-black/80 text-purple-400">
                              <IndianRupee size={18} />
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Price</p>
                              <p className="font-medium">
                                {activeLayouts[currentSlide]?.unit_layout_price}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8">
                        <button
                          onClick={() => {
                            openDialog();
                          }}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <span>Schedule a Site Visit</span>
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === "floor" && (
                    <>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                        {activeLayouts[currentSlide]?.layout_name ||
                          "Floor Plan"}
                      </h3>
                      <p className="text-gray-300 mb-6">
                        Detailed floor plan showing the layout and arrangement
                        of the property.
                      </p>
                      <div className="mt-auto">
                        <button
                          onClick={() => {
                            openDialog();
                          }}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <span>Get Floor Plan</span>
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === "master" && (
                    <>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                        Master Layout Plan
                      </h3>
                      <p className="text-gray-300 mb-6">
                        Comprehensive master plan of the entire property
                        development.
                      </p>
                      <div className="mt-auto">
                        <button
                          onClick={() => {
                            openDialog();
                          }}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <span>Get Master Plan</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pagination Dots */}
              {activeLayouts.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {activeLayouts.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index
                          ? "bg-purple-600 w-4"
                          : "bg-gray-700"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Image Modal */}
        {expandedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              <img
                src={expandedImage}
                alt="Expanded view"
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black/80 rounded-full text-white"
                onClick={() => setExpandedImage(null)}
              >
                <ArrowLeft size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default PropertyLayouts;
