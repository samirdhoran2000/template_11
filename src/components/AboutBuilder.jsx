import React, { useRef } from "react";
import { ChevronDown } from "lucide-react";

const AboutBuilder = ({ heading, htmlContent, maxHeight = "300px" }) => {
  const contentRef = useRef(null);

  // Function to safely render HTML content
  const createMarkup = (content) => {
    return { __html: content };
  };

  const scrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({
        top: 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-800 p-6 border border-gray-800 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Gradient Accent Line */}
        <div className="flex items-center mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">{heading}</h2>
        </div>

        {/* Content Area with Custom Scrollable Container */}
        <div className="relative">
          <div
            ref={contentRef}
            className="text-gray-300 overflow-y-auto pr-4 custom-scrollbar"
            style={{
              maxHeight,
              scrollbarWidth: "thin",
              scrollbarColor: "#374151 #1F2937",
            }}
            dangerouslySetInnerHTML={createMarkup(htmlContent)}
          />

          {/* Scroll indicator */}
          <button
            onClick={scrollDown}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/60 hover:bg-white/50 transition-colors duration-200 group"
            aria-label="Scroll down"
          >
            <ChevronDown
              size={18}
              className="text-gray-400 group-hover:text-gray-900"
            />
          </button>

          {/* Gradient overlay for bottom fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 via-black/40 to-black/0 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutBuilder;

/* Custom scrollbar styles for webkit browsers */
const style = document.createElement("style");
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1F2937;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #374151;
    border-radius: 3px;
  }
`;
document.head.appendChild(style);
