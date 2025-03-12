import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";

import BlogContent from "./components/BlogContent";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

function App() {
  return (
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
  );
}

export default App;
