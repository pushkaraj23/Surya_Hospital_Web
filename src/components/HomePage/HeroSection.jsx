import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="px-5">
      <section
        ref={ref}
        className="
          relative w-full rounded-3xl 
          bg-gradient-to-br from-accent via-secondary to-primary 
          overflow-hidden
          h-[70vh] sm:h-[75vh] lg:h-[80vh]
          px-6 sm:px-10 lg:px-16
        "
      >
        {/* Background Logo */}
        <motion.img
          src="/logo-single-white.svg"
          alt="logo-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-4 sm:left-10 lg:left-24 h-3/5 sm:h-4/5"
        />

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            relative z-10 h-full flex flex-col md:justify-center 
            max-sm:pt-10 gap-3 w-full sm:w-[70%] lg:w-[55%]
          "
        >
          {/* Tag */}
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#AE650E] w-fit font-medium bg-mute/30 backdrop-blur-md rounded-full py-2 px-4"
          >
            Your Health Our Priority
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              font-quicksand font-semibold text-[#212121] 
              text-3xl sm:text-5xl lg:text-7xl leading-tight
            "
          >
            Your Health Comes First, Every Time to Us
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="
              text-[#212121]/70 font-medium 
              text-sm sm:text-base lg:text-lg max-w-xl
            "
          >
            Welcome to Medicax Medical Clinic, where we are dedicated to
            revolutionizing the way you experience healthcare.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="
              bg-mute px-5 py-3 rounded-lg shadow-md 
              text-primary font-semibold w-fit mt-4
              hover:shadow-lg transition-all duration-200
              text-sm sm:text-base
            "
          >
            Book Appointment
          </motion.button>
        </motion.div>

        {/* Right Doctor Image */}
        <motion.img
          src="/assets/HomePage/model.png"
          alt="doctor-photo"
          initial={{ opacity: 0, x: 80 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.9, delay: 0.3 },
                }
              : {}
          }
          className="
            absolute object-contain
            h-[50%] bottom-0 sm:h-[60%] md:h-[75%] lg:h-[100%]
            right-0 sm:right-6 lg:right-9
          "
        />
      </section>
    </div>
  );
};

export default HeroSection;
