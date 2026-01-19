// import { useState } from "react";
// import { submitFeedback } from "../../api/userApi";
// import { motion } from "framer-motion";

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

//   /* ---------------------------- HANDLERS ---------------------------- */
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData((prev) => ({ ...prev, rating }));
//     if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
//   };

//   /* ---------------------------- VALIDATION ---------------------------- */
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";

//     if (!formData.mobilenumber.trim()) {
//       newErrors.mobilenumber = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
//       newErrors.mobilenumber = "Enter a valid 10-digit mobile number";
//     }

//     if (formData.rating === 0) newErrors.rating = "Please select a rating";

//     if (!formData.feedback.trim())
//       newErrors.feedback = "Feedback message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ---------------------------- SUBMIT ---------------------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       await submitFeedback({
//         ...formData,
//         isapproved: false,
//       });

//       setIsSubmitted(true);

//       setTimeout(() => {
//         setFormData({
//           fullname: "",
//           mobilenumber: "",
//           rating: 0,
//           feedback: "",
//         });
//         setIsSubmitted(false);
//       }, 2500);
//     } catch {
//       setErrors({ submit: "Failed to submit feedback. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getRatingText = (rating) => {
//     return {
//       1: "Poor",
//       2: "Fair",
//       3: "Good",
//       4: "Very Good",
//       5: "Excellent",
//     }[rating];
//   };

//   /* ---------------- Animation Variants ---------------- */
//   const fadeUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const ratingStagger = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: (i) => ({
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delay: 0.4 + i * 0.1,
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     }),
//   };

//   /* ========================== UI START ============================== */

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={fadeUp}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="w-full max-w-5xl mx-auto pt-32 pb-20 px-5"
//     >
//       {/* SUCCESS TOAST */}
//       {isSubmitted && (
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.4 }}
//           className="fixed top-6 right-6 z-50 bg-white rounded-xl border border-green-300 shadow-lg px-5 py-4"
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>

//             <div>
//               <p className="font-semibold text-gray-800 text-lg">
//                 Feedback Submitted
//               </p>
//               <p className="text-sm text-gray-500">
//                 Thank you for your response.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* HEADER */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ delay: 0.1, duration: 0.8 }}
//         className="text-center mb-10"
//       >
//           <h2 className="text-4xl font-bold font-quicksand text-gray-800">
//             Feedback
//           </h2>
//           <div className="h-1.5 rounded bg-secondary w-20 mt-1.5 mb-3 mx-auto" />
//           <p className="text-gray-500">
//             Tell us about the experience you had with us.
//           </p>
//       </motion.div>

//       {/* CARD */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 0.8 }}
//         className="bg-gradient-to-br from-mute to-accent/50 shadow-2xl rounded-2xl p-8 backdrop-blur-sm border border-gray-100"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* RATING */}
//           <div className="text-center">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">
//               How was your experience with us?
//             </h3>

//             <div className="flex justify-center gap-2 mb-3">
//               {[1, 2, 3, 4, 5].map((star, index) => {
//                 const active = star <= (hoverRating || formData.rating);

//                 return (
//                   <motion.button
//                     custom={index}
//                     variants={ratingStagger}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                     key={star}
//                     type="button"
//                     onClick={() => handleRatingClick(star)}
//                     onMouseEnter={() => setHoverRating(star)}
//                     onMouseLeave={() => setHoverRating(0)}
//                   >
//                     <svg
//                       className={`w-10 h-10 transition-all ${
//                         active
//                           ? "text-yellow-400 scale-110"
//                           : "text-white hover:scale-105"
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
//                     </svg>
//                   </motion.button>
//                 );
//               })}
//             </div>

//             <p
//               className={`font-semibold ${
//                 formData.rating >= 4
//                   ? "text-green-600"
//                   : formData.rating === 3
//                   ? "text-yellow-600"
//                   : formData.rating > 0
//                   ? "text-red-500"
//                   : "text-gray-500"
//               }`}
//             >
//               {formData.rating
//                 ? getRatingText(formData.rating)
//                 : "Select Rating"}
//             </p>

//             {errors.rating && (
//               <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
//             )}
//           </div>

//           {/* NAME & MOBILE */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
//           >
//             {/* Fullname */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Full Name *
//               </label>
//               <input
//                 name="fullname"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
//                   errors.fullname ? "border-red-400" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your name"
//               />
//               {errors.fullname && (
//                 <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
//               )}
//             </div>

//             {/* Mobile */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Mobile Number *
//               </label>
//               <input
//                 name="mobilenumber"
//                 value={formData.mobilenumber}
//                 onChange={handleInputChange}
//                 className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
//                   errors.mobilenumber ? "border-red-400" : "border-gray-300"
//                 }`}
//                 placeholder="10-digit mobile number"
//               />
//               {errors.mobilenumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.mobilenumber}
//                 </p>
//               )}
//             </div>
//           </motion.div>

//           {/* FEEDBACK TEXTAREA */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//           >
//             <label className="text-sm font-medium text-gray-700">
//               Your Feedback *
//             </label>
//             <textarea
//               name="feedback"
//               value={formData.feedback}
//               onChange={handleInputChange}
//               rows={4}
//               className={`w-full mt-1 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-primary ${
//                 errors.feedback ? "border-red-400" : "border-gray-300"
//               }`}
//               placeholder="Tell us about your experience..."
//             />
//             {errors.feedback && (
//               <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
//             )}
//           </motion.div>

//           {/* SUBMIT BUTTON */}
//           <motion.button
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             type="submit"
//             disabled={isSubmitting}
//             className="px-5 mx-auto py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   strokeWidth="2"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                   />
//                 </svg>
//                 Submit Feedback
//               </>
//             )}
//           </motion.button>

//           {errors.submit && (
//             <p className="text-red-500 text-center text-sm mt-2">
//               {errors.submit}
//             </p>
//           )}
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default FeedbackForm;






// import { useState } from "react";
// import { motion } from "framer-motion";
// import { createFeedback } from "../../api/userApi";

// const initialFormState = {
//   fullname: "",
//   mobilenumber: "",
//   prn: "",
//   ipd_no: "",
//   age: "",
//   gender: "",
//   doctor_name: "",
//   ward_admission_no: "",
//   visit_date: "",

//   // All rating fields from API
//   allocation_of_bed: "",
//   staff_courtesy: "",
//   time_taken: "",
//   staff_efficiency: "",
//   casualty_attendance: "",
//   common_area_cleanliness: "",
//   room_cleanliness: "",
//   toilet_cleanliness: "",
//   room_maintenance: "",
//   consultants: "",
//   junior_doctors: "",
//   nursing_staff: "",
//   physiotherapy_staff: "",
//   pharmacy_staff: "",
//   ward_ipc: "",
//   support_staff: "",
//   billing_staff: "",
//   mediclaim_staff: "",
//   pantry_staff: "",
//   medical_assessment: "",
//   diagnostics: "",
//   nursing_care: "",
//   physiotherapy: "",
//   pharmacy_service: "",
//   food_dietetics: "",
//   security: "",
//   admission_process: "",
//   insurance_process: "",
//   ot_process: "",
//   patient_shifting: "",
//   billing_process: "",
//   discharge_process: "",
//   overall_experience: "",

//   feedback: "",
//   sign_name: "",
// };

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Rating Options
//   const RATING_OPTIONS = [
//     "EXCELLENT",
//     "GOOD",
//     "AVERAGE",
//     "POOR",
//     "NOT_APPLICABLE",
//   ];

//   // Form Sections Configuration
//   const formSections = [
//     {
//       title: "1. Admission Process",
//       fields: [
//         { key: "allocation_of_bed", label: "Allocation of Bed", required: true },
//         { key: "staff_courtesy", label: "Staff Courtesy & Friendliness", required: true },
//         { key: "time_taken", label: "Time taken for the process", required: true },
//         { key: "staff_efficiency", label: "Staff Efficiency", required: false },
//         { key: "casualty_attendance", label: "Casualty Attendance", required: false },
//         { key: "admission_process", label: "General Admission Process", required: true },
//       ],
//     },
//     {
//       title: "2. Hospital Ambience",
//       fields: [
//         { key: "common_area_cleanliness", label: "Common Area Cleanliness", required: false },
//         { key: "room_cleanliness", label: "Room Cleanliness", required: true },
//         { key: "toilet_cleanliness", label: "Toilet Cleanliness", required: true },
//         { key: "room_maintenance", label: "Room Maintenance", required: false },
//       ],
//     },
//     {
//       title: "3. Interaction with Staff",
//       fields: [
//         { key: "consultants", label: "Consultants", required: true },
//         { key: "junior_doctors", label: "Junior Doctors", required: false },
//         { key: "nursing_staff", label: "Nursing Staff", required: true },
//         { key: "physiotherapy_staff", label: "Physiotherapy Staff", required: false },
//         { key: "pharmacy_staff", label: "Pharmacy Staff", required: false },
//         { key: "ward_ipc", label: "Ward In-charge", required: false },
//         { key: "support_staff", label: "Support Staff", required: false },
//         { key: "billing_staff", label: "Billing Staff", required: false },
//         { key: "mediclaim_staff", label: "Mediclaim Staff", required: false },
//         { key: "pantry_staff", label: "Pantry Staff", required: false },
//       ],
//     },
//     {
//       title: "4. Services & Medical",
//       fields: [
//         { key: "medical_assessment", label: "Medical Assessment", required: true },
//         { key: "diagnostics", label: "Diagnostics (Lab, Imaging)", required: true },
//         { key: "nursing_care", label: "Nursing Care", required: false },
//         { key: "physiotherapy", label: "Physiotherapy", required: false },
//         { key: "pharmacy_service", label: "Pharmacy Service", required: false },
//         { key: "food_dietetics", label: "Food & Dietetics", required: false },
//         { key: "security", label: "Security", required: false },
//       ],
//     },
//     {
//       title: "5. Processes",
//       fields: [
//         { key: "insurance_process", label: "Insurance Process", required: false },
//         { key: "ot_process", label: "OT Process", required: false },
//         { key: "patient_shifting", label: "Patient Shifting", required: false },
//         { key: "billing_process", label: "Billing Process", required: true },
//         { key: "discharge_process", label: "Discharge Process", required: false },
//       ],
//     },
//     {
//       title: "6. Overall Experience",
//       fields: [
//         { key: "overall_experience", label: "Overall Experience at Hospital", required: true },
//       ],
//     },
//   ];

//   /* ---------------- HANDLERS ---------------- */
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleRatingChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
//   };

//   /* ---------------- VALIDATION ---------------- */
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullname.trim()) newErrors.fullname = "Patient name is required";
//     if (!formData.mobilenumber.trim()) {
//       newErrors.mobilenumber = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
//       newErrors.mobilenumber = "Enter valid 10-digit number";
//     }
//     if (!formData.prn.trim()) newErrors.prn = "PRN is required";

//     formSections.forEach((section) => {
//       section.fields.forEach((field) => {
//         if (field.required && !formData[field.key]) {
//           newErrors[field.key] = "Required";
//         }
//       });
//     });

//     if (!formData.sign_name.trim()) newErrors.sign_name = "Signature name is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ---------------- CALCULATE RATING ---------------- */
//   const calculateOverallRating = (experience) => {
//     const ratingMap = {
//       EXCELLENT: 5,
//       GOOD: 4,
//       AVERAGE: 3,
//       POOR: 2,
//       NOT_APPLICABLE: 1,
//     };
//     return ratingMap[experience] || 3;
//   };

//   /* ---------------- PREPARE PAYLOAD ---------------- */
//   const preparePayload = () => {
//     return {
//       fullname: formData.fullname.trim(),
//       mobilenumber: formData.mobilenumber.trim(),
//       prn: formData.prn.trim() || null,
//       ipd_no: formData.ipd_no.trim() || null,
//       age: formData.age ? parseInt(formData.age) : null,
//       gender: formData.gender || null,
//       doctor_name: formData.doctor_name.trim() || null,
//       ward_admission_no: formData.ward_admission_no.trim() || null,
//       visit_date: formData.visit_date || null,

//       allocation_of_bed: formData.allocation_of_bed || null,
//       staff_courtesy: formData.staff_courtesy || null,
//       time_taken: formData.time_taken || null,
//       staff_efficiency: formData.staff_efficiency || null,
//       casualty_attendance: formData.casualty_attendance || null,
//       common_area_cleanliness: formData.common_area_cleanliness || null,
//       room_cleanliness: formData.room_cleanliness || null,
//       toilet_cleanliness: formData.toilet_cleanliness || null,
//       room_maintenance: formData.room_maintenance || null,
//       consultants: formData.consultants || null,
//       junior_doctors: formData.junior_doctors || null,
//       nursing_staff: formData.nursing_staff || null,
//       physiotherapy_staff: formData.physiotherapy_staff || null,
//       pharmacy_staff: formData.pharmacy_staff || null,
//       ward_ipc: formData.ward_ipc || null,
//       support_staff: formData.support_staff || null,
//       billing_staff: formData.billing_staff || null,
//       mediclaim_staff: formData.mediclaim_staff || null,
//       pantry_staff: formData.pantry_staff || null,
//       medical_assessment: formData.medical_assessment || null,
//       diagnostics: formData.diagnostics || null,
//       nursing_care: formData.nursing_care || null,
//       physiotherapy: formData.physiotherapy || null,
//       pharmacy_service: formData.pharmacy_service || null,
//       food_dietetics: formData.food_dietetics || null,
//       security: formData.security || null,
//       admission_process: formData.admission_process || null,
//       insurance_process: formData.insurance_process || null,
//       ot_process: formData.ot_process || null,
//       patient_shifting: formData.patient_shifting || null,
//       billing_process: formData.billing_process || null,
//       discharge_process: formData.discharge_process || null,
//       overall_experience: formData.overall_experience || null,

//       feedback: formData.feedback.trim() || null,
//       sign_name: formData.sign_name.trim() || null,

//       rating: calculateOverallRating(formData.overall_experience),
//       isapproved: false,
//     };
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       const payload = preparePayload();
//       console.log("📤 Submitting feedback:", payload);

//       const response = await createFeedback(payload);
//       console.log("✅ Feedback created:", response);

//       setIsSubmitted(true);

//       setTimeout(() => {
//         setFormData(initialFormState);
//         setIsSubmitted(false);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }, 3000);
//     } catch (error) {
//       console.error("❌ Submit error:", error);
//       setErrors({
//         submit: error.message || "Failed to submit feedback. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* ---------------- ANIMATIONS ---------------- */
//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="min-h-screen bg-mute py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       {/* SUCCESS TOAST */}
//       {isSubmitted && (
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="fixed top-6 left-0 right-0 mx-auto w-max z-50 bg-green-500 text-white rounded-lg shadow-2xl px-8 py-4 flex items-center gap-3"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           <span className="font-bold text-lg">
//             Feedback Submitted Successfully!
//           </span>
//         </motion.div>
//       )}

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeUp}
//         transition={{ duration: 0.6 }}
//         className="max-w-5xl mx-auto"
//       >
//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
//             IPD Suggestion / Feedback Form
//           </h1>
//           <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
//         </div>

//         {/* MAIN FORM CARD */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
//         >
//           {/* SECTION: PATIENT DETAILS */}
//           <div className="p-8 bg-mute border-b border-gray-100">
//             <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
//               <span className="bg-primary text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
//                 1
//               </span>
//               Patient Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Patient Name */}
//               <div className="lg:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Patient Name <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
//                     errors.fullname ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="Mrs. Manisha Kshirsagar"
//                 />
//                 {errors.fullname && (
//                   <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
//                 )}
//               </div>

//               {/* Mobile Number */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Mobile Number <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="mobilenumber"
//                   value={formData.mobilenumber}
//                   onChange={handleInputChange}
//                   maxLength={10}
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
//                     errors.mobilenumber ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="9876543210"
//                 />
//                 {errors.mobilenumber && (
//                   <p className="text-red-500 text-xs mt-1">{errors.mobilenumber}</p>
//                 )}
//               </div>

//               {/* PRN No */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   PRN No. <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="prn"
//                   value={formData.prn}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
//                     errors.prn ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="37858"
//                 />
//                 {errors.prn && (
//                   <p className="text-red-500 text-xs mt-1">{errors.prn}</p>
//                 )}
//               </div>

//               {/* IPD No */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   IPD No.
//                 </label>
//                 <input
//                   name="ipd_no"
//                   value={formData.ipd_no}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
//                   placeholder="2093"
//                 />
//               </div>

//               {/* Doctor Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Doctor Name
//                 </label>
//                 <input
//                   name="doctor_name"
//                   value={formData.doctor_name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
//                   placeholder="Dr. Narendra Vaidya"
//                 />
//               </div>

//               {/* Ward/Admission No */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Ward/Admission No.
//                 </label>
//                 <input
//                   name="ward_admission_no"
//                   value={formData.ward_admission_no}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
//                   placeholder="W-101"
//                 />
//               </div>

//               {/* Visit Date */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Visit Date
//                 </label>
//                 <input
//                   type="date"
//                   name="visit_date"
//                   value={formData.visit_date}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
//                 />
//               </div>

//               {/* Age & Gender */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="150"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
//                     placeholder="69"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white"
//                   >
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SECTION: RATINGS GRID */}
//           <div className="p-8">
//             <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
//               <span className="bg-primary text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
//                 2
//               </span>
//               Service Ratings
//             </h3>
//             <p className="text-gray-500 mb-8 text-sm">
//               Please tick the appropriate box reflecting your experience. Fields
//               marked with <span className="text-secondary">*</span> are required.
//             </p>

//             {/* Desktop Header for Ratings */}
//             <div className="hidden md:grid grid-cols-12 gap-4 border-b-2 border-primary/20 pb-4 mb-4 font-bold text-xs uppercase tracking-wider text-center text-primary">
//               <div className="col-span-4 text-left pl-2">Parameter</div>
//               <div className="col-span-8 grid grid-cols-5">
//                 {RATING_OPTIONS.map((opt) => (
//                   <div key={opt}>{opt.replace("_", " ")}</div>
//                 ))}
//               </div>
//             </div>

//             {formSections.map((section, sIdx) => (
//               <div key={sIdx} className="mb-8">
//                 <h4 className="font-bold text-primary bg-primary/10 p-2 rounded mb-3 border-l-4 border-secondary">
//                   {section.title}
//                 </h4>

//                 {section.fields.map((field, fIdx) => (
//                   <div
//                     key={fIdx}
//                     className={`group ${
//                       errors[field.key] ? "bg-red-50 p-2 rounded" : ""
//                     }`}
//                   >
//                     {/* Mobile View Label */}
//                     <div className="md:hidden font-semibold text-gray-700 mb-2 mt-4">
//                       {field.label}
//                       {field.required && (
//                         <span className="text-secondary ml-1">*</span>
//                       )}
//                       {errors[field.key] && (
//                         <span className="text-red-500 text-xs ml-2">
//                           Required
//                         </span>
//                       )}
//                     </div>

//                     <div className="md:grid md:grid-cols-12 md:gap-4 items-center py-3 border-b border-gray-100 hover:bg-mute transition-colors">
//                       {/* Desktop Label */}
//                       <div className="hidden md:block col-span-4 pl-2 font-medium text-gray-700">
//                         {field.label}
//                         {field.required && (
//                           <span className="text-secondary ml-1">*</span>
//                         )}
//                         {errors[field.key] && (
//                           <span className="text-red-500 text-xl ml-1 leading-none">
//                             !
//                           </span>
//                         )}
//                       </div>

//                       {/* Radio Buttons */}
//                       <div className="col-span-12 md:col-span-8 grid grid-cols-5 gap-2">
//                         {RATING_OPTIONS.map((option) => (
//                           <label
//                             key={option}
//                             className="flex flex-col items-center cursor-pointer"
//                           >
//                             <input
//                               type="radio"
//                               name={field.key}
//                               value={option}
//                               checked={formData[field.key] === option}
//                               onChange={() =>
//                                 handleRatingChange(field.key, option)
//                               }
//                               className="hidden peer"
//                             />
//                             {/* Custom Checkbox Design */}
//                             <div
//                               className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
//                                 formData[field.key] === option
//                                   ? "border-primary bg-primary"
//                                   : "border-gray-300 hover:border-secondary"
//                               }`}
//                             >
//                               {formData[field.key] === option && (
//                                 <svg
//                                   className="w-4 h-4 text-white"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="3"
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </svg>
//                               )}
//                             </div>
//                             <span className="md:hidden text-[10px] text-center mt-1 text-gray-500 font-medium">
//                               {option.replace("_", " ")}
//                             </span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* SECTION: FEEDBACK & SIGNATURE */}
//           <div className="p-8 bg-mute border-t border-gray-100">
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Any special appreciations / comments:
//               </label>
//               <textarea
//                 name="feedback"
//                 value={formData.feedback}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
//                 placeholder="Very good hospital and caring staff..."
//               />
//             </div>

//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//               <div className="w-full md:w-1/3">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Signature Name <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="sign_name"
//                   value={formData.sign_name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none italic ${
//                     errors.sign_name ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="Type name to sign"
//                 />
//                 {errors.sign_name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.sign_name}</p>
//                 )}
//               </div>

//               <div className="w-full md:w-auto">
//                 {errors.submit && (
//                   <p className="text-red-500 text-sm mb-2 text-center bg-red-50 p-2 rounded">
//                     {errors.submit}
//                   </p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-fadedblue hover:from-fadedblue hover:to-primary text-white font-bold rounded-lg shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                         />
//                       </svg>
//                       Submit Feedback
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>

//         <p className="text-center text-gray-400 text-sm mt-8 pb-8">
//           We thank you for your valuable feedback. We wish you good health!
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default FeedbackForm;


// import { useState } from "react";
// import { motion } from "framer-motion";
// import { createFeedback } from "../../api/userApi";

// const initialFormState = {
//   fullname: "",
//   mobilenumber: "",
//   prn: "",
//   ipd_no: "",
//   age: "",
//   gender: "",
//   doctor_name: "",
//   ward_admission_no: "",
//   visit_date: "",

//   allocation_of_bed: "",
//   staff_courtesy: "",
//   time_taken: "",
//   staff_efficiency: "",
//   casualty_attendance: "",
//   common_area_cleanliness: "",
//   room_cleanliness: "",
//   toilet_cleanliness: "",
//   room_maintenance: "",
//   consultants: "",
//   junior_doctors: "",
//   nursing_staff: "",
//   physiotherapy_staff: "",
//   pharmacy_staff: "",
//   ward_ipc: "",
//   support_staff: "",
//   billing_staff: "",
//   mediclaim_staff: "",
//   pantry_staff: "",
//   medical_assessment: "",
//   diagnostics: "",
//   nursing_care: "",
//   physiotherapy: "",
//   pharmacy_service: "",
//   food_dietetics: "",
//   security: "",
//   admission_process: "",
//   insurance_process: "",
//   ot_process: "",
//   patient_shifting: "",
//   billing_process: "",
//   discharge_process: "",
//   overall_experience: "",

//   feedback: "",
//   sign_name: "",
// };

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const RATING_OPTIONS = [
//     "EXCELLENT",
//     "GOOD",
//     "AVERAGE",
//     "POOR",
//     "NOT_APPLICABLE",
//   ];

//   const formSections = [
//     {
//       title: "1. Admission Process",
//       fields: [
//         { key: "allocation_of_bed", label: "Allocation of Bed", required: true },
//         { key: "staff_courtesy", label: "Staff Courtesy & Friendliness", required: true },
//         { key: "time_taken", label: "Time taken for the process", required: true },
//         { key: "staff_efficiency", label: "Staff Efficiency", required: false },
//         { key: "casualty_attendance", label: "Casualty Attendance", required: false },
//         { key: "admission_process", label: "General Admission Process", required: true },
//       ],
//     },
//     {
//       title: "2. Hospital Ambience",
//       fields: [
//         { key: "common_area_cleanliness", label: "Common Area Cleanliness", required: false },
//         { key: "room_cleanliness", label: "Room Cleanliness", required: true },
//         { key: "toilet_cleanliness", label: "Toilet Cleanliness", required: true },
//         { key: "room_maintenance", label: "Room Maintenance", required: false },
//       ],
//     },
//     {
//       title: "3. Interaction with Staff",
//       fields: [
//         { key: "consultants", label: "Consultants", required: true },
//         { key: "junior_doctors", label: "Junior Doctors", required: false },
//         { key: "nursing_staff", label: "Nursing Staff", required: true },
//         { key: "physiotherapy_staff", label: "Physiotherapy Staff", required: false },
//         { key: "pharmacy_staff", label: "Pharmacy Staff", required: false },
//         { key: "ward_ipc", label: "Ward In-charge", required: false },
//         { key: "support_staff", label: "Support Staff", required: false },
//         { key: "billing_staff", label: "Billing Staff", required: false },
//         { key: "mediclaim_staff", label: "Mediclaim Staff", required: false },
//         { key: "pantry_staff", label: "Pantry Staff", required: false },
//       ],
//     },
//     {
//       title: "4. Services & Medical",
//       fields: [
//         { key: "medical_assessment", label: "Medical Assessment", required: true },
//         { key: "diagnostics", label: "Diagnostics (Lab, Imaging)", required: true },
//         { key: "nursing_care", label: "Nursing Care", required: false },
//         { key: "physiotherapy", label: "Physiotherapy", required: false },
//         { key: "pharmacy_service", label: "Pharmacy Service", required: false },
//         { key: "food_dietetics", label: "Food & Dietetics", required: false },
//         { key: "security", label: "Security", required: false },
//       ],
//     },
//     {
//       title: "5. Processes",
//       fields: [
//         { key: "insurance_process", label: "Insurance Process", required: false },
//         { key: "ot_process", label: "OT Process", required: false },
//         { key: "patient_shifting", label: "Patient Shifting", required: false },
//         { key: "billing_process", label: "Billing Process", required: true },
//         { key: "discharge_process", label: "Discharge Process", required: false },
//       ],
//     },
//     {
//       title: "6. Overall Experience",
//       fields: [
//         { key: "overall_experience", label: "Overall Experience at Hospital", required: true },
//       ],
//     },
//   ];

//   /* ---------------- HANDLERS ---------------- */
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleRatingChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
//   };

//   /* ---------------- VALIDATION ---------------- */
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullname.trim()) newErrors.fullname = "Patient name is required";
//     if (!formData.mobilenumber.trim()) {
//       newErrors.mobilenumber = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
//       newErrors.mobilenumber = "Enter valid 10-digit number";
//     }
//     if (!formData.prn.trim()) newErrors.prn = "PRN is required";

//     formSections.forEach((section) => {
//       section.fields.forEach((field) => {
//         if (field.required && !formData[field.key]) {
//           newErrors[field.key] = "Required";
//         }
//       });
//     });

//     if (!formData.sign_name.trim()) newErrors.sign_name = "Signature name is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ---------------- CALCULATE RATING ---------------- */
//   const calculateOverallRating = (experience) => {
//     const ratingMap = {
//       EXCELLENT: 5,
//       GOOD: 4,
//       AVERAGE: 3,
//       POOR: 2,
//       NOT_APPLICABLE: 1,
//     };
//     return ratingMap[experience] || 3;
//   };

//   /* ---------------- PREPARE PAYLOAD ---------------- */
//   const preparePayload = () => {
//     return {
//       fullname: formData.fullname.trim(),
//       mobilenumber: formData.mobilenumber.trim(),
//       prn: formData.prn.trim() || null,
//       ipd_no: formData.ipd_no.trim() || null,
//       age: formData.age ? parseInt(formData.age) : null,
//       gender: formData.gender || null,
//       doctor_name: formData.doctor_name.trim() || null,
//       ward_admission_no: formData.ward_admission_no.trim() || null,
//       visit_date: formData.visit_date || null,

//       allocation_of_bed: formData.allocation_of_bed || null,
//       staff_courtesy: formData.staff_courtesy || null,
//       time_taken: formData.time_taken || null,
//       staff_efficiency: formData.staff_efficiency || null,
//       casualty_attendance: formData.casualty_attendance || null,
//       common_area_cleanliness: formData.common_area_cleanliness || null,
//       room_cleanliness: formData.room_cleanliness || null,
//       toilet_cleanliness: formData.toilet_cleanliness || null,
//       room_maintenance: formData.room_maintenance || null,
//       consultants: formData.consultants || null,
//       junior_doctors: formData.junior_doctors || null,
//       nursing_staff: formData.nursing_staff || null,
//       physiotherapy_staff: formData.physiotherapy_staff || null,
//       pharmacy_staff: formData.pharmacy_staff || null,
//       ward_ipc: formData.ward_ipc || null,
//       support_staff: formData.support_staff || null,
//       billing_staff: formData.billing_staff || null,
//       mediclaim_staff: formData.mediclaim_staff || null,
//       pantry_staff: formData.pantry_staff || null,
//       medical_assessment: formData.medical_assessment || null,
//       diagnostics: formData.diagnostics || null,
//       nursing_care: formData.nursing_care || null,
//       physiotherapy: formData.physiotherapy || null,
//       pharmacy_service: formData.pharmacy_service || null,
//       food_dietetics: formData.food_dietetics || null,
//       security: formData.security || null,
//       admission_process: formData.admission_process || null,
//       insurance_process: formData.insurance_process || null,
//       ot_process: formData.ot_process || null,
//       patient_shifting: formData.patient_shifting || null,
//       billing_process: formData.billing_process || null,
//       discharge_process: formData.discharge_process || null,
//       overall_experience: formData.overall_experience || null,

//       feedback: formData.feedback.trim() || null,
//       sign_name: formData.sign_name.trim() || null,

//       rating: calculateOverallRating(formData.overall_experience),
//       isapproved: false,
//     };
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       const payload = preparePayload();
//       console.log("📤 Submitting feedback:", payload);

//       const response = await createFeedback(payload);
//       console.log("✅ Feedback created:", response);

//       setIsSubmitted(true);

//       setTimeout(() => {
//         setFormData(initialFormState);
//         setIsSubmitted(false);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }, 3000);
//     } catch (error) {
//       console.error("❌ Submit error:", error);
//       setErrors({
//         submit: error.message || "Failed to submit feedback. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* ---------------- ANIMATIONS ---------------- */
//   const fadeUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const staggerItem = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={fadeUp}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="w-full max-w-5xl mx-auto pt-32 pb-20 px-5"
//     >
//       {/* SUCCESS TOAST */}
//       {isSubmitted && (
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.4 }}
//           className="fixed top-6 right-6 z-50 bg-white rounded-xl border border-green-300 shadow-lg px-5 py-4"
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">
//                 Feedback Submitted
//               </p>
//               <p className="text-sm text-gray-500">
//                 Thank you for your valuable feedback.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* HEADER */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ delay: 0.1, duration: 0.8 }}
//         className="text-center mb-10"
//       >
//         <h2 className="text-4xl font-bold font-quicksand text-primary">
//           IPD Suggestion / Feedback Form
//         </h2>
//         <div className="h-1.5 rounded bg-secondary w-32 mt-3 mb-3 mx-auto" />
//         <p className="text-gray-500">
//           Your feedback helps us improve our services
//         </p>
//       </motion.div>

//       {/* MAIN FORM CARD */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 0.8 }}
//         className="bg-gradient-to-br from-mute to-accent/30 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-100"
//       >
//         <form onSubmit={handleSubmit}>
//           {/* SECTION: PATIENT DETAILS */}
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="p-8 border-b border-white/50"
//           >
//             <motion.h3
//               variants={staggerItem}
//               className="text-xl font-bold text-primary mb-6 flex items-center gap-3"
//             >
//               <span className="bg-gradient-to-r from-primary to-secondary text-white text-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md">
//                 1
//               </span>
//               Patient Details
//             </motion.h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Patient Name */}
//               <motion.div variants={staggerItem} className="lg:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Patient Name <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
//                     errors.fullname ? "border-red-400 bg-red-50" : "border-gray-200"
//                   }`}
//                   placeholder="Mrs. Manisha Kshirsagar"
//                 />
//                 {errors.fullname && (
//                   <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
//                 )}
//               </motion.div>

//               {/* Mobile Number */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Mobile Number <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="mobilenumber"
//                   value={formData.mobilenumber}
//                   onChange={handleInputChange}
//                   maxLength={10}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
//                     errors.mobilenumber ? "border-red-400 bg-red-50" : "border-gray-200"
//                   }`}
//                   placeholder="9876543210"
//                 />
//                 {errors.mobilenumber && (
//                   <p className="text-red-500 text-xs mt-1">{errors.mobilenumber}</p>
//                 )}
//               </motion.div>

//               {/* PRN No */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   PRN No. <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="prn"
//                   value={formData.prn}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
//                     errors.prn ? "border-red-400 bg-red-50" : "border-gray-200"
//                   }`}
//                   placeholder="37858"
//                 />
//                 {errors.prn && (
//                   <p className="text-red-500 text-xs mt-1">{errors.prn}</p>
//                 )}
//               </motion.div>

//               {/* IPD No */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   IPD No.
//                 </label>
//                 <input
//                   name="ipd_no"
//                   value={formData.ipd_no}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                   placeholder="2093"
//                 />
//               </motion.div>

//               {/* Doctor Name */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Doctor Name
//                 </label>
//                 <input
//                   name="doctor_name"
//                   value={formData.doctor_name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                   placeholder="Dr. Narendra Vaidya"
//                 />
//               </motion.div>

//               {/* Ward/Admission No */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Ward/Admission No.
//                 </label>
//                 <input
//                   name="ward_admission_no"
//                   value={formData.ward_admission_no}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                   placeholder="W-101"
//                 />
//               </motion.div>

//               {/* Visit Date */}
//               <motion.div variants={staggerItem}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Visit Date
//                 </label>
//                 <input
//                   type="date"
//                   name="visit_date"
//                   value={formData.visit_date}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                 />
//               </motion.div>

//               {/* Age & Gender */}
//               <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="150"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                     placeholder="69"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm"
//                   >
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* SECTION: RATINGS GRID */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.1 }}
//             transition={{ duration: 0.6 }}
//             className="p-8"
//           >
//             <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-3">
//               <span className="bg-gradient-to-r from-primary to-secondary text-white text-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md">
//                 2
//               </span>
//               Service Ratings
//             </h3>
//             <p className="text-gray-500 mb-8 text-sm ml-11">
//               Please select the appropriate rating for each parameter. Fields marked with{" "}
//               <span className="text-secondary font-bold">*</span> are required.
//             </p>

//             {/* Desktop Header for Ratings */}
//             <div className="hidden md:grid grid-cols-12 gap-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-4 mb-4 font-bold text-xs uppercase tracking-wider text-center shadow-lg">
//               <div className="col-span-4 text-left pl-2">Parameter</div>
//               <div className="col-span-8 grid grid-cols-5">
//                 {RATING_OPTIONS.map((opt) => (
//                   <div key={opt} className="text-[10px]">
//                     {opt.replace("_", " ")}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {formSections.map((section, sIdx) => (
//               <motion.div
//                 key={sIdx}
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.5, delay: sIdx * 0.1 }}
//                 className="mb-6"
//               >
//                 <h4 className="font-bold text-primary bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-xl mb-3 border-l-4 border-secondary shadow-sm">
//                   {section.title}
//                 </h4>

//                 {section.fields.map((field, fIdx) => (
//                   <motion.div
//                     key={fIdx}
//                     initial={{ opacity: 0, y: 10 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: fIdx * 0.05 }}
//                     className={`group ${
//                       errors[field.key] ? "bg-red-50/80 p-3 rounded-xl" : ""
//                     }`}
//                   >
//                     {/* Mobile View Label */}
//                     <div className="md:hidden font-semibold text-gray-700 mb-2 mt-4">
//                       {field.label}
//                       {field.required && (
//                         <span className="text-secondary ml-1">*</span>
//                       )}
//                       {errors[field.key] && (
//                         <span className="text-red-500 text-xs ml-2">Required</span>
//                       )}
//                     </div>

//                     <div className="md:grid md:grid-cols-12 md:gap-4 items-center py-3 border-b border-gray-100/50 hover:bg-white/50 transition-all rounded-lg px-2">
//                       {/* Desktop Label */}
//                       <div className="hidden md:block col-span-4 pl-2 font-medium text-gray-700">
//                         {field.label}
//                         {field.required && (
//                           <span className="text-secondary ml-1">*</span>
//                         )}
//                         {errors[field.key] && (
//                           <span className="text-red-500 text-xl ml-1 leading-none">!</span>
//                         )}
//                       </div>

//                       {/* Radio Buttons */}
//                       <div className="col-span-12 md:col-span-8 grid grid-cols-5 gap-2">
//                         {RATING_OPTIONS.map((option) => (
//                           <label
//                             key={option}
//                             className="flex flex-col items-center cursor-pointer group/radio"
//                           >
//                             <input
//                               type="radio"
//                               name={field.key}
//                               value={option}
//                               checked={formData[field.key] === option}
//                               onChange={() => handleRatingChange(field.key, option)}
//                               className="hidden"
//                             />
//                             {/* Custom Radio Design */}
//                             <div
//                               className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
//                                 formData[field.key] === option
//                                   ? "border-primary bg-gradient-to-r from-primary to-secondary scale-110"
//                                   : "border-gray-300 bg-white hover:border-secondary hover:scale-105 group-hover/radio:border-secondary"
//                               }`}
//                             >
//                               {formData[field.key] === option && (
//                                 <motion.svg
//                                   initial={{ scale: 0 }}
//                                   animate={{ scale: 1 }}
//                                   className="w-4 h-4 text-white"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="3"
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </motion.svg>
//                               )}
//                             </div>
//                             <span className="md:hidden text-[9px] text-center mt-1 text-gray-500 font-medium">
//                               {option.replace("_", " ")}
//                             </span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* SECTION: FEEDBACK & SIGNATURE */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="p-8 bg-gradient-to-r from-white/50 to-accent/20 border-t border-white/50"
//           >
//             <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
//               <span className="bg-gradient-to-r from-primary to-secondary text-white text-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md">
//                 3
//               </span>
//               Additional Comments
//             </h3>

//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Any special appreciations / comments:
//               </label>
//               <textarea
//                 name="feedback"
//                 value={formData.feedback}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all bg-white/70 backdrop-blur-sm"
//                 placeholder="Very good hospital and caring staff..."
//               />
//             </div>

//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//               <motion.div
//                 variants={staggerItem}
//                 className="w-full md:w-1/3"
//               >
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Signature Name <span className="text-secondary">*</span>
//                 </label>
//                 <input
//                   name="sign_name"
//                   value={formData.sign_name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none italic transition-all bg-white/70 backdrop-blur-sm ${
//                     errors.sign_name ? "border-red-400 bg-red-50" : "border-gray-200"
//                   }`}
//                   placeholder="Type name to sign"
//                 />
//                 {errors.sign_name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.sign_name}</p>
//                 )}
//               </motion.div>

//               <div className="w-full md:w-auto">
//                 {errors.submit && (
//                   <p className="text-red-500 text-sm mb-2 text-center bg-red-50 p-2 rounded-xl">
//                     {errors.submit}
//                   </p>
//                 )}

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-6 h-6"
//                         fill="none"
//                         strokeWidth="2"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                         />
//                       </svg>
//                       Submit Feedback
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </form>
//       </motion.div>

//       {/* FOOTER TEXT */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 0.5 }}
//         className="text-center text-gray-400 text-sm mt-8"
//       >
//         We thank you for your valuable feedback. We wish you good health! 🏥
//       </motion.p>
//     </motion.div>
//   );
// };

// export default FeedbackForm;


import { useState } from "react";
import { motion } from "framer-motion";
import { createFeedback } from "../../api/userApi";

const initialFormState = {
  fullname: "",
  mobilenumber: "",
  prn: "",
  ipd_no: "",
  age: "",
  gender: "",
  doctor_name: "",
  ward_admission_no: "",
  visit_date: "",

  allocation_of_bed: "",
  staff_courtesy: "",
  time_taken: "",
  staff_efficiency: "",
  casualty_attendance: "",
  common_area_cleanliness: "",
  room_cleanliness: "",
  toilet_cleanliness: "",
  room_maintenance: "",
  consultants: "",
  junior_doctors: "",
  nursing_staff: "",
  physiotherapy_staff: "",
  pharmacy_staff: "",
  ward_ipc: "",
  support_staff: "",
  billing_staff: "",
  mediclaim_staff: "",
  pantry_staff: "",
  medical_assessment: "",
  diagnostics: "",
  nursing_care: "",
  physiotherapy: "",
  pharmacy_service: "",
  food_dietetics: "",
  security: "",
  admission_process: "",
  insurance_process: "",
  ot_process: "",
  patient_shifting: "",
  billing_process: "",
  discharge_process: "",
  overall_experience: "",

  feedback: "",
  sign_name: "",
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const RATING_OPTIONS = [
    { value: "EXCELLENT", label: "Excellent", shortLabel: "EXC" },
    { value: "GOOD", label: "Good", shortLabel: "GOOD" },
    { value: "AVERAGE", label: "Average", shortLabel: "AVG" },
    { value: "POOR", label: "Poor", shortLabel: "POOR" },
    { value: "NOT_APPLICABLE", label: "N/A", shortLabel: "N/A" },
  ];

  const formSections = [
    {
      title: "1. Admission Process",
      fields: [
        { key: "allocation_of_bed", label: "Allocation of Bed" },
        { key: "staff_courtesy", label: "Staff Courtesy & Friendliness" },
        { key: "time_taken", label: "Time taken for the process" },
        { key: "staff_efficiency", label: "Staff Efficiency" },
        { key: "casualty_attendance", label: "Casualty Attendance" },
      ],
    },
    {
      title: "2. Hospital Ambience",
      fields: [
        { key: "common_area_cleanliness", label: "Common Area Cleanliness" },
        { key: "room_cleanliness", label: "Room Cleanliness" },
        { key: "toilet_cleanliness", label: "Toilet Cleanliness" },
        { key: "room_maintenance", label: "Room Maintenance" },
      ],
    },
    {
      title: "3. Interaction with Staff",
      fields: [
        { key: "consultants", label: "Consultants" },
        { key: "junior_doctors", label: "Junior Doctors" },
        { key: "nursing_staff", label: "Nursing Staff" },
        { key: "physiotherapy_staff", label: "Physiotherapy Staff" },
        { key: "pharmacy_staff", label: "Pharmacy Staff" },
        { key: "ward_ipc", label: "Ward In-charge" },
        { key: "support_staff", label: "Support Staff" },
        { key: "billing_staff", label: "Billing Staff" },
        { key: "mediclaim_staff", label: "Mediclaim Staff" },
        { key: "pantry_staff", label: "Pantry Staff" },
      ],
    },
    {
      title: "4. Services & Medical",
      fields: [
        { key: "medical_assessment", label: "Medical Assessment" },
        { key: "diagnostics", label: "Diagnostics (Lab, Imaging)" },
        { key: "nursing_care", label: "Nursing Care" },
        { key: "physiotherapy", label: "Physiotherapy" },
        { key: "pharmacy_service", label: "Pharmacy Service" },
        { key: "food_dietetics", label: "Food & Dietetics" },
        { key: "security", label: "Security" },
      ],
    },
    {
      title: "5. Processes",
      fields: [
        { key: "admission_process", label: "Admission Process" },
        { key: "insurance_process", label: "Insurance Process" },
        { key: "ot_process", label: "OT Process" },
        { key: "patient_shifting", label: "Patient Shifting" },
        { key: "billing_process", label: "Billing Process" },
        { key: "discharge_process", label: "Discharge Process" },
      ],
    },
    {
      title: "6. Overall Experience",
      fields: [
        { key: "overall_experience", label: "Overall Experience at Hospital" },
      ],
    },
  ];

  /* ---------------- HANDLERS ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRatingChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const newErrors = {};

    // Patient Details Validation - All Required
    if (!formData.fullname.trim()) newErrors.fullname = "Patient name is required";
    if (!formData.mobilenumber.trim()) {
      newErrors.mobilenumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = "Enter valid 10-digit number";
    }
    if (!formData.prn.trim()) newErrors.prn = "PRN is required";
    if (!formData.ipd_no.trim()) newErrors.ipd_no = "IPD No. is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.doctor_name.trim()) newErrors.doctor_name = "Doctor name is required";
    if (!formData.ward_admission_no.trim()) newErrors.ward_admission_no = "Ward/Admission No. is required";
    if (!formData.visit_date) newErrors.visit_date = "Visit date is required";

    // All Rating Fields - Required
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (!formData[field.key]) {
          newErrors[field.key] = "Required";
        }
      });
    });

    // Feedback and Signature - Required
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";
    if (!formData.sign_name.trim()) newErrors.sign_name = "Signature name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- CALCULATE RATING ---------------- */
  const calculateOverallRating = (experience) => {
    const ratingMap = {
      EXCELLENT: 5,
      GOOD: 4,
      AVERAGE: 3,
      POOR: 2,
      NOT_APPLICABLE: 1,
    };
    return ratingMap[experience] || 3;
  };

  /* ---------------- PREPARE PAYLOAD ---------------- */
  const preparePayload = () => {
    return {
      fullname: formData.fullname.trim(),
      mobilenumber: formData.mobilenumber.trim(),
      prn: formData.prn.trim(),
      ipd_no: formData.ipd_no.trim(),
      age: parseInt(formData.age),
      gender: formData.gender,
      doctor_name: formData.doctor_name.trim(),
      ward_admission_no: formData.ward_admission_no.trim(),
      visit_date: formData.visit_date,

      allocation_of_bed: formData.allocation_of_bed,
      staff_courtesy: formData.staff_courtesy,
      time_taken: formData.time_taken,
      staff_efficiency: formData.staff_efficiency,
      casualty_attendance: formData.casualty_attendance,
      common_area_cleanliness: formData.common_area_cleanliness,
      room_cleanliness: formData.room_cleanliness,
      toilet_cleanliness: formData.toilet_cleanliness,
      room_maintenance: formData.room_maintenance,
      consultants: formData.consultants,
      junior_doctors: formData.junior_doctors,
      nursing_staff: formData.nursing_staff,
      physiotherapy_staff: formData.physiotherapy_staff,
      pharmacy_staff: formData.pharmacy_staff,
      ward_ipc: formData.ward_ipc,
      support_staff: formData.support_staff,
      billing_staff: formData.billing_staff,
      mediclaim_staff: formData.mediclaim_staff,
      pantry_staff: formData.pantry_staff,
      medical_assessment: formData.medical_assessment,
      diagnostics: formData.diagnostics,
      nursing_care: formData.nursing_care,
      physiotherapy: formData.physiotherapy,
      pharmacy_service: formData.pharmacy_service,
      food_dietetics: formData.food_dietetics,
      security: formData.security,
      admission_process: formData.admission_process,
      insurance_process: formData.insurance_process,
      ot_process: formData.ot_process,
      patient_shifting: formData.patient_shifting,
      billing_process: formData.billing_process,
      discharge_process: formData.discharge_process,
      overall_experience: formData.overall_experience,

      feedback: formData.feedback.trim(),
      sign_name: formData.sign_name.trim(),

      rating: calculateOverallRating(formData.overall_experience),
      isapproved: false,
    };
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = preparePayload();
      console.log("📤 Submitting feedback:", payload);

      const response = await createFeedback(payload);
      console.log("✅ Feedback created:", response);

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData(initialFormState);
        setIsSubmitted(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3000);
    } catch (error) {
      console.error("❌ Submit error:", error);
      setErrors({
        submit: error.message || "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- ANIMATIONS ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Count total errors for display
  const errorCount = Object.keys(errors).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto pt-24 sm:pt-32 pb-12 sm:pb-20 px-3 sm:px-5"
    >
      {/* SUCCESS TOAST */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 z-50 bg-white rounded-xl border border-green-300 shadow-2xl px-4 sm:px-6 py-4 w-[90%] sm:w-auto max-w-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Feedback Submitted Successfully!
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Thank you for your valuable feedback.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ERROR SUMMARY BANNER */}
      {errorCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-800">
                Please fill all required fields
              </p>
              <p className="text-sm text-red-600">
                {errorCount} field{errorCount > 1 ? "s" : ""} need{errorCount === 1 ? "s" : ""} your attention
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
        className="text-center mb-6 mt-10 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-quicksand text-primary px-2">
          IPD Suggestion / Feedback Form
        </h2>
        <div className="h-1 sm:h-1.5 rounded bg-secondary w-24 sm:w-32 mt-3 mb-3 mx-auto" />
        <p className="text-gray-500 text-sm sm:text-base px-4">
          Your feedback helps us improve our services
        </p>
        <p className="text-xs text-red-500 mt-2">
          * All fields are mandatory
        </p>
      </motion.div>

      {/* MAIN FORM CARD */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-mute to-accent/30 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-100"
      >
        <form onSubmit={handleSubmit}>
          {/* SECTION: PATIENT DETAILS */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-4 sm:p-6 md:p-8 border-b border-white/50"
          >
            <motion.h3
              variants={staggerItem}
              className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
            >
              <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md">
                1
              </span>
              Patient Details
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Patient Name */}
              <motion.div variants={staggerItem} className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Patient Name <span className="text-secondary">*</span>
                </label>
                <input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.fullname ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter patient name"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
                )}
              </motion.div>

              {/* Mobile Number */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Mobile Number <span className="text-secondary">*</span>
                </label>
                <input
                  name="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={handleInputChange}
                  maxLength={10}
                  inputMode="numeric"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.mobilenumber ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="0000000000"
                />
                {errors.mobilenumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobilenumber}</p>
                )}
              </motion.div>

              {/* PRN No */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  PRN No. <span className="text-secondary">*</span>
                </label>
                <input
                  name="prn"
                  value={formData.prn}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.prn ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter PRN"
                />
                {errors.prn && (
                  <p className="text-red-500 text-xs mt-1">{errors.prn}</p>
                )}
              </motion.div>

              {/* IPD No */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  IPD No. <span className="text-secondary">*</span>
                </label>
                <input
                  name="ipd_no"
                  value={formData.ipd_no}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.ipd_no ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter IPD No."
                />
                {errors.ipd_no && (
                  <p className="text-red-500 text-xs mt-1">{errors.ipd_no}</p>
                )}
              </motion.div>

              {/* Doctor Name */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Doctor Name <span className="text-secondary">*</span>
                </label>
                <input
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.doctor_name ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter doctor name"
                />
                {errors.doctor_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.doctor_name}</p>
                )}
              </motion.div>

              {/* Ward/Admission No */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Ward/Admission No. <span className="text-secondary">*</span>
                </label>
                <input
                  name="ward_admission_no"
                  value={formData.ward_admission_no}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.ward_admission_no ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter ward/admission no."
                />
                {errors.ward_admission_no && (
                  <p className="text-red-500 text-xs mt-1">{errors.ward_admission_no}</p>
                )}
              </motion.div>

              {/* Visit Date */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Visit Date <span className="text-secondary">*</span>
                </label>
                <input
                  type="date"
                  name="visit_date"
                  value={formData.visit_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.visit_date ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors.visit_date && (
                  <p className="text-red-500 text-xs mt-1">{errors.visit_date}</p>
                )}
              </motion.div>

              {/* Age */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Age <span className="text-secondary">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                  max="150"
                  inputMode="numeric"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.age ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </motion.div>

              {/* Gender */}
              <motion.div variants={staggerItem}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Gender <span className="text-secondary">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white/70 backdrop-blur-sm ${
                    errors.gender ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* SECTION: RATINGS GRID */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2 sm:gap-3">
              <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md">
                2
              </span>
              Service Ratings
            </h3>
            <p className="text-gray-500 mb-6 sm:mb-8 text-xs sm:text-sm ml-8 sm:ml-11">
              Please select the appropriate rating for each parameter.
              <span className="text-secondary font-bold ml-1">All fields are required.</span>
            </p>

            {/* Desktop Header for Ratings */}
            <div className="hidden lg:grid grid-cols-12 gap-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-4 mb-4 font-bold text-xs uppercase tracking-wider text-center shadow-lg">
              <div className="col-span-4 text-left pl-2">Parameter</div>
              <div className="col-span-8 grid grid-cols-5">
                {RATING_OPTIONS.map((opt) => (
                  <div key={opt.value} className="text-[10px] sm:text-xs">
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet Header */}
            <div className="hidden sm:grid lg:hidden grid-cols-6 gap-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-3 mb-4 font-bold text-[10px] uppercase tracking-wider text-center shadow-lg">
              <div className="col-span-1 text-left pl-2">Parameter</div>
              {RATING_OPTIONS.map((opt) => (
                <div key={opt.value}>{opt.shortLabel}</div>
              ))}
            </div>

            {formSections.map((section, sIdx) => (
              <motion.div
                key={sIdx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                className="mb-4 sm:mb-6"
              >
                <h4 className="font-bold text-primary text-sm sm:text-base bg-gradient-to-r from-primary/10 to-secondary/10 p-2 sm:p-3 rounded-lg sm:rounded-xl mb-2 sm:mb-3 border-l-4 border-secondary shadow-sm">
                  {section.title}
                </h4>

                {section.fields.map((field, fIdx) => (
                  <motion.div
                    key={fIdx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fIdx * 0.05 }}
                    className={`group ${
                      errors[field.key] ? "bg-red-50/80 rounded-lg sm:rounded-xl" : ""
                    }`}
                  >
                    {/* Mobile View - Card Style */}
                    <div className="sm:hidden p-3 border-b border-gray-100/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-700 text-sm flex-1 pr-2">
                          {field.label}
                          <span className="text-secondary ml-1">*</span>
                        </span>
                        {errors[field.key] && (
                          <span className="text-red-500 text-xs bg-red-100 px-2 py-0.5 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {RATING_OPTIONS.map((option) => (
                          <label
                            key={option.value}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={field.key}
                              value={option.value}
                              checked={formData[field.key] === option.value}
                              onChange={() => handleRatingChange(field.key, option.value)}
                              className="hidden"
                            />
                            <div
                              className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                                formData[field.key] === option.value
                                  ? "border-primary bg-primary scale-110"
                                  : "border-gray-300 bg-white active:scale-95"
                              }`}
                            >
                              {formData[field.key] === option.value && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="text-[8px] text-center mt-1 text-gray-500 font-medium leading-tight">
                              {option.shortLabel}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Tablet View */}
                    <div className="hidden sm:grid lg:hidden grid-cols-6 gap-2 items-center py-2 px-2 border-b border-gray-100/50 hover:bg-white/50 transition-all rounded-lg">
                      <div className="col-span-1 text-xs font-medium text-gray-700 pr-2">
                        {field.label}
                        <span className="text-secondary ml-0.5">*</span>
                        {errors[field.key] && (
                          <span className="text-red-500 ml-1">!</span>
                        )}
                      </div>
                      {RATING_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className="flex justify-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={field.key}
                            value={option.value}
                            checked={formData[field.key] === option.value}
                            onChange={() => handleRatingChange(field.key, option.value)}
                            className="hidden"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              formData[field.key] === option.value
                                ? "border-primary bg-gradient-to-r from-primary to-secondary"
                                : "border-gray-300 bg-white hover:border-secondary"
                            }`}
                          >
                            {formData[field.key] === option.value && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100/50 hover:bg-white/50 transition-all rounded-lg px-2">
                      <div className="col-span-4 pl-2 font-medium text-gray-700 text-sm">
                        {field.label}
                        <span className="text-secondary ml-1">*</span>
                        {errors[field.key] && (
                          <span className="text-red-500 text-xl ml-1 leading-none">!</span>
                        )}
                      </div>
                      <div className="col-span-8 grid grid-cols-5 gap-2">
                        {RATING_OPTIONS.map((option) => (
                          <label
                            key={option.value}
                            className="flex flex-col items-center cursor-pointer group/radio"
                          >
                            <input
                              type="radio"
                              name={field.key}
                              value={option.value}
                              checked={formData[field.key] === option.value}
                              onChange={() => handleRatingChange(field.key, option.value)}
                              className="hidden"
                            />
                            <div
                              className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
                                formData[field.key] === option.value
                                  ? "border-primary bg-primary scale-110"
                                  : "border-gray-300 bg-white hover:border-secondary hover:scale-105 group-hover/radio:border-secondary"
                              }`}
                            >
                              {formData[field.key] === option.value && (
                                <motion.svg
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </motion.svg>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* SECTION: FEEDBACK & SIGNATURE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-white/50 to-accent/20 border-t border-white/50"
          >
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md">
                3
              </span>
              Additional Comments & Signature
            </h3>

            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Any special appreciations / comments: <span className="text-secondary">*</span>
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all bg-white/70 backdrop-blur-sm ${
                  errors.feedback ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
                placeholder="Please share your experience, suggestions, or any special appreciation..."
              />
              {errors.feedback && (
                <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <motion.div variants={staggerItem} className="w-full sm:w-1/2 lg:w-1/3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Signature Name <span className="text-secondary">*</span>
                </label>
                <input
                  name="sign_name"
                  value={formData.sign_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none italic transition-all bg-white/70 backdrop-blur-sm ${
                    errors.sign_name ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Type your name as signature"
                />
                {errors.sign_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.sign_name}</p>
                )}
              </motion.div>

              <div className="w-full">
                {errors.submit && (
                  <p className="text-red-500 text-sm mb-3 text-center bg-red-50 p-3 rounded-xl">
                    {errors.submit}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
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
              </div>
            </div>
          </motion.div>
        </form>
      </motion.div>

      {/* FOOTER TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 px-4"
      >
        We thank you for your valuable feedback. We wish you good health! 🏥
      </motion.p>
    </motion.div>
  );
};

export default FeedbackForm;