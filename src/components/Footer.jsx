import React, { useState, useEffect } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  AlertTriangle,
  Loader,
} from "lucide-react";
import config from "../../config";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/footer?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Map social icon names to Lucide components
  const getSocialIcon = (iconName) => {
    const iconMap = {
      "fab fa-facebook-f": <Facebook size={18} />,
      "fab fa-linkedin-in": <Linkedin size={18} />,
      "fab fa-instagram": <Instagram size={18} />,
      "fab fa-youtube": <Youtube size={18} />,
      "fab fa-twitter": <Twitter size={18} />,
    };

    return iconMap[iconName] || <AlertTriangle size={18} />;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[200px]">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-8">
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
          <p>Failed to load footer data: {error}</p>
        </div>
      </div>
    );
  }

  const { social_icons, g_setting } = footerData;

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main footer section with all elements in one row */}
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-6">
          {/* Logo */}
          <div className="w-full md:w-auto">
            {g_setting.logo && (
              <img
                src={g_setting.logo}
                alt="Buy India Homes Logo"
                className="h-10 w-auto mb-4"
              />
            )}
            {/* Social icons below logo on mobile, next to logo on desktop */}
            <div className="flex space-x-3 mb-6 md:mb-0">
              {social_icons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 text-gray-300 hover:text-white"
                >
                  {getSocialIcon(icon.social_icon)}
                </a>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div className="w-full md:w-auto">
            <h3 className="text-white text-base font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#property-details"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  href="#about-builder"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  Career
                </a>
              </li> */}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="w-full md:w-auto">
            <h3 className="text-white text-base font-medium mb-3">
              Contact Us
            </h3>
            <ul className="space-y-2">
              {/* <li className="flex items-start">
                <MapPin
                  size={16}
                  className="text-purple-400 mt-1 mr-2 flex-shrink-0"
                />
                <span className="text-gray-400 text-sm">
                  {g_setting.footer_address}
                </span>
              </li> */}
              {/* <li className="flex items-center">
                <Mail
                  size={16}
                  className="text-purple-400 mr-2 flex-shrink-0"
                />
                <a
                  href={`mailto:${g_setting.footer_email}`}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  {g_setting.footer_email}
                </a>
              </li> */}
              <li className="flex items-center">
                <Phone
                  size={16}
                  className="text-purple-400 mr-2 flex-shrink-0"
                />
                <a
                  href={`tel:${g_setting.footer_phone}`}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  {g_setting.footer_phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-black/80 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-gray-500 text-xs mb-4">
            {g_setting.footer_disclamer}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-xs">
              {g_setting.footer_copyright}
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 text-gray-300 hover:text-white"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
