import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchJourneyTimeline } from "../../api/userApi";

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
  const [milestones, setMilestones] = useState([]);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD TIMELINE DATA FROM API ---------------- */
  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const data = await fetchJourneyTimeline();
        setMilestones(data);
      } catch (err) {
        console.error("Error fetching timeline:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTimeline();
  }, []);

  /* ---------------- AUTO ROTATION ---------------- */
  useEffect(() => {
    if (milestones.length === 0) return;

    const interval = setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % milestones.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [milestones]);

  /* ---------------- SET LINE HEIGHT ---------------- */
  useEffect(() => {
    const container = document.getElementById("milestone-container");
    if (container) setContainerHeight(container.scrollHeight);
  }, [milestones]);

  return (
    <div className="my-28 px-6">
      <div className="max-w-6xl mx-auto h-fit">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={scaleIn}>
            <h2 className="text-5xl font-extrabold font-quicksand text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Our Journey
            </h2>
          </motion.div>

          <p className="text-primary font-medium max-w-2xl mx-auto">
            A timeline that reflects our growth, commitment, and evolution in
            healthcare excellence.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading timeline...</p>
        )}

        {/* No Data */}
        {!loading && milestones.length === 0 && (
          <p className="text-center text-gray-400">No timeline data found.</p>
        )}

        {/* If data exists */}
        {!loading && milestones.length > 0 && (
          <>
            {/* MOBILE YEAR BUTTONS */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:hidden mb-8"
            >
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {milestones.map((m, index) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMilestone(index)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      activeMilestone === index
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-white text-gray-600 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {m.year}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              {/* BACK TIMELINE LINE */}
              <div
                className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 
                w-[5px] bg-gray-200 h-full rounded-full hidden lg:block z-0"
              ></div>

              {/* PROGRESS LINE */}
              <motion.div
                custom={`${
                  ((activeMilestone + 1) / milestones.length) * containerHeight
                }px`}
                variants={lineGrow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 
                w-[5px] bg-gradient-to-b from-orange-500 to-amber-500 rounded-full hidden lg:block 
                shadow-lg z-0"
              ></motion.div>

              {/* MILESTONE CARDS */}
              <div
                id="milestone-container"
                className="space-y-12 lg:space-y-16 pt-4 z-10 relative"
              >
                {milestones.map((m, index) => (
                  <motion.div
                    key={m.id}
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
                      <span className="text-3xl">📌</span>
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
                      } ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-orange-600 font-semibold text-sm">
                          Milestone {index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {m.title}
                      </h3>

                      <p className="text-gray-600 text-lg leading-relaxed">
                        {m.subtitle}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JourneyTimeline;
