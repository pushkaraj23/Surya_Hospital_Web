import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HealthcareAbout() {
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const leftInView = useInView(leftRef, { once: true, margin: "-100px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-100px" });

  /* Variants */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const staggerParent = {
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const popBox = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="px-5 mt-10 pb-2">
      {/* ---------------- Header Section ---------------- */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerInView ? "show" : "hidden"}
        transition={{ duration: 0.6 }}
        className="mb-28 px-28 max-sm:px-12"
      >
        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-md font-medium mb-3">
          Your Health, Our Priority
        </span>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3 max-sm:text-justify">
          We take pride in being more than just a healthcare institution — we
          are a trusted partner in the journey to wellness.{" "}
          <span className="text-gray-500 font-normal">
            From preventive care and diagnostics to advanced surgeries and
            rehabilitation.
          </span>
        </h1>
      </motion.div>

      {/* ---------------- Content Grid ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------- Left Column ---------- */}
        <motion.div
          ref={leftRef}
          initial="hidden"
          animate={leftInView ? "show" : "hidden"}
          variants={staggerParent}
          className="space-y-8"
        >
          {/* Hospital Image */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Modern Hospital Building"
                className="w-full h-100 object-cover"
              />
            </div>
          </motion.div>

          {/* Years of Excellence */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="bg-fadedyellow/30 rounded-3xl p-8 shadow-md">
              <h3 className="text-amber-900 font-bold text-lg max-sm:text-xl mb-4 italic">
                Years of Excellence
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                At Surge Hospital, we believe that every life deserves
                exceptional care, compassion, and commitment. Established with a
                vision to provide world-class medical services, we combine
                cutting-edge medical technology with the expertise of our highly
                qualified doctors and dedicated healthcare professionals. Here,
                every patient and individual receives personalized attention in
                a safe, caring, and healing environment.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- Right Column ---------- */}
        <motion.div
          ref={rightRef}
          initial="hidden"
          animate={rightInView ? "show" : "hidden"}
          variants={staggerParent}
          className="flex flex-col justify-between max-sm:gap-5"
        >
          {/* Stats Grid */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <motion.div
              variants={staggerParent}
              className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            >
              {/* Years */}
              <motion.div
                variants={popBox}
                transition={{ duration: 0.5 }}
                className="bg-fadedyellow/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600 text-sm mt-1">years</div>
              </motion.div>

              {/* Specialists */}
              <motion.div
                variants={popBox}
                transition={{ duration: 0.5 }}
                className="bg-fadedorange/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">100+</div>
                <div className="text-gray-600 text-sm mt-1">specialists</div>
              </motion.div>

              {/* Stories */}
              <motion.div
                variants={popBox}
                transition={{ duration: 0.5 }}
                className="bg-fadedblue/30 rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-4xl font-bold text-gray-900">1000+</div>
                <div className="text-gray-600 text-sm mt-1">stories</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hospital Room Image */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="Modern Hospital Room"
                className="w-full h-100 object-cover"
              />
            </div>
          </motion.div>

          {/* Patient First Approach */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="bg-fadedblue/30 rounded-3xl p-8 shadow-md">
              <p className="text-gray-700 text-sm leading-relaxed">
                Our patient-first approach ensures that every individual who
                walks through our doors is treated in a safe, caring, and
                healing environment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
