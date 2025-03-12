import React, { useState, useEffect } from "react";
import {
  Waves,
  Car,
  Dumbbell,
  ParkingCircle,
  Battery,
  Video,
  GamepadIcon,
  Forklift,
  Shield,
  Recycle,
  Loader,
  Volleyball,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from '../../config'

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/amenities?website=${
            config.SLUG_URL
          }`
        );
        

        if (!response.ok) {
          throw new Error("Failed to fetch amenities data");
        }

        const data = await response.json();
        console.log("data ", data);

        setAmenities(data.amenities.amenities);
        setHeading(data.amenities.page.heading);
        setLoading(false);
      } catch (err) {
        console.log("something went wrong in fetch amenities ", err);

        setError(err.message);
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  // Map amenity names to corresponding icons
  const getAmenityIcon = (amenityName) => {
    const iconMap = {
      "Swimming Pool": <Waves size={20} className="text-purple-400" />,
      "Parking Lot": <Car size={20} className="text-purple-400" />,
      Gym: <Dumbbell size={20} className="text-purple-400" />,
      "Cricket Pitch": <Volleyball size={20} className="text-purple-400" />,
      "Cover Parking Lot": (
        <ParkingCircle size={20} className="text-purple-400" />
      ),
      "Battery Backup": <Battery size={20} className="text-purple-400" />,
      CCTV: <Video size={20} className="text-purple-400" />,
      "Indoor Games": <GamepadIcon size={20} className="text-purple-400" />,
      Lift: <Forklift size={20} className="text-purple-400" />,
      "Security Gaurd": <Shield size={20} className="text-purple-400" />,
      "Solid Waste management": (
        <Recycle size={20} className="text-purple-400" />
      ),
    };

    return (
      iconMap[amenityName] || <Shield size={20} className="text-purple-400" />
    );
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
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
          <p>Failed to load amenities: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-900 p-8 rounded-lg" id="amenities">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {heading || "Premium Amenities"}
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-gray-800/60 p-5 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-black/80 flex items-center justify-center mb-2 group-hover:bg-purple-600/20 transition-all duration-300">
                  {getAmenityIcon(amenity.amenity_name)}
                </div>
                <h3 className="text-gray-200 font-medium group-hover:text-purple-400 transition-colors duration-300">
                  {amenity.amenity_name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              openDialog();
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 transform hover:scale-105"
          >
            Enquiry for Amenities
          </button>
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default Amenities;
