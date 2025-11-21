import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import AppointmentBooking from "./components/Appoinment Booking/AppointmentBooking";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import ContactUs from "./components/ContactUs/ContactUs";

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
        <Route path="/appoinmentBooking" element={<AppointmentBooking />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feedback" element={<FeedbackForm/>} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
