
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateSelection from "./pages/TemplateSelection";
import PortfolioFormPage from "./pages/PortfolioFormPage";
import ProfessionalsList from "./pages/ProfessionalsList";
import PortfolioPage from "./pages/PortfolioPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/templateselection" element={<TemplateSelection />} />
        <Route path="/form/:template" element={<PortfolioFormPage />} />
        <Route path="/form/:template/:id" element={<PortfolioFormPage />} />
        <Route path="/" element={<ProfessionalsList />} />
        {/* <Route path="/professionals" element={<ProfessionalsList />} /> */}
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
