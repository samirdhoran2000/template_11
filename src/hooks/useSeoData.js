import { useState, useEffect } from "react";
import seoData from "../../public/seodata.json"; // Directly import static SEO data

export function useSeoData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate an async operation (if needed)
      setLoading(true);

      if (seoData.success) {
        // Update the document title
        document.title = seoData.data.title || "SMP Amberwood";

        // Update meta description
        updateMetaTag("description", seoData.data.meta_description);

        // Update keywords
        updateMetaTag("keywords", seoData.data.keywords);

        // Update favicon
        if (seoData.data.favicon) {
          const link =
            document.querySelector('link[rel="icon"]') ||
            document.createElement("link");
          link.type = "image/x-icon";
          link.rel = "icon";
          link.href = seoData.data.favicon;
          if (!document.querySelector('link[rel="icon"]')) {
            document.head.appendChild(link);
          }
        }

        // Update Open Graph tags
        updateMetaTag("og:title", seoData.data.og_title);
        updateMetaTag("og:description", seoData.data.og_description);
        updateMetaTag("og:image", seoData.data.og_image);
        updateMetaTag("og:type", seoData.data.og_type || "website");

        // Add JSON-LD scripts
        if (seoData.data.script_1) {
          addJsonLdScript(seoData.data.script_1, "seo-jsonld-1");
        }
        if (seoData.data.script_2) {
          addJsonLdScript(seoData.data.script_2, "seo-jsonld-2");
        }
      } else {
        throw new Error("Invalid SEO data format");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading SEO data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to update meta tags
  const updateMetaTag = (name, content) => {
    if (!content) return;

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

  return { seoData: seoData.data, loading, error };
}
