import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ------------------ Animation Variants ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const lineGrow = {
  hidden: { height: 0 },
  visible: (h) => ({
    height: h,
    transition: { duration: 1.2, ease: "easeInOut" },
  }),
};

const JourneyTimeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const cmsData = {
    milestones: [
      {
        year: "2015",
        event: "Foundation Established",
        description:
          "Started our journey with a vision to revolutionize healthcare through innovation and compassion.",
        icon: "🏥",
      },
      {
        year: "2017",
        event: "First Major Breakthrough",
        description:
          "Launched our telemedicine platform, serving over 10,000 patients in its first year.",
        icon: "💡",
      },
      {
        year: "2019",
        event: "National Recognition",
        description:
          "Received the National Healthcare Excellence Award for exceptional patient-centric solutions.",
        icon: "🏆",
      },
      {
        year: "2021",
        event: "Global Expansion",
        description:
          "Expanded services to 3 new countries, serving over 1 million patients worldwide.",
        icon: "🌍",
      },
      {
        year: "2023",
        event: "AI Integration",
        description:
          "Implemented AI-driven diagnostics, reducing wait times and increasing diagnostic accuracy.",
        icon: "🤖",
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % cmsData.milestones.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = document.getElementById("milestone-container");
    if (container) setContainerHeight(container.scrollHeight);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div variants={scaleIn} className="">
          <h2 className="text-5xl font-extrabold font-quicksand text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Our Journey
          </h2>
        </motion.div>

        <p className="text-primary font-medium max-w-2xl mx-auto">
          A timeline that reflects our growth, commitment, and evolution in
          healthcare excellence.
        </p>
      </motion.div>

      {/* MOBILE Timeline Navigation */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:hidden mb-8"
      >
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {cmsData.milestones.map((milestone, index) => (
            <button
              key={index}
              onClick={() => setActiveMilestone(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeMilestone === index
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 shadow-md hover:shadow-lg"
              }`}
            >
              {milestone.year}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="relative">
        {/* BACK Timeline Line */}
        <div
          className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 
     w-[5px] bg-gray-200 h-full rounded-full hidden lg:block 
     z-0"
        ></div>

        {/* PROGRESS Line */}
        <motion.div
          custom={`${
            ((activeMilestone + 1) / cmsData.milestones.length) *
            containerHeight
          }px`}
          variants={lineGrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 
     w-[5px] bg-gradient-to-b from-orange-500 to-amber-500 rounded-full hidden lg:block 
     shadow-lg z-0"
        ></motion.div>

        {/* MILESTONES */}
        <div
          id="milestone-container"
          className="space-y-12 lg:space-y-16 pt-4 z-10 relative"
        >
          {cmsData.milestones.map((m, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className={`flex flex-col lg:flex-row items-start gap-6 lg:gap-16 ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* YEAR Bubble */}
              <motion.div
                variants={scaleIn}
                onClick={() => setActiveMilestone(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer transition-all ${
                  activeMilestone === index
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 scale-110 shadow-orange-300/50"
                    : "bg-gradient-to-br from-orange-400 to-amber-400"
                }`}
              >
                <span className="text-3xl">{m.icon}</span>
                <span className="text-sm font-semibold">{m.year}</span>
              </motion.div>

              {/* CONTENT CARD */}
              <motion.div
                variants={fadeUp}
                custom={index + 0.1}
                className={`flex-1 bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${
                  activeMilestone === index
                    ? "border-l-4 lg:border-l-0 lg:border-r-4 border-orange-500 bg-orange-50"
                    : "border border-gray-100 bg-white"
                } ${
                  index % 2 === 0
                    ? "lg:text-right lg:border-r-4"
                    : "lg:text-left lg:border-l-4"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-orange-600 font-semibold text-sm">
                    Milestone {index + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {m.event}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
