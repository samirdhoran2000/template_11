import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";

import BlogContent from "./components/BlogContent";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { useSeoData } from "./hooks/useSeoData";
import { Loader } from "lucide-react";

function App() {

    const { seoData, loading, error } = useSeoData();

    if (loading) {
      return  (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-purple-400 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
    }

    if (error) {
      console.log("Error loading SEO data:", error);
      // Continue rendering the app even if SEO data fails to load
    }
  return (<HelmetProvider>
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/blogs/:id" element={<BlogContent />} exact />

          {/* <TemplateHomePage /> */}
        </Routes>
        <FloatingButtons />
        <Footer />
      </Router>
    </>
    </HelmetProvider>
  );
}

export default App;
