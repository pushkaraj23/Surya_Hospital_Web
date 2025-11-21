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

// Mock data for departments and doctors
const MOCK_DEPARTMENTS = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Orthopedics" },
  { id: 4, name: "Pediatrics" },
  { id: 5, name: "Dermatology" },
];

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Sarah Johnson", departmentId: 1 },
  { id: 2, name: "Dr. Michael Chen", departmentId: 1 },
  { id: 3, name: "Dr. Emily Rodriguez", departmentId: 2 },
  { id: 4, name: "Dr. James Wilson", departmentId: 3 },
  { id: 5, name: "Dr. Lisa Thompson", departmentId: 4 },
  { id: 6, name: "Dr. Robert Brown", departmentId: 5 },
];

const AppointmentBooking = () => {
  const [loading, setLoading] = useState(true);
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
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (formData.department) {
      const filtered = MOCK_DOCTORS.filter(
        (d) => d.departmentId === parseInt(formData.department)
      );
      setFilteredDoctors(filtered);
      setFormData((prev) => ({ ...prev, doctor: "" }));
    } else {
      setFilteredDoctors([]);
    }
  }, [formData.department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, "")))
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.department)
      newErrors.department = "Please select a department";

    if (!formData.doctor) newErrors.doctor = "Please select a doctor";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Please select a preferred date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Appointment booked:", formData);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
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
      setIsSubmitted(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Appointment Form...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen mt-20 bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appointment Booked Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for booking with Surya Hospital. We'll contact you shortly to confirm your appointment.
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting back to form...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FiCalendar className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your visit with our expert medical team. Quick, easy, and secure booking process.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div className="w-24 h-1 bg-amber-600 mx-2"></div>
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div className="w-24 h-1 bg-amber-600 mx-2"></div>
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Sidebar */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 lg:p-10">
              <h3 className="text-xl font-bold mb-6">Why Choose Surya Hospital?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Doctors</h4>
                    <p className="text-blue-100 text-sm">Board-certified specialists</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quick Appointments</h4>
                    <p className="text-blue-100 text-sm">Same-day slots available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold">24/7 Support</h4>
                    <p className="text-blue-100 text-sm">Always here to help you</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-sm text-blue-100">
                  <strong>Emergency?</strong> Call us directly at{" "}
                  <span className="font-bold">+91 8888-6890-61</span>
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-2 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUser className="mr-2 text-amber-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                            errors.fullName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                            errors.mobileNumber ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your email (optional)"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MdLocalHospital className="mr-2 text-amber-600" />
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Department */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Department *
                      </label>
                      <div className="relative">
                        <MdBusinessCenter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white ${
                            errors.department ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Department</option>
                          {MOCK_DEPARTMENTS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.department && (
                        <p className="text-red-500 text-sm">{errors.department}</p>
                      )}
                    </div>

                    {/* Doctor */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Doctor *
                      </label>
                      <div className="relative">
                        <MdLocalHospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleInputChange}
                          disabled={!formData.department}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white ${
                            errors.doctor ? "border-red-500" : "border-gray-300"
                          } ${
                            !formData.department ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <option value="">Select Doctor</option>
                          {filteredDoctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.doctor && (
                        <p className="text-red-500 text-sm">{errors.doctor}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Appointment Timing Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiClock className="mr-2 text-amber-600" />
                    Appointment Timing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                            errors.preferredDate ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm">{errors.preferredDate}</p>
                      )}
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white"
                        >
                          <option value="">Select Time Slot</option>
                          <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                          <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                          <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                          <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                          <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
                          <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiMessageCircle className="mr-2 text-am-600" />
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Message / Symptoms
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none transition-all"
                      placeholder="Describe your symptoms or any additional information that might help our doctors..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Book Appointment Now</span>
                  <FiArrowRight className="text-xl" />
                </button>

                {/* Privacy Note */}
                <p className="text-center text-gray-500 text-sm">
                  By booking an appointment, you agree to our{" "}
                  <a href="#" className="text-amber-600 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-amber-600 hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-gray-600">
          <p>Need immediate assistance? Call us at <strong>+91 8888-6890-61</strong></p>
          <p className="text-sm mt-2">Available 24/7 for emergency services</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;