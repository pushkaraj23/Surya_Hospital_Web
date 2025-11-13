import HeroSection from "../components/HomePage/HeroSection";
import AppointmentCards from "./AppointmentCards";
import DepartmentsSection from "./DepartmentsSection";
import HealthcareAbout from "./HealthcareAbout";

const HomePage = () => {
  return (
    <div className="min-h-[200vh] pt-36">
      <HeroSection />
      <AppointmentCards/>
      <HealthcareAbout/>
      <DepartmentsSection/>
    </div>
  );
};

export default HomePage;
