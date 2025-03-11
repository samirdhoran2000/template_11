import React, { useState, useEffect } from "react";
import {
  Calendar,
  Building,
  FileText,
  ExternalLink,
  Layers,
  Map,
  Home,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const ReraInformation = () => {
  const [reraData, setReraData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);


  useEffect(() => {
    const fetchReraData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/rera?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch RERA data");
        }

        const data = await response.json();
        setPageInfo(data.page[0]);
        setReraData(data.rera[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReraData();
  }, []);

  // Function to format date in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] py-12 px-4 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-yellow-900/20 p-6 rounded-lg flex items-center gap-4">
          <AlertTriangle size={24} className="text-yellow-400 flex-shrink-0" />
          <p className="text-yellow-400">
            Failed to load RERA information: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-900 py-16 px-4" id="about">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              {pageInfo?.heading || "RERA Information"}
            </h2>
            {pageInfo?.subheading && (
              <p className="text-gray-300 max-w-3xl mx-auto">
                {pageInfo.subheading}
              </p>
            )}
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800/60 border border-gray-800 rounded-xl overflow-hidden shadow-lg shadow-purple-900/10">
            {/* RERA Header */}
            <div className="bg-black/80 p-6 border-b border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {reraData.phase_name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <FileText size={16} className="text-purple-400 mr-2" />
                    <span className="text-gray-300">RERA ID: </span>
                    <span className="text-white ml-1 font-medium">
                      {reraData.rera_id}
                    </span>
                  </div>
                </div>
                <a
                  href={reraData.rera_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <span>Verify on RERA Website</span>
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-600 group">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-black/80 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Calendar size={24} className="text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Completion Date</p>
                    <h4 className="text-gray-200 font-medium mt-1">
                      {formatDate(reraData.completion_date)}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-600 group">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-black/80 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Map size={24} className="text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Project Area</p>
                    <h4 className="text-gray-200 font-medium mt-1">
                      {reraData.total_area.toLocaleString()} sq.m
                      <span className="text-gray-400 text-sm ml-1">
                        ({reraData.total_acre} Acre)
                      </span>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-600 group">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-black/80 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Building size={24} className="text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Total Towers</p>
                    <h4 className="text-gray-200 font-medium mt-1">
                      {reraData.total_tower}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-600 group">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-black/80 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Home size={24} className="text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Total Units</p>
                    <h4 className="text-gray-200 font-medium mt-1">
                      {reraData.total_units}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t border-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gray-200 font-semibold mb-4 flex items-center">
                    <Layers size={18} className="text-purple-400 mr-2" />
                    Project Timeline
                  </h4>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-indigo-600"></div>

                    {/* <div className="mb-4 relative">
                    <div className="absolute left-0 top-0.5 w-3 h-3 rounded-full bg-purple-600 -ml-1.5"></div>
                    <div className="bg-gray-800/60 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">Registration Date</p>
                      <p className="text-white text-sm font-medium">
                        December 2024
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 relative">
                    <div className="absolute left-0 top-0.5 w-3 h-3 rounded-full bg-purple-400 -ml-1.5"></div>
                    <div className="bg-gray-800/60 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        Construction Started
                      </p>
                      <p className="text-white text-sm font-medium">
                        January 2025
                      </p>
                    </div>
                  </div> */}

                    <div className="relative">
                      <div className="absolute left-0 top-0.5 w-3 h-3 rounded-full bg-indigo-600 -ml-1.5"></div>
                      <div className="bg-gray-800/60 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm">
                          Expected Completion
                        </p>
                        <p className="text-white text-sm font-medium">
                          {formatDate(reraData.completion_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-200 font-semibold mb-4 flex items-center">
                    <FileText size={18} className="text-purple-400 mr-2" />
                    RERA Compliance Information
                  </h4>
                  <div className="bg-black/80 p-4 rounded-lg border border-gray-700">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                        <span className="text-gray-300 text-sm">
                          This project is registered under Maharashtra RERA
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                        <span className="text-gray-300 text-sm">
                          RERA Registration: {reraData.rera_id}
                        </span>
                      </li>
                      {/* <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                      <span className="text-gray-300 text-sm">
                        Availability of property documents on RERA website
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                      <span className="text-gray-300 text-sm">
                        Quarterly updates submitted as per RERA guidelines
                      </span>
                    </li> */}
                    </ul>

                    <a
                      href={reraData.rera_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-purple-400 text-sm inline-flex items-center hover:text-purple-300"
                    >
                      Learn more about RERA compliance
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 p-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>
                Last updated:{" "}
                {new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>Source: Maharashtra Real Estate Regulatory Authority</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 text-center">
            <p className="text-gray-300 mb-4">
              Interested in knowing more about this RERA registered project?
            </p>
            <button
              onClick={() => {
                openDialog();
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 text-white font-medium px-6 py-3 rounded-md transition-all duration-200"
            >
              Request Property Documents
            </button>
          </div>
        </div>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ReraInformation;
