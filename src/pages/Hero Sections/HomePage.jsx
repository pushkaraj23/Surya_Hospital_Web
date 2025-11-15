import HealthcareAbout from "./HealthcareAbout";
import NewsletterFooter from "./NewsletterFooter";
import TestimonialSection from "./TestimonialSection";
import HeroSection from "../../components/HomePage/HeroSection";
import AppointmentCards from "./AppointmentCards";

import Experts from "./Experts";
import DepartmentsSection from "./DepartmentsSection";
import BlogHighlights from "./BlogHighlights";
import ImageGallery from "./ImageGallery";
const HomePage = () => {
  return (
    <div className="min-h-[200vh] pt-36">
      <HeroSection />
      <AppointmentCards/>
      <HealthcareAbout/>
      <DepartmentsSection/>
      <Experts/>
      <TestimonialSection/>
      <BlogHighlights/>
      <ImageGallery/>
      <NewsletterFooter/>
    </div>
  );
};

export default HomePage;
