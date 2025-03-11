import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Building,
  Building2,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import config from "../../config";

const PropertyPriceTable = () => {
  const [propertyPrices, setPropertyPrices] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchPropertyPrices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${config.API_URL}/property-prices?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
          const data = await response.json();
          console.log(data);
          
        setPropertyPrices(data.property_prices);
        if (data.page && data.page.length > 0) {
          setHeading(data.page[0].heading);
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyPrices();
  }, []);

  const filteredProperties =
    filterType === "All"
      ? propertyPrices
      : propertyPrices.filter((price) => price.property_type === filterType);

  const propertyTypes = [
    "All",
    ...new Set(propertyPrices.map((price) => price.property_type)),
  ];

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.buyindiahomes.in/api/propert-details?website=ceratectower1o8balewadi.com"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPropertyPrices(data.property_prices);
        if (data.page && data.page.length > 0) {
          setHeading(data.page[0].heading);
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property prices");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const PropertyTypeIcon = ({ type }) => {
    if (type === "Office") return <Building className="w-4 h-4 mr-2" />;
    if (type === "Showrooms") return <Building2 className="w-4 h-4 mr-2" />;
    return null;
  };

  return (
    <div id="price" className="py-8 px-4 bg-gray-900 text-gray-100 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          {heading || "Property Prices"}
        </h2>
        <div className="h-1 w-20 bg-purple-600 rounded-full mb-4"></div>
      </div>

      {error && (
        <div className="flex items-center justify-between bg-gray-800/60 text-yellow-400 p-4 rounded-lg mb-6 border border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
          <button
            onClick={retryFetch}
            className="flex items-center bg-gray-800 hover:bg-white/50 text-gray-200 hover:text-purple-400 px-3 py-1.5 rounded-md transition duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 relative">
            <div
              className="flex items-center justify-between bg-gray-800 p-2 rounded-md cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center">
                <span className="text-gray-300">Filter by Type:</span>
                <span className="ml-2 font-medium text-white">
                  {filterType}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-md overflow-hidden z-10 border border-gray-700">
                {propertyTypes.map((type) => (
                  <div
                    key={type}
                    className={`px-4 py-2 hover:bg-black/80 cursor-pointer flex items-center ${
                      filterType === type
                        ? "bg-purple-600 bg-opacity-20 text-purple-400"
                        : ""
                    }`}
                    onClick={() => {
                      setFilterType(type);
                      setIsFilterOpen(false);
                    }}
                  >
                    {type !== "All" && <PropertyTypeIcon type={type} />}
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="min-w-full bg-gray-800/60">
              <thead>
                <tr className="bg-black/80">
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-700">
                    Tower
                  </th>
                  <th className="px-4 py-3 text-right border-b border-gray-700">
                    Carpet Area (SQ.M)
                  </th>
                  <th className="px-4 py-3 text-right border-b border-gray-700">
                    Carpet Area (SQ.FT)
                  </th>
                  <th className="px-4 py-3 text-right border-b border-gray-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.length > 0 ? (
                  filteredProperties?.map((price) => (
                    <tr
                      key={price.id}
                      className="border-b border-gray-900 hover:bg-black/80 transition duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap flex items-center">
                        <PropertyTypeIcon type={price.property_type} />
                        <span>{price.property_type}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        Tower {price.property_tower}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">
                        {parseFloat(price.property_carpet_sqm).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">
                        {price.property_carpet_sqft}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-white">
                            {price.property_price} {price.price_unit}*
                          </span>
                          <span className="text-xs text-gray-400">
                            {price.price_tag}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No properties found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-gray-500 italic">
            * Prices are tentative and subject to change without notice
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyPriceTable;
