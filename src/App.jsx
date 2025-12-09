import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import ScrollToTop from "./utils/ScrollToTop";
import AppointmentBooking from "./components/Appoinment Booking/AppointmentBooking";
import ContactUs from "./components/ContactUs/ContactUs";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import DepartmentDetailPage from "./pages/DepartmentDetailPage";
import DetailedBlog from "./components/BlogsPage/DetailedBlog";
import DoctorDetailsPage from "./components/DoctorsPage/DoctorDetailsPage";
import DetailedPolicyPage from "./components/HomePage/DetailedPolicyPage";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:id" element={<DepartmentDetailPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<DetailedBlog />} />
        <Route path="/appoinmentBooking" element={<AppointmentBooking />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/policy/:id" element={<DetailedPolicyPage />} />
        <Route path="/appBook" element={<AppointmentBooking />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
