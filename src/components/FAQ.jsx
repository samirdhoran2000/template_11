import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import config from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/faq?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Helper function to strip HTML tags from content
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
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
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400 flex items-center gap-3">
          <AlertCircle size={20} />
          <p>Failed to load FAQs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-12 bg-purple-600"></div>
          <HelpCircle size={28} className="text-purple-400" />
          <div className="h-px w-12 bg-purple-600"></div>
        </div>
        <h2 className="text-3xl font-bold text-white text-center">{heading}</h2>
        <p className="text-gray-400 text-center mt-3 max-w-2xl mx-auto">
          Find answers to commonly asked questions about Ceratec Tower 1o8
          Balewadi
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto divide-y divide-gray-800">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="py-5">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none group"
            >
              <span
                className={`text-lg font-medium ${
                  activeIndex === index ? "text-purple-400" : "text-gray-200"
                } group-hover:text-purple-400 transition-colors duration-200`}
              >
                {faq.faq_title}
              </span>
              <span className="ml-6 flex-shrink-0">
                {activeIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-purple-400" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                )}
              </span>
            </button>
            {activeIndex === index && (
              <div className="mt-3 pr-12">
                <div className="text-gray-300 bg-gray-800/60 p-4 rounded-lg border-l-2 border-purple-500">
                  {stripHtml(faq.faq_content)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still have questions section */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="bg-gradient-to-r from-black/50 via-black/40 to-black/70 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-300 mb-4">
            Our team is ready to assist you with any further queries
          </p>
          <a href="#contact" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
