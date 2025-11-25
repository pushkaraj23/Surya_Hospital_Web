// import { useState, useEffect } from "react";
// import {
//   FiUser,
//   FiPhone,
//   FiMail,
//   FiCalendar,
//   FiClock,
//   FiMessageCircle,
//   FiArrowRight,
//   FiCheck
// } from "react-icons/fi";
// import { MdBusinessCenter, MdLocalHospital } from "react-icons/md";
// import {
//   fetchDepartments,
//   getDoctors,
//   createAppointment
// } from "../../api/userApi";

// const AppointmentBooking = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     email: "",
//     department: "",
//     doctor: "",
//     preferredDate: "",
//     time: "",
//     message: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Load departments + doctors
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const [deptsData, docsData] = await Promise.all([
//           fetchDepartments(),
//           getDoctors()
//         ]);

//         setDepartments(deptsData);
//         setDoctors(docsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // Filter doctors by department
//   useEffect(() => {
//     if (formData.department) {
//       const filtered = doctors.filter(
//         (doctor) =>
//           doctor.departmentid === parseInt(formData.department)
//       );
//       setFilteredDoctors(filtered);
//     } else {
//       setFilteredDoctors([]);
//     }
//   }, [formData.department, doctors]);

//   // Input handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   // Validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim())
//       newErrors.fullName = "Full name is required";

//     if (!formData.mobileNumber.trim())
//       newErrors.mobileNumber = "Mobile number is required";
//     else if (!/^\d{10}$/.test(formData.mobileNumber))
//       newErrors.mobileNumber = "Enter valid 10-digit mobile number";

//     if (
//       formData.email &&
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     )
//       newErrors.email = "Enter valid email";

//     if (!formData.department)
//       newErrors.department = "Select a department";

//     if (!formData.doctor)
//       newErrors.doctor = "Select a doctor";

//     if (!formData.preferredDate)
//       newErrors.preferredDate = "Select a date";

//     if (!formData.time)
//       newErrors.time = "Select a time slot";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const appointmentData = {
//       fullName: formData.fullName,
//       mobilenumber: formData.mobileNumber,
//       email: formData.email || null,
//       departmentid: parseInt(formData.department),
//       doctorid: parseInt(formData.doctor),
//       preferreddate: formData.preferredDate,
//       preferredtime: formData.time,
//       message: formData.message || null,
//       status: "pending"
//     };

//     try {
//       await createAppointment(appointmentData);
//       setIsSubmitted(true);

//       // Auto reset
//       setTimeout(() => {
//         setIsSubmitted(false);
//       }, 3000);

//       setFormData({
//         fullName: "",
//         mobileNumber: "",
//         email: "",
//         department: "",
//         doctor: "",
//         preferredDate: "",
//         time: "",
//         message: ""
//       });
//       setFilteredDoctors([]);
//     } catch (error) {
//       setErrors({
//         submit:
//           error.message ||
//           "Failed to book appointment. Please try again."
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Helpers
//   const getDoctorName = (doctorId) => {
//     const doctor = doctors.find(
//       (d) => d.id === parseInt(doctorId)
//     );
//     return doctor ? doctor.fullname : "";
//   };

//   const getDepartmentName = (deptId) => {
//     const dept = departments.find(
//       (d) => d.id === parseInt(deptId)
//     );
//     return dept ? dept.name : "";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-16 w-16 border-b-2 border-amber-600 rounded-full mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">
//             Loading Appointment Form...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto mt-20 py-20">

//         {/* SUCCESS POPUP MODAL */}
//         {isSubmitted && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center animate-fadeIn">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 Appointment Booked Successfully!
//               </h2>

//               <p className="text-gray-600 mb-4">
//                 Your appointment with{" "}
//                 <strong>{getDoctorName(formData.doctor)}</strong>{" "}
//                 from <strong>{getDepartmentName(formData.department)}</strong>{" "}
//                 department is scheduled.
//               </p>

//               <p className="text-gray-600 mb-2">
//                 <strong>Date:</strong>{" "}
//                 {new Date(
//                   formData.preferredDate
//                 ).toLocaleDateString()}
//               </p>

//               <p className="text-gray-600 mb-6">
//                 <strong>Time:</strong> {formData.time}
//               </p>

//               <button
//                 onClick={() => setIsSubmitted(false)}
//                 className="bg-amber-600 text-white px-6 py-2 rounded-lg shadow hover:bg-amber-700 transition"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         )}

//         {/* PAGE HEADER */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Book Your Appointment
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Schedule your visit with our expert medical team.
//           </p>
//         </div>

//         {/* MAIN CARD */}
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3">

//             {/* LEFT SIDEBAR */}
//             <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white p-8 lg:p-10">
//               <h3 className="text-xl font-bold mb-6">
//                 Why Choose Our Hospital?
//               </h3>

//               <div className="space-y-6">
//                 {[ "Expert Doctors", "Quick Appointments", "24/7 Support" ].map(
//                   (item, i) => (
//                     <div
//                       key={i}
//                       className="flex items-start space-x-3"
//                     >
//                       <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
//                         <FiCheck className="text-white text-sm" />
//                       </div>
//                       <p className="font-semibold">
//                         {item}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* RIGHT FORM */}
//             <div className="lg:col-span-2 p-8">
//               {errors.submit && (
//                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-600 text-sm">
//                     {errors.submit}
//                   </p>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">

//                 {/* PERSONAL INFO */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                     <FiUser className="mr-2 text-amber-600" />
//                     Personal Information
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                     {/* FULL NAME */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Full Name *
//                       </label>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.fullName
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                       {errors.fullName && (
//                         <p className="text-red-500 text-sm">
//                           {errors.fullName}
//                         </p>
//                       )}
//                     </div>

//                     {/* MOBILE NUMBER */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Mobile Number *
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="tel"
//                           name="mobileNumber"
//                           value={formData.mobileNumber}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.mobileNumber
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           placeholder="10-digit mobile number"
//                         />
//                       </div>
//                       {errors.mobileNumber && (
//                         <p className="text-red-500 text-sm">
//                           {errors.mobileNumber}
//                         </p>
//                       )}
//                     </div>

//                     {/* EMAIL */}
//                     <div className="md:col-span-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.email
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           placeholder="Enter your email (optional)"
//                         />
//                       </div>
//                       {errors.email && (
//                         <p className="text-red-500 text-sm">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* MEDICAL INFO */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                     <MdLocalHospital className="mr-2 text-amber-600" />
//                     Medical Information
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                     {/* DEPARTMENT */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Department *
//                       </label>
//                       <div className="relative">
//                         <MdBusinessCenter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <select
//                           name="department"
//                           value={formData.department}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.department
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         >
//                           <option value="">Select Department</option>
//                           {departments.map((dept) => (
//                             <option key={dept.id} value={dept.id}>
//                               {dept.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       {errors.department && (
//                         <p className="text-red-500 text-sm">
//                           {errors.department}
//                         </p>
//                       )}
//                     </div>

//                     {/* DOCTOR */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Doctor *
//                       </label>
//                       <div className="relative">
//                         <MdLocalHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <select
//                           name="doctor"
//                           value={formData.doctor}
//                           onChange={handleInputChange}
//                           disabled={
//                             !formData.department ||
//                             filteredDoctors.length === 0
//                           }
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.doctor
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           } ${
//                             !formData.department ||
//                             filteredDoctors.length === 0
//                               ? "opacity-50 cursor-not-allowed"
//                               : ""
//                           }`}
//                         >
//                           <option value="">Select Doctor</option>
//                           {filteredDoctors.map((doctor) => (
//                             <option key={doctor.id} value={doctor.id}>
//                               {doctor.fullname} - {doctor.specialization}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       {errors.doctor && (
//                         <p className="text-red-500 text-sm">
//                           {errors.doctor}
//                         </p>
//                       )}

//                       {formData.department &&
//                         filteredDoctors.length === 0 && (
//                           <p className="text-yellow-600 text-sm">
//                             No doctors available for this department
//                           </p>
//                         )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* APPOINTMENT TIMING */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                     <FiClock className="mr-2 text-amber-600" />
//                     Appointment Timing
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                     {/* DATE */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Preferred Date *
//                       </label>
//                       <div className="relative">
//                         <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="date"
//                           name="preferredDate"
//                           value={formData.preferredDate}
//                           onChange={handleInputChange}
//                           min={new Date()
//                             .toISOString()
//                             .split("T")[0]}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.preferredDate
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                       {errors.preferredDate && (
//                         <p className="text-red-500 text-sm">
//                           {errors.preferredDate}
//                         </p>
//                       )}
//                     </div>

//                     {/* TIME */}
//                     <div>
//                       <label className="text-sm font-medium text-gray-700">
//                         Preferred Time *
//                       </label>
//                       <div className="relative">
//                         <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <select
//                           name="time"
//                           value={formData.time}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
//                             errors.time
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         >
//                           <option value="">Select Time</option>
//                           <option value="09:00-10:00">
//                             09:00 AM - 10:00 AM
//                           </option>
//                           <option value="10:00-11:00">
//                             10:00 AM - 11:00 AM
//                           </option>
//                           <option value="11:00-12:00">
//                             11:00 AM - 12:00 PM
//                           </option>
//                           <option value="14:00-15:00">
//                             02:00 PM - 03:00 PM
//                           </option>
//                           <option value="15:00-16:00">
//                             03:00 PM - 04:00 PM
//                           </option>
//                           <option value="16:00-17:00">
//                             04:00 PM - 05:00 PM
//                           </option>
//                         </select>
//                       </div>
//                       {errors.time && (
//                         <p className="text-red-500 text-sm">
//                           {errors.time}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* MESSAGE */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                     <FiMessageCircle className="mr-2 text-amber-600" />
//                     Additional Information
//                   </h3>

//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//                     placeholder="Describe your symptoms..."
//                   ></textarea>
//                 </div>

//                 {/* SUBMIT BUTTON */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full bg-gradient-to-r from-primary via-secondary to-accent text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 ${
//                     isSubmitting
//                       ? "opacity-60 cursor-not-allowed"
//                       : "hover:scale-[1.03] transition"
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
//                       <span>Booking...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Book Appointment Now</span>
//                       <FiArrowRight />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* SUPPORT */}
//         <div className="text-center mt-8 text-gray-600">
//           <p>
//             Need help? Call <strong>+91 8888-6890-61</strong>
//           </p>
//           <p className="text-sm mt-1">
//             Available 24/7 for emergencies
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentBooking;



import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiClock,
  FiMessageCircle,
  FiArrowRight,
  FiCheck
} from "react-icons/fi";
import { MdBusinessCenter, MdLocalHospital } from "react-icons/md";
import {
  fetchDepartments,
  getDoctors,
  createAppointment
} from "../../api/userApi";

const AppointmentBooking = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    department: "",
    doctor: "",
    preferredDate: "",
    time: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load departments + doctors
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [deptsData, docsData] = await Promise.all([
          fetchDepartments(),
          getDoctors()
        ]);

        setDepartments(deptsData);
        setDoctors(docsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter doctors by department
  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.departmentid === parseInt(formData.department)
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [formData.department, doctors]);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Enter valid 10-digit mobile number";

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Enter valid email";

    if (!formData.department)
      newErrors.department = "Select a department";

    if (!formData.doctor)
      newErrors.doctor = "Select a doctor";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Select a date";

    if (!formData.time)
      newErrors.time = "Select a time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const appointmentData = {
      fullName: formData.fullName,
      mobilenumber: formData.mobileNumber,
      email: formData.email || null,
      departmentid: parseInt(formData.department),
      doctorid: parseInt(formData.doctor),
      preferreddate: formData.preferredDate,
      preferredtime: formData.time,
      message: formData.message || null,
      status: "pending"
    };

    try {
      await createAppointment(appointmentData);
      setIsSubmitted(true);

      // Auto reset
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        department: "",
        doctor: "",
        preferredDate: "",
        time: "",
        message: ""
      });
      setFilteredDoctors([]);
    } catch (error) {
      setErrors({
        submit:
          error.message ||
          "Failed to book appointment. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helpers
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (d) => d.id === parseInt(doctorId)
    );
    return doctor ? doctor.fullname : "";
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find(
      (d) => d.id === parseInt(deptId)
    );
    return dept ? dept.name : "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-b-2 border-amber-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Loading Appointment Form...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mt-20 py-10">

        {/* SUCCESS POPUP MODAL */}
        {isSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-xl max-w-md w-full text-center animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-600 text-5xl" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Confirm Appointment
              </h2>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="w-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-4 rounded-xl shadow-xl backdrop-blur-md bg-opacity-80 text-center">
          <h1 className="text-3xl font-bold mb-2 drop-shadow-sm">
            Book Your Appointment
          </h1>
          <p className="text-lg opacity-90 font-secondary">
           Schedule your visit with our expert medical team.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-2xl mt-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* LEFT SIDEBAR */}
            <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white p-8 lg:p-10">
              <h3 className="text-xl font-bold mb-6">
                Why Choose Our Hospital?
              </h3>

              <div className="space-y-6">
                {["Expert Doctors", "Quick Appointments", "24/7 Support"].map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <p className="font-semibold">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-2 p-8">
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    {errors.submit}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* PERSONAL INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUser className="mr-2 text-amber-600" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* FULL NAME */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* MOBILE NUMBER */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.mobileNumber
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                          placeholder="Enter your email (optional)"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* MEDICAL INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MdLocalHospital className="mr-2 text-amber-600" />
                    Medical Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* DEPARTMENT */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Department *
                      </label>
                      <div className="relative">
                        <MdBusinessCenter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.department
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.department && (
                        <p className="text-red-500 text-sm">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    {/* DOCTOR */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Doctor *
                      </label>
                      <div className="relative">
                        <MdLocalHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleInputChange}
                          disabled={
                            !formData.department ||
                            filteredDoctors.length === 0
                          }
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.doctor
                            ? "border-red-500"
                            : "border-gray-300"
                            } ${!formData.department ||
                              filteredDoctors.length === 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          <option value="">Select Doctor</option>
                          {filteredDoctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.fullname} - {doctor.specialization}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.doctor && (
                        <p className="text-red-500 text-sm">
                          {errors.doctor}
                        </p>
                      )}

                      {formData.department &&
                        filteredDoctors.length === 0 && (
                          <p className="text-yellow-600 text-sm">
                            No doctors available for this department
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                {/* APPOINTMENT TIMING */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiClock className="mr-2 text-amber-600" />
                    Appointment Timing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* DATE */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date()
                            .toISOString()
                            .split("T")[0]}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.preferredDate
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* TIME */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.time
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        >
                          <option value="">Select Time</option>
                          <option value="09:00-10:00">
                            09:00 AM - 10:00 AM
                          </option>
                          <option value="10:00-11:00">
                            10:00 AM - 11:00 AM
                          </option>
                          <option value="11:00-12:00">
                            11:00 AM - 12:00 PM
                          </option>
                          <option value="14:00-15:00">
                            02:00 PM - 03:00 PM
                          </option>
                          <option value="15:00-16:00">
                            03:00 PM - 04:00 PM
                          </option>
                          <option value="16:00-17:00">
                            04:00 PM - 05:00 PM
                          </option>
                        </select>
                      </div>
                      {errors.time && (
                        <p className="text-red-500 text-sm">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiMessageCircle className="mr-2 text-amber-600" />
                    Additional Information
                  </h3>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Describe your symptoms..."
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-primary via-secondary to-accent text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 ${isSubmitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.03] transition"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Appointment Now</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Need help? Call <strong>+91 8888-6890-61</strong>
          </p>
          <p className="text-sm mt-1">
            Available 24/7 for emergencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;