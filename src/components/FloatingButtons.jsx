import React, { useState } from "react";
import { MessageCircle, Phone, User } from "lucide-react";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Button data for easy mapping
  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      href: "https://wa.me/918181817136?text=I%20would%20like%20to%20chat%20with%20you",
      color:
        "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800",
    },
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: "Call",
      href: "tel:+918181817136",
      color:
        "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800",
    },
    {
      id: "contact",
      icon: <User size={20} />,
      label: "Contact",
      href: "#contact",
      color:
        "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800",
    },
  ];

  return (
    <div className="fixed bottom-12 right-8 z-50 flex flex-col-reverse items-end gap-4">
      {/* Expanded buttons */}
      {isExpanded && (
        <div className="flex flex-col-reverse gap-3 transition-all duration-300 ease-in-out">
          {buttons.map((button) => (
            <a
              key={button.id}
              href={button.href}
              className={`flex items-center gap-2 p-3 rounded-full bg-gray-900 shadow-lg text-gray-100 transition-all duration-300 hover:bg-gray-800 border border-gray-700`}
              target={button.id === "whatsapp" ? "_blank" : "_self"}
              rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
            >
              <span className="text-sm font-medium">{button.label}</span>
              <span
                className={`flex items-center justify-center p-2 rounded-full bg-gradient-to-r ${button.color}`}
              >
                {button.icon}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={toggleExpand}
        className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-500 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 ease-in-out transform hover:scale-105"
        aria-label="Toggle floating menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform duration-300 ${
            isExpanded ? "rotate-45" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;
