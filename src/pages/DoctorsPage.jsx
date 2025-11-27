import React, { useState, useEffect } from "react";
import { getDoctors } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ----------------------------------------------------------
   Animation Variants
---------------------------------------------------------- */
const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ----------------------------------------------------------
   MAIN COMPONENT: Doctors Directory
---------------------------------------------------------- */
const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    experience: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------------------------
     Load Data from API
  -------------------------- */
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        console.log("📋 Doctors data loaded:", data);

        const transformedDoctors = data.map((doctor) => ({
          id: doctor.id,
          name: doctor.fullname,
          qualification: doctor.qualification,
          specialization: doctor.specialization,
          department: doctor.departmentid || "General",
          experience: doctor.experience_years
            ? `${doctor.experience_years} years`
            : "Experience not specified",
          gender: "Male", // TODO: Map real gender from API when available
          photo: doctor.photo,
          bio: doctor.bio || "No bio available",
          education: doctor.qualification
            ? [doctor.qualification]
            : ["Qualification information not available"],
          experienceDetails: doctor.experience_years
            ? [
                `${doctor.experience_years} years of experience in ${
                  doctor.specialization || "medical field"
                }`,
              ]
            : ["Experience details not available"],
          availableDays: ["Monday", "Wednesday", "Friday"],
          timings: "9:00 AM - 5:00 PM",
          achievements: doctor.specialization
            ? [`Specialized in ${doctor.specialization}`]
            : ["Professional medical practitioner"],
        }));

        setDoctors(transformedDoctors);
        setFilteredDoctors(transformedDoctors);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading doctors:", err);
        setError(err.message || "Something went wrong.");
        setDoctors([]);
        setFilteredDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  /* -------------------------
     Filters & Search
  -------------------------- */
  useEffect(() => {
    let result = doctors;

    if (searchTerm) {
      result = result.filter(
        (doctor) =>
          doctor?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          doctor?.specialization
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase()) ||
          doctor?.qualification
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase())
      );
    }

    if (filters.department) {
      result = result.filter((d) => d?.department === filters.department);
    }

    if (filters.experience) {
      result = result.filter((d) => {
        const years = parseInt(d?.experience) || 0;
        if (filters.experience === "0-5") return years <= 5;
        if (filters.experience === "5-10") return years > 5 && years <= 10;
        if (filters.experience === "10+") return years > 10;
        return true;
      });
    }

    if (filters.gender) {
      result = result.filter((d) => d?.gender === filters.gender);
    }

    setFilteredDoctors(result);
  }, [searchTerm, filters, doctors]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      department: "",
      experience: "",
      gender: "",
    });
  };

  const departments = [
    ...new Set(doctors.map((d) => d?.department).filter(Boolean)),
  ];

  /* -------------------------
     Doctor Profile View
  -------------------------- */
  if (selectedDoctor) {
    return (
      <motion.div variants={pageFade} initial="hidden" animate="visible">
        <DoctorProfile
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(null)}
        />
      </motion.div>
    );
  }

  /* -------------------------
     Loading State
  -------------------------- */
  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-primary/5 via-mute to-secondary/10 flex items-center justify-center"
        variants={pageFade}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div
            className="rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600 font-medium">Loading doctors...</p>
        </div>
      </motion.div>
    );
  }

  /* -------------------------
     Error State
  -------------------------- */
  if (error) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-primary/5 via-mute to-secondary/10 flex items-center justify-center"
        variants={pageFade}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center bg-white/80 backdrop-blur-md px-10 py-8 rounded-2xl shadow-xl border border-red-100">
          <div className="text-5xl mb-2">😞</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-1">
            Failed to load doctors
          </h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  /* -------------------------
     MAIN DIRECTORY RETURN
  -------------------------- */
  return (
    <motion.div
      className="min-h-screen mt-28 bg-mute"
      variants={pageFade}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        className="bg-white/"
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-1.5 font-quicksand">
              Find Your Doctor
            </h1>
            <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-1.5"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Search & connect with our experienced specialists across all
              departments.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filters Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100"
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Doctors
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                    <svg
                      className="h-4 w-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, specialization or qualification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-14 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-sm md:text-base"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience
              </label>
              <select
                value={filters.experience}
                onChange={(e) =>
                  handleFilterChange("experience", e.target.value)
                }
                className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">Any Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Tip: Combine search + filters to quickly find a specific doctor.
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:text-secondary font-medium text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-sm md:text-base">
            Found{" "}
            <span className="font-semibold text-primary">
              {filteredDoctors.length}
            </span>{" "}
            doctors
            {searchTerm && (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-secondary">
                  "{searchTerm}"
                </span>
              </>
            )}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100"
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-3">👨‍⚕️</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No doctors found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredDoctors.map((doctor, idx) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                index={idx}
                onViewProfile={setSelectedDoctor}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------
   DOCTOR CARD COMPONENT
---------------------------------------------------------- */
const DoctorCard = ({ doctor, onViewProfile, index }) => {
  const safeDoctor = doctor || {};

  return (
    <motion.div
      variants={cardVariant}
      custom={index}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={safeDoctor.photo || "/default-doctor.png"}
            alt={safeDoctor.name || "Doctor"}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/10 flex-shrink-0 bg-gray-50"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'%3E%3C/path%3E%3C/svg%3E";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {safeDoctor.name || "Doctor Name"}
            </h3>
            <p className="text-sm text-primary font-medium">
              {safeDoctor.qualification || "Medical Professional"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {safeDoctor.specialization || "Specialization"}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{safeDoctor.experience || "Experience"}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {safeDoctor.department || "Department"}
          </span>
          <button
            onClick={() => onViewProfile(safeDoctor)}
            className="px-4 py-2 bg-primary text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------
   DOCTOR PROFILE PAGE COMPONENT
---------------------------------------------------------- */
const DoctorProfile = ({ doctor, onBack }) => {
  const [showBookingModal, setShowBookingModal] = useState(false); // kept for future use
  const safeDoctor = doctor || {};
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-mute"
      variants={pageFade}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Back Button */}
      <motion.div
        className="bg-white/90 shadow-sm border-b border-gray-100 backdrop-blur-md"
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-primary hover:text-secondary font-medium transition-colors text-sm"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Doctors
            </button>
            <div className="text-xs sm:text-sm text-gray-600 text-right">
              <p className="font-semibold">+91 8888-6890-61</p>
              <p>contact@fibonce.com</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
        >
          <div className="md:flex">
            {/* Left Side - Photo & Basic Info */}
            <motion.div
              className="md:w-1/3 bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col justify-between"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <img
                  src={safeDoctor.photo || "/default-doctor.png"}
                  alt={safeDoctor.name || "Doctor"}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'%3E%3C/path%3E%3C/svg%3E";
                  }}
                />
                <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
                  {safeDoctor.name || "Doctor Name"}
                </h2>
                <p className="text-primary-50/90 mb-1 text-sm md:text-base">
                  {safeDoctor.qualification || "Qualification"}
                </p>
                <p className="text-primary-50 font-semibold mb-4 text-sm md:text-base">
                  {safeDoctor.specialization || "Specialization"}
                </p>

                {/* Status Badge */}
                <div className="inline-flex items-center px-4 py-1.5 bg-white/10 border border-white/30 text-xs md:text-sm rounded-full mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Available for Consultation
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl md:text-2xl font-bold">
                    {safeDoctor.experience || "0 years"}
                  </div>
                  <div className="text-primary-50 text-xs md:text-sm">
                    Experience
                  </div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">4.9/5</div>
                  <div className="text-primary-50 text-xs md:text-sm">
                    Patient Rating
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Detailed Information */}
            <div className="md:w-2/3 p-8 md:p-10">
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-secondary rounded mr-3" />
                  About Dr.{" "}
                  {safeDoctor.name?.split(" ")[1] || safeDoctor.name || ""}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {safeDoctor.bio || "Professional bio not available."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Education */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 text-secondary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9"
                      />
                    </svg>
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {(
                      safeDoctor.education || [
                        "Education information not available",
                      ]
                    ).map((edu, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-600">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 text-secondary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Experience
                  </h3>
                  <ul className="space-y-2">
                    {(
                      safeDoctor.experienceDetails || [
                        "Experience information not available",
                      ]
                    ).map((exp, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span className="text-gray-600">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-secondary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Available Schedule
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(
                      safeDoctor.availableDays || ["Schedule not available"]
                    ).map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="font-semibold text-gray-800 text-sm">
                          {day}
                        </div>
                        <div className="text-xs text-gray-600">
                          {safeDoctor.timings || "Timings not available"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {safeDoctor.achievements &&
                safeDoctor.achievements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 text-secondary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                      Achievements & Publications
                    </h3>
                    <ul className="space-y-2">
                      {safeDoctor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-yellow-500 mr-2 mt-1">★</span>
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Book Appointment Button */}
              <div className="mt-8">
                <button
                  onClick={() => navigate("/appBook")}
                  className="w-full py-4 bg-primary text-white text-sm md:text-lg font-semibold rounded-xl hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Book Appointment with Dr.{" "}
                  {safeDoctor.name?.split(" ")[1] || safeDoctor.name || ""}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorsPage;
