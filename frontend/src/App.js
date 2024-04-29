import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Sign from "./components/sign/Sign";
import Scan from "./pages/Scan";
import PricingPage from "./pages/PricingPage";
import ContectUsPage from "./pages/ContectUsPage";
import BlogsPage from "./pages/BlogsPage";
import Networkpage from "./pages/Networkpage";
import Webpage from "./pages/Webpage";
import Sourcecode from "./pages/Sourcecode";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/scanner" element={<Scan />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contectus" element={<ContectUsPage />} />
          <Route path="/scanner/network" element={<Networkpage />} />
          <Route path="/scanner/web" element={<Webpage />} />
          <Route path="/scanner/sourcecode" element={<Sourcecode />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
