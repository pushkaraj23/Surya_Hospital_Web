import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
