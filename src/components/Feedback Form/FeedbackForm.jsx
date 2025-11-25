
// import React, { useState } from "react";
// import { Star, User, Phone, MessageSquare, Send } from "lucide-react";

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     fullname: "",
//     mobilenumber: "",
//     rating: 0,
//     feedback: "",
//   });
//   const [hoverRating, setHoverRating] = useState(0);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//     if (errors.rating) {
//       setErrors(prev => ({ ...prev, rating: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullname.trim()) {
//       newErrors.fullname = "Full name is required";
//     }

//     if (!formData.mobilenumber.trim()) {
//       newErrors.mobilenumber = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobilenumber.replace(/\D/g, ''))) {
//       newErrors.mobilenumber = "Please enter a valid 10-digit mobile number";
//     }

//     if (formData.rating === 0) {
//       newErrors.rating = "Please select a rating";
//     }

//     if (!formData.feedback.trim()) {
//       newErrors.feedback = "Feedback message is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       // Simulate API call - Replace with your actual API call
//       const response = await fetch('/api/feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullname: formData.fullname,
//           mobilenumber: formData.mobilenumber,
//           rating: formData.rating,
//           feedback: formData.feedback,
//           isapproved: false, // Default to false for admin approval
//         }),
//       });

//       if (response.ok) {
//         console.log("Feedback submitted successfully:", formData);
//         setIsSubmitted(true);

//         // Reset form after success
//         setTimeout(() => {
//           setFormData({
//             fullname: "",
//             mobilenumber: "",
//             rating: 0,
//             feedback: "",
//           });
//           setIsSubmitted(false);
//         }, 3000);
//       } else {
//         throw new Error('Failed to submit feedback');
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       setErrors({ submit: "Failed to submit feedback. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getRatingText = (rating) => {
//     const ratings = {
//       1: "Poor",
//       2: "Fair", 
//       3: "Good",
//       4: "Very Good",
//       5: "Excellent"
//     };
//     return ratings[rating] || "Select Rating";
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-96 mt-20 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl p-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Send className="text-green-600" size={24} />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">
//             Thank You for Your Feedback!
//           </h3>
//           <p className="text-gray-600">
//             Your feedback has been submitted successfully. We appreciate your input!
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-primary mt-20 text-gray-800 relative overflow-hidden">
//       {/* Header Banner */}
//       <div className="bg-gradient-to-r from-primary via-secondary to-accent px-6 py-4 rounded-xl shadow-xl backdrop-blur-md bg-opacity-80 text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2 drop-shadow-sm">
//           Share Your Feedback
//         </h1>
//         <p className="text-lg opacity-90 font-secondary">
//           Help us improve by sharing your experience with Surya Hospital
//         </p>
//       </div>

//       <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300">
//         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//           <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//           </svg>
//           Tell Us About Your Experience
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Rating Section */}
//           <div className="text-center">
//             <label className="block text-sm font-semibold text-gray-700 mb-4">
//               How would you rate your experience? *
//             </label>

//             {/* Star Rating */}
//             <div className="flex justify-center space-x-1 mb-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => handleRatingClick(star)}
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(0)}
//                   className="transform hover:scale-110 transition-transform duration-200"
//                 >
//                   <Star
//                     size={32}
//                     className={`
//                       ${star <= (hoverRating || formData.rating)
//                         ? 'text-yellow-400 fill-current'
//                         : 'text-gray-300'
//                       }
//                     `}
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* Rating Text */}
//             <div className={`text-lg font-semibold ${
//               formData.rating >= 4 ? 'text-green-600' :
//               formData.rating >= 3 ? 'text-yellow-600' : 
//               formData.rating > 0 ? 'text-red-600' : 'text-gray-500'
//             }`}>
//               {formData.rating > 0 ? getRatingText(formData.rating) : "Select your rating"}
//             </div>

//             {errors.rating && (
//               <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
//             )}
//           </div>

//           {/* Personal Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Full Name */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 name="fullname"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
//                   errors.fullname ? 'border-red-400' : 'border-gray-400'
//                 }`}
//                 placeholder="Enter your full name"
//               />
//               {errors.fullname && (
//                 <p className="text-red-500 text-sm">{errors.fullname}</p>
//               )}
//             </div>

//             {/* Mobile Number */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Mobile Number *
//               </label>
//               <input
//                 type="tel"
//                 name="mobilenumber"
//                 value={formData.mobilenumber}
//                 onChange={handleInputChange}
//                 className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
//                   errors.mobilenumber ? 'border-red-400' : 'border-gray-400'
//                 }`}
//                 placeholder="10-digit mobile number"
//               />
//               {errors.mobilenumber && (
//                 <p className="text-red-500 text-sm">{errors.mobilenumber}</p>
//               )}
//             </div>
//           </div>

//           {/* Feedback Message */}
//           <div className="space-y-2">
//             <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//               </svg>
//               Your Feedback *
//             </label>
//             <textarea
//               name="feedback"
//               value={formData.feedback}
//               onChange={handleInputChange}
//               rows={4}
//               className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none ${
//                 errors.feedback ? 'border-red-400' : 'border-gray-400'
//               }`}
//               placeholder="Share your experience, suggestions, or any concerns..."
//             />
//             {errors.feedback && (
//               <p className="text-red-500 text-sm">{errors.feedback}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-primary to-secondary text-black py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-md border border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                   </svg>
//                   Submit Feedback
//                 </>
//               )}
//             </button>
//           </div>

//           {errors.submit && (
//             <p className="text-red-500 text-center text-sm">{errors.submit}</p>
//           )}

//           {/* Privacy Note */}
//           <p className="text-center text-gray-500 text-sm">
//             Your feedback will be reviewed before being published. We value your privacy.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeedbackForm;
import React, { useState } from "react";
import { submitFeedback } from "../../api/userApi";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.mobilenumber.trim()) {
      newErrors.mobilenumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobilenumber.replace(/\D/g, ""))) {
      newErrors.mobilenumber = "Please enter a valid 10-digit mobile number";
    }

    if (formData.rating === 0) newErrors.rating = "Please select a rating";

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitFeedback({
        fullname: formData.fullname,
        mobilenumber: formData.mobilenumber,
        rating: formData.rating,
        feedback: formData.feedback,
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
      }, 3000);
    } catch (error) {
      setErrors({ submit: "Failed to submit feedback. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating) => {
    const ratings = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return ratings[rating] || "Select Rating";
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-36 mb-12">

      {/* ✅ SUCCESS POPUP (TOP RIGHT) */}
      {isSubmitted && (
        <div className="fixed top-10 right-10 bg-white border border-green-300 shadow-xl rounded-xl px-5 py-4 z-50 animate-slideIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Thank You!
              </h3>
              <p className="text-gray-600 text-sm">
                Your feedback has been submitted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent px-6 py-4 rounded-xl shadow-xl text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Share Your Feedback
        </h1>
        <p className="text-blue-100">
          Help us improve by sharing your experience
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Tell Us About Your Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ⭐ Rating Section */}
          <div className="text-center">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              How would you rate your experience? *
            </label>

            <div className="flex justify-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoverRating || formData.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>

            <div
              className={`text-lg font-semibold ${
                formData.rating >= 4
                  ? "text-green-600"
                  : formData.rating >= 3
                  ? "text-yellow-600"
                  : formData.rating > 0
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {formData.rating > 0
                ? getRatingText(formData.rating)
                : "Select your rating"}
            </div>

            {errors.rating && (
              <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
            )}
          </div>

          {/* Name + Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.fullname ? "border-red-400" : "border-gray-300"
                } focus:ring-2 focus:ring-accent focus:border-transparent`}
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">{errors.fullname}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.mobilenumber ? "border-red-400" : "border-gray-300"
                } focus:ring-2 focus:ring-accent focus:border-transparent`}
                placeholder="10-digit mobile number"
              />
              {errors.mobilenumber && (
                <p className="text-red-500 text-sm">{errors.mobilenumber}</p>
              )}
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Your Feedback *
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg resize-none ${
                errors.feedback ? "border-red-400" : "border-gray-300"
              } focus:ring-2 focus:ring-accent focus:border-transparent`}
              placeholder="Share your experience, suggestions, or any concerns..."
            />
            {errors.feedback && (
              <p className="text-red-500 text-sm">{errors.feedback}</p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Feedback
                </>
              )}
            </button>
          </div>

          {errors.submit && (
            <p className="text-red-500 text-center text-sm">{errors.submit}</p>
          )}

          <p className="text-center text-gray-500 text-xs">
            Your feedback will be reviewed before being published. We value your privacy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
