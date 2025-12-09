import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fetchHeroSection } from "../../api/userApi";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [hero, setHero] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* ---------------------------
      FETCH HERO SECTION CONTENT
  ----------------------------*/
  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await fetchHeroSection();
        setHero(data);
      } catch (err) {
        console.error("Error loading hero section:", err);
      }
    };

    loadHero();
  }, []);

  /* -------------------------------------
      IMAGE LOOPING WITH TRANSITIONS
  --------------------------------------*/
  useEffect(() => {
    if (!hero?.images || hero.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hero.images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [hero]);

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

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            relative z-10 h-full flex flex-col md:justify-center 
            max-sm:pt-10 gap-3 w-full sm:w-[70%] lg:w-[55%]
          "
        >
          {/* Dynamic Slogan */}
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#AE650E] w-fit font-medium bg-mute/30 backdrop-blur-md rounded-full py-2 px-4"
          >
            {hero?.slogan || ""}
          </motion.p>

          {/* Dynamic Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              font-quicksand font-semibold text-[#212121] 
              text-3xl sm:text-5xl lg:text-7xl leading-tight
            "
          >
            {hero?.title || ""}
          </motion.h1>

          {/* Dynamic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="
              text-[#212121]/70 font-medium 
              text-sm sm:text-base lg:text-lg max-w-xl
            "
          >
            {hero?.subtitle || ""}
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

        {/* DYNAMIC IMAGE WITH LOOPED TRANSITION */}
        {hero?.images && hero.images.length > 0 && (
          <motion.img
            key={currentImageIndex} // Forces animation on change
            src={hero.images[currentImageIndex]}
            alt="doctor-photo"
            initial={{ opacity: 0, x: 80 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.9 },
            }}
            exit={{ opacity: 0 }}
            className="
              absolute object-contain
              h-[50%] bottom-0 sm:h-[60%] md:h-[75%] lg:h-[100%]
              right-0 sm:right-6 lg:right-9
            "
          />
        )}
      </section>
    </div>
  );
};

export default HeroSection;
