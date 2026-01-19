import { useEffect, useState } from "react";
import AboutUs from "../components/AboutPage/AboutUs";
import MissionVision from "../components/AboutPage/MissionVision";
import AboutSections from "../components/AboutPage/AboutSection";
import { fetchAboutUs } from "../api/userApi";
import DirectorMessage from "../components/AboutPage/DirectorMessage";
import CoreValues from "../components/AboutPage/CoreValues";
import JourneyTimeline from "../components/AboutPage/JourneyTimeline";
import ContactStrip from "../components/AboutPage/ContactStrip";
import Infrastructure from "../components/AboutPage/Infrastructure";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const loadAboutUs = async () => {
      try {
        const data = await fetchAboutUs();
        setAboutData(data);
      } catch (err) {
        console.error("Error loading About Us:", err);
      }
    };

    loadAboutUs();
  }, []);

  // OPTIONAL: Loading State
  if (!aboutData) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading About Us content...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* About Us Section */}
      <AboutUs
        introduction={aboutData.introduction}
        history={aboutData.history}
        image1={aboutData.image1}
        image2={aboutData.image2}
      />

      {/* Mission & Vision Section */}
      <MissionVision
        mission={aboutData.mission}
        missiontags={aboutData.missiontags}
        missionimage={aboutData.missionimage}
        vision={aboutData.vision}
        visiontags={aboutData.visiontags}
        visionimage={aboutData.visionimage}
      />

      {/* Director Section */}
      {/* <AboutSections
        directorname={aboutData.directorname}
        directorimage={aboutData.directorimage}
        directormessage={aboutData.directormessage}
      /> */}
      <DirectorMessage
        directorimage={aboutData.directorimage}
        directormessage={aboutData.directormessage}
        directorname={aboutData.directorname}
      />
      <CoreValues />
      <ContactStrip />
      <JourneyTimeline />
      <Infrastructure />
    </div>
  );
};

export default AboutPage;
