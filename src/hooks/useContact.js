// src/hooks/useContact.js
import { useState, useEffect } from "react";
import config from "../../config.js";
export default function useContact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${config.API_URL}/footer?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setContact(data?.g_setting);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contact, loading, error };
}

// import useContact from "../hooks/useContact";


// const { contact, loading, error } = useContact();

//  const { contact } = useContact();

// { contact?.footer_phone }

// { `tel:${contact?.footer_phone}` }



// import useContact from "../hooks/useContact";


// const { contact, loading, error } = useContact();
//  const { contact } = useContact();

// {  contact?.footer_phone}
//{`tel:${contact?.footer_phone}`}