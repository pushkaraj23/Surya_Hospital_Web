import HealthcareAbout from "../components/HomePage/HealthcareAbout";
import TestimonialSection from "../components/HomePage/TestimonialSection";
import HeroSection from "../components/HomePage/HeroSection";
import AppointmentCards from "../components/HomePage/AppointmentCards";

import Experts from "../components/HomePage/Experts";
import DepartmentsSection from "../components/HomePage/DepartmentsSection";
import BlogHighlights from "../components/HomePage/BlogHighlights";
import ImageGallery from "../components/HomePage/ImageGallery";
import FeedbackForm from "../components/Feedback Form/FeedbackForm";
const HomePage = () => {
  return (
    <div className="pt-36 max-sm:pt-28 overflow-hidden">
      <HeroSection />
      <AppointmentCards />
      <HealthcareAbout />
      <DepartmentsSection />
      <Experts />
      <TestimonialSection />
      <BlogHighlights />
      <ImageGallery />
      <FeedbackForm />
    </div>
  );
};

export default HomePage;
