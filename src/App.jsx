import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import "./App.css";

import PropertyHeader from "./components/Header";
import HomePage from "./pages/HomePage";
import TemplateHomePage from "./pages/TemplateHomePage";
import TemplateHeader from "./template/Header";
import BlogContent from "./components/BlogContent";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>

      <Routes>
<Route path="/" element={<HomePage />} exact/>
<Route path="/blogs/:id" element={<BlogContent />} exact/>
    
      
      {/* <TemplateHomePage /> */}
        </Routes>
        <Footer/>
      </Router>
     
    </>
  );
}

export default App;
