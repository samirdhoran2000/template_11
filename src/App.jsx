import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import BlogContent from "./components/BlogContent";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { Loader } from "lucide-react";

// Import static SEO data directly
import seoData from "../public/seodata.json";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.data.title}</title>
        <meta name="description" content={seoData.data.meta_description} />
        <meta name="keywords" content={seoData.data.keywords} />
        <meta property="og:title" content={seoData.data.og_title} />
        <meta property="og:description" content={seoData.data.og_description} />
        <meta property="og:image" content={seoData.data.og_image} />
        <meta property="og:type" content={seoData.data.og_type} />
        <link rel="icon" href={seoData.data.favicon} />
        <link rel="canonical" href={seoData.data.domain} />
        <script type="application/ld+json">
          {seoData.data.script_1}
        </script>
        <script type="application/ld+json">
          {seoData.data.script_2}
        </script>
      </Helmet>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/blogs/:id" element={<BlogContent />} exact />
          </Routes>
          <FloatingButtons />
          <Footer />
        </Router>
      </>
    </HelmetProvider>
  );
}

export default App;
