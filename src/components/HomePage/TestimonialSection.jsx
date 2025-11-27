import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { getAllFeedback } from "../../api/userApi";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const feedbackData = await getAllFeedback();

      const transformed = feedbackData.map((fb) => ({
        text: fb.feedback,
        author: fb.fullname,
        rating: fb.rating,
        isApproved: fb.isapproved,
        createdAt: fb.createdat,
      }));

      const approved = transformed.filter((t) => t.isApproved).slice(0, 4);

      setTestimonials(approved);
      setError(null);
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setError("Failed to load testimonials");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Animation Variants ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  /* ----------------- LOADING STATE ----------------- */
  if (loading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20"
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
          <div className="md:w-1/3 flex flex-col items-start">
            <Quote size={70} className="text-secondary opacity-80 mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight font-quicksand">
              What People <br /> Are Saying <br /> About Us
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base max-w-sm">
              Real stories from real patients who experienced compassionate and
              professional care at our hospital.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col gap-4 animate-pulse"
              ></motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  /* ----------------- MAIN SECTION WITH ANIMATIONS ----------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#f9fafb] px-6 md:px-12 lg:px-20 mb-20"
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 md:items-center">
        {/* LEFT SECTION (Static text + fade up) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex flex-col items-start"
        >
          <Quote size={70} className="text-secondary opacity-80 mb-4" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight font-quicksand">
            What People <br /> Are Saying <br /> About Us
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-sm">
            Real stories from real patients who experienced compassionate and
            professional care at our hospital.
          </p>
        </motion.div>

        {/* RIGHT GRID WITH STAGGER ANIMATION */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              >
                <Quote size={20} className="text-accent" />
                <p className="text-gray-800 font-medium text-sm leading-relaxed">
                  "{item.text}"
                </p>
                <p className="text-primary font-semibold text-sm">
                  ~ {item.author}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="col-span-2 text-center py-8"
            >
              <p className="text-gray-600">No testimonials available yet.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
