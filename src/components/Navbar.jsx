import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Building,
  Star,
  Phone,
  Calendar,
  ChevronDown,
  Clock,
} from "lucide-react";

function Navbar({ propertyData, loading, openDialog }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky header styling
 useEffect(() => {
   const handleScroll = () => {
     setScrolled(window.scrollY > 50);
   };
   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
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
    { id: "gallery", label: "GALLERY", to: "gallery" },
    { id: "amenities", label: "AMENITIES", to: "amenities" },
    { id: "layouts", label: "LAYOUTS", to: "layouts" },
    { id: "location", label: "LOCATION", to: "location" },
    { id: "contact", label: "CONTACT", to: "contact" },
  ];

  return (
    <>
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
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-1">
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
            <div className="hidden md:flex space-x-2 lg:space-x-3">
              <a
                href="tel:+918181817136"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-medium py-1.5 px-2 lg:px-3 rounded-md transition-colors flex items-center text-xs lg:text-sm"
              >
                <Phone size={14} className="mr-1" />
                <span>Call</span>
              </a>
              <button
                onClick={openDialog}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-1.5 px-3 lg:px-4 rounded-md transition-colors text-xs lg:text-sm"
              >
                Book Site Visit
              </button>
            </div>
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
              <div className="pt-4 space-y-3 sticky bottom-0 pb-8 md:pb-6">
                <button
                  onClick={openDialog}
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
    </>
  );
}

export default Navbar;
