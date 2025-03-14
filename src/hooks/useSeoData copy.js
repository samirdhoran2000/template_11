// First, let's create a custom hook to fetch the SEO data

import { useState, useEffect } from "react";
import config from "../../config";

export function useSeoData() {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/seodata.json`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch SEO data: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setSeoData(data.data);

          // Update the document title
          document.title = data.data.title || "SMP Amberwood";

          // Update meta description
          updateMetaTag("description", data.data.meta_description);

          // Update keywords
          updateMetaTag("keywords", data.data.keywords);

          // Update favicon
          if (data.data.favicon) {
            const link =
              document.querySelector('link[rel="icon"]') ||
              document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "icon";
            link.href = data.data.favicon;
            if (!document.querySelector('link[rel="icon"]')) {
              document.head.appendChild(link);
            }
          }

          // Update Open Graph tags
          updateMetaTag("og:title", data.data.og_title);
          updateMetaTag("og:description", data.data.og_description);
          updateMetaTag("og:image", data.data.og_image);
          updateMetaTag("og:type", data.data.og_type || "website");

          // Add JSON-LD script
          if (data.data.script_1) {
            addJsonLdScript(data.data.script_1, "seo-jsonld-1");
          }

          if (data.data.script_2) {
            addJsonLdScript(data.data.script_2, "seo-jsonld-2");
          }
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching SEO data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeoData();

    // return () => {
    //   // Cleanup function if needed
    // };
  }, []);

  // Helper function to update meta tags
  const updateMetaTag = (name, content) => {
    if (!content) return;

    // Check if meta tag already exists
    let metaTag =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="${name}"]`);

    if (!metaTag) {
      metaTag = document.createElement("meta");
      if (name.startsWith("og:")) {
        metaTag.setAttribute("property", name);
      } else {
        metaTag.setAttribute("name", name);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", content);
  };

  // Helper function to add JSON-LD scripts
  const addJsonLdScript = (jsonContent, id) => {
    try {
      // Remove existing script if it exists
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.innerHTML = jsonContent;
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error adding JSON-LD script:", err);
    }
  };

  return { seoData, loading, error };
}
