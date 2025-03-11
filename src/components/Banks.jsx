import React, { useState, useEffect } from "react";
import {
  Building,
  ExternalLink,
  ArrowRight,
  Loader,
  AlertTriangle,
  CreditCard,
} from "lucide-react";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBanks, setVisibleBanks] = useState(6);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/banks?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banks data");
        }

        const data = await response.json();
        setBanks(data.bank.banks);
        setHeading(data.bank.page.heading);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const loadMore = () => {
    setVisibleBanks((prev) => Math.min(prev + 6, banks.length));
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
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          {heading || "Approved Home Loan Partners"}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose from our network of trusted banking partners for hassle-free
          home loan approvals
        </p>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.slice(0, visibleBanks).map((bank) => (
          <a
            href={bank.bank_slug}
            target="_blank"
            rel="noopener noreferrer"
            key={bank.id}
            className="group"
          >
            <div className="bg-gray-800/60 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-600/10 h-full flex flex-col">
              <div className="relative h-40 bg-black/80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
                {bank.property_bank_photo ? (
                  <img
                    src={bank.property_bank_photo}
                    alt={bank.bank_name}
                    className="w-full h-full object-contain p-6"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building size={64} className="text-gray-500" />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-gray-200 font-medium text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {bank.bank_name}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <span className="text-sm flex items-center">
                    <CreditCard size={16} className="mr-2" />
                    Home Loan Partner
                  </span>
                  <ExternalLink
                    size={16}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {visibleBanks < banks.length && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
          >
            Load More Partners
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Banks;
