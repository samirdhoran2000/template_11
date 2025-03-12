import React, { useState, useEffect } from "react";
import { ContactDialog } from "./Contact";
import config from "../../config";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

export default function PropertyHeader() {
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Fetch property data
  useEffect(() => {
    async function fetchPropertyData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );
        const data = await res.json();
        setPropertyData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property data: ", err);
        setError("Failed to load property data. Using default data instead.");
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, []);

  return (
    <>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Navbar
          propertyData={propertyData}
          loading={loading}
          openDialog={openDialog}
        />
        <HeroSection
          propertyData={propertyData}
          loading={loading}
          error={error}
          openDialog={openDialog}
        />
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
}
