import { useState } from "react";
import { submitFeedback } from "../../api/userApi";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    mobilenumber: "",
    rating: 0,
    feedback: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ---------------------------- HANDLERS ---------------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
  };

  /* ---------------------------- VALIDATION ---------------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";

    if (!formData.mobilenumber.trim()) {
      newErrors.mobilenumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = "Enter a valid 10-digit mobile number";
    }

    if (formData.rating === 0) newErrors.rating = "Please select a rating";

    if (!formData.feedback.trim())
      newErrors.feedback = "Feedback message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------------------- SUBMIT ---------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitFeedback({
        ...formData,
        isapproved: false,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          fullname: "",
          mobilenumber: "",
          rating: 0,
          feedback: "",
        });
        setIsSubmitted(false);
      }, 2500);
    } catch {
      setErrors({ submit: "Failed to submit feedback. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating) => {
    return {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    }[rating];
  };

  /* ---------------- Animation Variants ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const ratingStagger = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  /* ========================== UI START ============================== */

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto pt-32 pb-20 px-5"
    >
      {/* SUCCESS TOAST */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 right-6 z-50 bg-white rounded-xl border border-green-300 shadow-lg px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-lg">
                Feedback Submitted
              </p>
              <p className="text-sm text-gray-500">
                Thank you for your response.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-center mb-10"
      >
          <h2 className="text-4xl font-bold font-quicksand text-gray-800">
            Feedback
          </h2>
          <div className="h-1.5 rounded bg-secondary w-20 mt-1.5 mb-3 mx-auto" />
          <p className="text-gray-500">
            Tell us about the experience you had with us.
          </p>
      </motion.div>

      {/* CARD */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-mute to-accent/50 shadow-2xl rounded-2xl p-8 backdrop-blur-sm border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* RATING */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              How was your experience with us?
            </h3>

            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star, index) => {
                const active = star <= (hoverRating || formData.rating);

                return (
                  <motion.button
                    custom={index}
                    variants={ratingStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg
                      className={`w-10 h-10 transition-all ${
                        active
                          ? "text-yellow-400 scale-110"
                          : "text-white hover:scale-105"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </motion.button>
                );
              })}
            </div>

            <p
              className={`font-semibold ${
                formData.rating >= 4
                  ? "text-green-600"
                  : formData.rating === 3
                  ? "text-yellow-600"
                  : formData.rating > 0
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {formData.rating
                ? getRatingText(formData.rating)
                : "Select Rating"}
            </p>

            {errors.rating && (
              <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
            )}
          </div>

          {/* NAME & MOBILE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Fullname */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                  errors.fullname ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number *
              </label>
              <input
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                  errors.mobilenumber ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.mobilenumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobilenumber}
                </p>
              )}
            </div>
          </motion.div>

          {/* FEEDBACK TEXTAREA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <label className="text-sm font-medium text-gray-700">
              Your Feedback *
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              rows={4}
              className={`w-full mt-1 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-primary ${
                errors.feedback ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Tell us about your experience..."
            />
            {errors.feedback && (
              <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
            )}
          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.button
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            type="submit"
            disabled={isSubmitting}
            className="px-5 mx-auto py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit Feedback
              </>
            )}
          </motion.button>

          {errors.submit && (
            <p className="text-red-500 text-center text-sm mt-2">
              {errors.submit}
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
