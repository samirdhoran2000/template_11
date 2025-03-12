import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Building,
  Home,
  Phone,
  Star,
  Clock,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";


export default function PropertyHeader() {
  // Local state for property data and UI behaviors
  const [propertyData, setPropertyData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);


  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotate hero banner images every 5 seconds
  useEffect(() => {
    if (!loading && propertyData.hero_banner_img.desktop.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % propertyData.hero_banner_img.desktop.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, propertyData]);

  // Fetch property data from API on mount
  useEffect(() => {
    async function fetchPropertyData() {
      setLoading(true);
      try {
        // Use the specific API URL you provided
        const res = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );

        const data = await res.json();

        

        setPropertyData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching property data: ", error);
        setError("Failed to load property data. Using default data instead.");
        
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyData();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSetActive = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "HOME", to: "home" },
    { id: "about", label: "ABOUT", to: "about" },
    { id: "price", label: "PRICE", to: "price" },
    { id: "gallery", label: "GALLERY", to: "property-details" },
    { id: "amenities", label: "AMENITIES", to: "property-details" },
    { id: "layouts", label: "LAYOUTS", to: "layouts" },
    { id: "location", label: "LOCATION", to: "location" },
    { id: "contact", label: "CONTACT", to: "contact" },
  ];

  return (
    <>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        {/* Top info bar */}
        <div className="bg-black/80 backdrop-blur-md text-white py-2 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-purple-400" />
                <span className="text-sm">{propertyData.location}</span>
              </div>
              <div className="flex items-center">
                <Building size={16} className="mr-2 text-purple-400" />
                <span className="text-sm">{propertyData.builder_name}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-2 text-purple-400" />
                <span className="text-sm">{4.8}/5 (120 reviews)</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-purple-400" />
                <span className="text-sm">RERA Registered</span>
              </div>
              <a
                href="tel:+918181817136"
                className="text-sm hover:text-purple-400 transition-colors flex items-center"
              >
                <Phone size={16} className="mr-2" />
                +91 818181 7136
              </a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <header
          className={`bg-gray-900 border-b border-gray-800 sticky top-0 z-40 transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-purple-900/20" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-2 md:py-3">
              <div className="flex items-center space-x-3 md:space-x-6">
                {/* Logo */}
                <div className="relative">
                  {loading ? (
                    <div className="h-8 md:h-12 w-32 bg-gray-800 animate-pulse rounded"></div>
                  ) : (
                    <img
                      width={120}
                      height={48}
                      src={propertyData.logo}
                      alt={propertyData.property_name}
                      className="h-8 md:h-12 w-auto object-contain"
                    />
                  )}
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-xs font-semibold px-1 md:px-1.5 py-0.5 rounded-full text-[10px] md:text-xs">
                    New
                  </span>
                </div>

                {/* Builder logo (desktop only) */}
                {/* <div className="hidden lg:block border-l border-gray-700 pl-6">
                {loading ? (
                  <div className="h-8 w-32 bg-gray-800 animate-pulse rounded"></div>
                ) : (
                  <img
                    src={propertyData.builder_logo}
                    alt={propertyData.builder_name}
                    className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                )}
              </div> */}
              </div>

              <nav className="hidden md:block">
                <ul className="flex space-x-1 ">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.to}`}
                        onClick={() => handleSetActive(item.id)}
                        className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors relative whitespace-nowrap ${
                          activeSection === item.id
                            ? "text-purple-400"
                            : "text-gray-300 hover:text-purple-400"
                        }`}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400"></span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Desktop CTA buttons */}
              <div className="hidden md:flex space-x-2 lg:space-x-3">
                <a
                  href="tel:+918181817136"
                  className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-medium py-1.5 px-2 lg:px-3 rounded-md transition-colors flex items-center text-xs lg:text-sm"
                >
                  <Phone size={14} className="mr-1" />
                  <span>Call</span>
                </a>
                <button
                  onClick={() => {
                    openDialog();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-1.5 px-3 lg:px-4 rounded-md transition-colors text-xs lg:text-sm"
                >
                  Book Site Visit
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-200 focus:outline-none p-1"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 bg-gray-900 z-50 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <img
                  src={propertyData.logo}
                  alt={propertyData.property_name}
                  className="h-8 object-contain"
                />
                <span className="text-sm text-gray-300 font-medium">
                  {propertyData.property_name}
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-1 rounded-full hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X size={22} className="text-gray-300" />
              </button>
            </div>

            {/* Mobile navigation */}
            <div className="flex-grow overflow-y-auto">
              <ul className="divide-y divide-gray-800">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.to}`}
                      onClick={() => handleSetActive(item.id)}
                      className="w-full text-left py-3.5 px-5 flex justify-between items-center hover:bg-gray-800 active:bg-gray-700 transition-colors"
                    >
                      <span
                        className={
                          activeSection === item.id
                            ? "text-purple-400 font-medium"
                            : "text-gray-300"
                        }
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          activeSection === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile info section */}
              <div className="p-5 border-t border-gray-800 space-y-4 pb-safe">
                <div className="flex items-center">
                  <MapPin
                    size={16}
                    className="text-purple-400 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-sm">
                    {propertyData.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <Building
                    size={16}
                    className="text-purple-400 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-sm">
                    {propertyData.builder_name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star
                    size={16}
                    className="text-purple-400 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-sm">
                    {4.8}/5 (120 reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock
                    size={16}
                    className="text-purple-400 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-sm">
                    Last updated:{" "}
                    {new Date(
                      propertyData.property_last_updated
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Mobile CTA buttons */}
                <div className="pt-4 space-y-3 sticky bottom-0 pb-8 md:pb-6">
                  <button
                    onClick={() => {
                      openDialog();
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors active:from-purple-800 active:to-indigo-800"
                  >
                    Book Site Visit
                  </button>
                  <a
                    href="tel:+918181817136"
                    className="w-full flex justify-center items-center border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white active:bg-purple-700 font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    <Phone size={16} className="mr-2" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero section */}
        <section className="relative">
          {/* Image carousel */}
          <div className="h-screen w-full relative overflow-hidden">
            {loading ? (
              <div className="h-full w-full bg-gray-800 animate-pulse"></div>
            ) : (
              <>
                {/* Desktop images */}
                <div className="hidden md:block h-full w-full">
                  {propertyData.hero_banner_img.desktop.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${propertyData.property_name} - View ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile images */}
                <div className="md:hidden h-full w-full">
                  {propertyData.hero_banner_img.mobile.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${propertyData.property_name} - View ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Image indicators (only show if multiple images) */}
                {propertyData.hero_banner_img.desktop.length > 1 && (
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

          {/* Content overlay */}
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
                    onClick={() => {
                      openDialog();
                    }}
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
                {new Date(
                  propertyData.property_last_updated
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
}
