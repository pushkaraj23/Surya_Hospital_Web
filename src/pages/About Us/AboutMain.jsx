import { div } from "framer-motion/client";
import React from "react";
import AboutUs from "./AboutUs";
import MissionVision from "./MissionVision";
import AboutSections from "./AboutSection";

const AboutMain = () => {
    return (
        <div>
            <AboutUs />
            <MissionVision />
            <AboutSections/>
        </div>
    );
};
export default AboutMain;