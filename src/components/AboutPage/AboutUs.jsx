import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="w-full bg-[#F7FAFF] min-h-screen pt-40 max-sm:pt-28 pb-20 flex justify-center"
    >
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl w-full px-6">
        {/* Page Title */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl max-sm:text-4xl font-black font-quicksand text-primary">
            About Us
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mt-3"></div>

          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Get to know our journey, our values, and our commitment to providing
            exceptional healthcare to our community.
          </p>
        </motion.div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid md:grid-cols-2 gap-7">
          {/* ===== COLUMN 1 ===== */}
          <div className="flex flex-col justify-center gap-8">
            {/* Introduction Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-fadedyellow/20 p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Welcome to <strong>[Hospital Name]</strong>, where compassionate
                care meets advanced medical excellence. Our mission is to
                deliver trusted, high-quality healthcare accessible to everyone.
                Since our founding in <strong>[Year]</strong>, we have grown
                into a modern multi-specialty medical center equipped with
                state-of-the-art technology and expert physicians dedicated to
                patient well-being.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-xl min-h-[450px]"
            >
              <img
                src="https://images.unsplash.com/photo-1542868727-5b8fcd21495e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hospital Care"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* ===== COLUMN 2 ===== */}
          <div className="flex flex-col justify-center gap-8">
            {/* Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-xl min-h-[450px]"
            >
              <img
                src="https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hospital Building"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* History Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-fadedblue/15 p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Our History
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                From our humble beginnings in <strong>[Year]</strong>,{" "}
                <strong>[Hospital Name]</strong> has evolved into a trusted
                healthcare institution known for its quality services,
                highly-experienced staff, and patient-centered approach. Our
                commitment to excellence continues to shape our journey as we
                serve thousands of families with care, expertise, and integrity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
