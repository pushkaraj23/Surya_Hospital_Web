import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/Hero Sections/HomePage";
import AboutMain from "./pages/About Us/AboutMain";
import DepartmentManagement from "./pages/Department Section/DepartmentManagement";
import DoctorsPage from "./pages/Doctor Management/DoctorsPage";
import GalleryPage from "./pages/Gallery Section/GalleryPage";
import BlogPage from "./pages/Blog Section/BlogPage";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMain />} />
        <Route path="/departments" element={<DepartmentManagement />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<BlogPage />} />

      </Routes>
    </div>
  );
}

export default App;
