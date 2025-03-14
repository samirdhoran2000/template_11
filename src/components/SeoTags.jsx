import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";

const SeoTags = () => {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/seodata.json`
        );
        const result = await response.json();
        if (result.success) {
          setSeoData(result.data);
        } else {
          console.error("SEO data fetch unsuccessful");
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeoData();
  }, []);

  if (loading || !seoData) return null; // Optionally render a loader here

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.meta_description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta property="og:title" content={seoData.og_title} />
      <meta property="og:description" content={seoData.og_description} />
      <meta property="og:image" content={seoData.og_image} />
      <meta property="og:type" content={seoData.og_type} />
      {seoData.favicon && <link rel="icon" href={seoData.favicon} />}
      {seoData.script_1 && (
        <script type="application/ld+json">{seoData.script_1}</script>
      )}
      {seoData.script_2 && (
        <script type="application/ld+json">{seoData.script_2}</script>
      )}
    </Helmet>
  );
};

export default SeoTags;
