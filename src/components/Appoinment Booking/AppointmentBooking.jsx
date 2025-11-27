import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiClock,
  FiMessageCircle,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { MdBusinessCenter, MdLocalHospital } from "react-icons/md";
import {
  fetchDepartments,
  getDoctors,
  createAppointment,
} from "../../api/userApi";
import { motion, AnimatePresence } from "framer-motion";

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
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // LOAD DEPARTMENTS & DOCTORS
  // ===============================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [deptsData, docsData] = await Promise.all([
          fetchDepartments(),
          getDoctors(),
        ]);

        setDepartments(deptsData || []);
        setDoctors(docsData || []);
      } catch (err) {
        setError(err.message || "Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===============================
  // FILTER DOCTORS BY DEPARTMENT
  // ===============================
  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter(
        (doctor) => doctor.departmentid === parseInt(formData.department)
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [formData.department, doctors]);

  // ===============================
  // INPUT HANDLER
  // ===============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.department)
      newErrors.department = "Please select a department";

    if (!formData.doctor) newErrors.doctor = "Please select a doctor";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Please select a date";

    if (!formData.time) newErrors.time = "Please select a time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // SUBMIT
  // ===============================
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
      status: "pending",
    };

    try {
      await createAppointment(appointmentData);
      setIsSubmitted(true);

      // Auto reset
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2500);

      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        department: "",
        doctor: "",
        preferredDate: "",
        time: "",
        message: "",
      });
      setFilteredDoctors([]);
      setErrors({});
    } catch (error) {
      setErrors({
        submit:
          error?.message || "Failed to book appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================
  // HELPERS (DISPLAY SUMMARY)
  // ===============================
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((d) => d.id === parseInt(doctorId));
    return doctor ? doctor.fullname : "";
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === parseInt(deptId));
    return dept ? dept.name : "";
  };

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading Appointment Form...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-mute py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto mt-28 pt-2 max-sm:mt-20 max-sm:pt-0 pb-10">
        {/* SUCCESS POPUP MODAL */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-green-600 text-3xl" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Appointment Request Sent
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Our team will review your request and contact you shortly to
                  confirm your appointment.
                </p>

                {(formData.department || formData.doctor) && (
                  <div className="mt-2 text-left bg-gray-50 rounded-xl p-4 text-sm">
                    {formData.department && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Department:</span>{" "}
                        {getDepartmentName(formData.department)}
                      </p>
                    )}
                    {formData.doctor && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Doctor:</span>{" "}
                        {getDoctorName(formData.doctor)}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER BANNER */}
        <motion.div
          className="w-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-5 rounded-2xl shadow-2xl backdrop-blur-md text-center text-white"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-2 text-white/80">
            Surya Hospital
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-sm font-quicksand">
            Book Your Appointment
          </h1>
          <p className="text-sm md:text-base opacity-90 max-w-2xl mx-auto">
            Schedule your visit with our expert medical team and receive
            compassionate, specialized care tailored to your needs.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl mt-8 overflow-hidden border border-primary/5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* LEFT SIDEBAR */}
            <motion.div
              className="bg-gradient-to-br from-primary via-secondary to-accent text-white p-8 lg:p-10 relative overflow-hidden"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="absolute -top-10 -right-16 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-tr-full" />

              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <MdLocalHospital className="text-white text-xl" />
                </span>
                Why Choose Us?
              </h3>

              <p className="text-white/85 text-sm mb-6">
                We bring together experienced specialists, advanced technology,
                and a compassionate care environment to ensure the best for you
                and your family.
              </p>

              <div className="space-y-5">
                {[
                  "Renowned & experienced specialists",
                  "Quick & hassle-free appointment booking",
                  "24/7 emergency & support services",
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <FiCheck className="text-white text-sm" />
                    </div>
                    <p className="font-medium text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-sm">
                <p className="font-semibold">Need help with booking?</p>
                <p className="text-white/85 mt-1">
                  Call us at{" "}
                  <span className="font-semibold">+91 8888-6890-61</span>
                </p>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              className="lg:col-span-2 p-8 md:p-10 bg-white"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* PERSONAL INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mr-2">
                      <FiUser className="text-primary" />
                    </span>
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* FULL NAME */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative mt-1">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/80 ${
                            errors.fullName
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* MOBILE NUMBER */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Mobile Number *
                      </label>
                      <div className="relative mt-1">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/80 ${
                            errors.mobileNumber
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative mt-1">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/80 ${
                            errors.email ? "border-red-400" : "border-gray-300"
                          }`}
                          placeholder="Enter your email (optional)"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* MEDICAL INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center mr-2">
                      <MdLocalHospital className="text-secondary" />
                    </span>
                    Medical Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DEPARTMENT */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Department *
                      </label>
                      <div className="relative mt-1">
                        <MdBusinessCenter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary/80 ${
                            errors.department
                              ? "border-red-400"
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
                        <p className="text-red-500 text-xs mt-1">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    {/* DOCTOR */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Doctor *
                      </label>
                      <div className="relative mt-1">
                        <MdLocalHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleInputChange}
                          disabled={
                            !formData.department || filteredDoctors.length === 0
                          }
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary/80 ${
                            errors.doctor ? "border-red-400" : "border-gray-300"
                          } ${
                            !formData.department || filteredDoctors.length === 0
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="">Select Doctor</option>
                          {filteredDoctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.fullname} – {doctor.specialization}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.doctor && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.doctor}
                        </p>
                      )}

                      {formData.department && filteredDoctors.length === 0 && (
                        <p className="text-yellow-600 text-xs mt-1">
                          No doctors available for this department.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* APPOINTMENT TIMING */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center mr-2">
                      <FiClock className="text-accent" />
                    </span>
                    Appointment Timing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DATE */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Preferred Date *
                      </label>
                      <div className="relative mt-1">
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/80 ${
                            errors.preferredDate
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* TIME */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Preferred Time *
                      </label>
                      <div className="relative mt-1">
                        <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/80 ${
                            errors.time ? "border-red-400" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Time</option>
                          <option value="09:00-10:00">
                            09:00 AM – 10:00 AM
                          </option>
                          <option value="10:00-11:00">
                            10:00 AM – 11:00 AM
                          </option>
                          <option value="11:00-12:00">
                            11:00 AM – 12:00 PM
                          </option>
                          <option value="14:00-15:00">
                            02:00 PM – 03:00 PM
                          </option>
                          <option value="15:00-16:00">
                            03:00 PM – 04:00 PM
                          </option>
                          <option value="16:00-17:00">
                            04:00 PM – 05:00 PM
                          </option>
                        </select>
                      </div>
                      {errors.time && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center mr-2">
                      <FiMessageCircle className="text-primary" />
                    </span>
                    Additional Information
                  </h3>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/60 focus:border-primary/80 outline-none"
                    placeholder="Describe your symptoms or reason for visit (optional)..."
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className={`w-full bg-gradient-to-r from-primary via-secondary to-accent text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-xl transition-shadow"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Appointment Now</span>
                      <FiArrowRight />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* SUPPORT STRIP */}
        <motion.div
          className="text-center mt-8 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p>
            Need urgent assistance? Call <strong>+91 8888-6890-61</strong>
          </p>
          <p className="text-xs mt-1 text-gray-500">
            Our emergency services are available 24/7.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppointmentBooking;
