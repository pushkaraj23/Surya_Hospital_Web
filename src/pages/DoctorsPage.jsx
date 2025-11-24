import React, { useState, useEffect } from 'react';
import { getDoctors } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

/* ----------------------------------------------------------
   MAIN COMPONENT: Doctors Directory
---------------------------------------------------------- */
const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    experience: '',
    gender: ''
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

        // Transform API data to match component structure
        const transformedDoctors = data.map(doctor => ({
          id: doctor.id,
          name: doctor.fullname,
          qualification: doctor.qualification,
          specialization: doctor.specialization,
          department: doctor.departmentid || "General",
          experience: doctor.experience_years ? `${doctor.experience_years} years` : "Experience not specified",
          gender: "Male", // You might want to add gender to your API
          photo: doctor.photo,
          bio: doctor.bio || "No bio available",
          education: doctor.qualification ? [doctor.qualification] : ["Qualification information not available"],
          experienceDetails: doctor.experience_years ?
            [`${doctor.experience_years} years of experience in ${doctor.specialization || "medical field"}`] :
            ["Experience details not available"],
          availableDays: ["Monday", "Wednesday", "Friday"], // Default schedule
          timings: "9:00 AM - 5:00 PM", // Default timings
          achievements: doctor.specialization ?
            [`Specialized in ${doctor.specialization}`] :
            ["Professional medical practitioner"]
        }));

        setDoctors(transformedDoctors);
        setFilteredDoctors(transformedDoctors);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading doctors:", err);
        setError(err.message);
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
      result = result.filter(doctor =>
        doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor?.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor?.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.department) {
      result = result.filter(d => d?.department === filters.department);
    }

    if (filters.experience) {
      result = result.filter(d => {
        const years = parseInt(d?.experience) || 0;
        if (filters.experience === '0-5') return years <= 5;
        if (filters.experience === '5-10') return years > 5 && years <= 10;
        if (filters.experience === '10+') return years > 10;
        return true;
      });
    }

    if (filters.gender) {
      result = result.filter(d => d?.gender === filters.gender);
    }

    setFilteredDoctors(result);
  }, [searchTerm, filters, doctors]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      department: '',
      experience: '',
      gender: ''
    });
  };

  const departments = [...new Set(doctors.map(d => d?.department).filter(Boolean))];

  if (selectedDoctor) {
    return <DoctorProfile doctor={selectedDoctor} onBack={() => setSelectedDoctor(null)} />;
  }

  /* -------------------------
     Loading State
  -------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  /* -------------------------
     Error State
  -------------------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Failed to load doctors</h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------
     MAIN DIRECTORY RETURN
  -------------------------- */
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 py-5 to-indigo-100">
      {/* Header */}

      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search & connect with healthcare specialists
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Doctors
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={e => handleFilterChange('department', e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <select
                value={filters.experience}
                onChange={e => handleFilterChange('experience', e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={e => handleFilterChange('gender', e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> doctors
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={setSelectedDoctor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------
   DOCTOR CARD COMPONENT
---------------------------------------------------------- */
const DoctorCard = ({ doctor, onViewProfile }) => {
  // Safe access with fallbacks
  const safeDoctor = doctor || {};

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={safeDoctor.photo || "/default-doctor.png"}
            alt={safeDoctor.name || "Doctor"}
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-50 flex-shrink-0"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'%3E%3C/path%3E%3C/svg%3E";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {safeDoctor.name || "Doctor Name"}
            </h3>
            <p className="text-sm text-blue-600 font-medium">
              {safeDoctor.qualification || "Medical Professional"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {safeDoctor.specialization || "Specialization"}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{safeDoctor.experience || "Experience"}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {safeDoctor.department || "Department"}
          </span>
          <button
            onClick={() => onViewProfile(safeDoctor)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------
   DOCTOR PROFILE PAGE COMPONENT
---------------------------------------------------------- */
const DoctorProfile = ({ doctor, onBack }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Safe access with fallbacks
  const safeDoctor = doctor || {};

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Back Button */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Doctors
            </button>
            <div className="text-sm text-gray-600 text-right">
              <p className="font-medium">+91 8888-6890-61</p>
              <p>contact@fibonce.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">

            {/* Left Side - Photo & Basic Info */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
              <div className="text-center">
                <img
                  src={safeDoctor.photo || "/default-doctor.png"}
                  alt={safeDoctor.name || "Doctor"}
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'%3E%3C/path%3E%3C/svg%3E";
                  }}
                />
                <h2 className="text-2xl font-bold mb-2">{safeDoctor.name || "Doctor Name"}</h2>
                <p className="text-blue-100 mb-1">{safeDoctor.qualification || "Qualification"}</p>
                <p className="text-blue-100 font-semibold mb-4">{safeDoctor.specialization || "Specialization"}</p>

                {/* Status Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available for Consultation
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{safeDoctor.experience || "0 years"}</div>
                  <div className="text-blue-100 text-sm">Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-blue-100 text-sm">Patient Rating</div>
                </div>
              </div>
            </div>

            {/* Right Side - Detailed Information */}
            <div className="md:w-2/3 p-8">

              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-indigo-500 rounded mr-3"></span>
                  About Dr. {safeDoctor.name?.split(' ')[1] || "the Doctor"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {safeDoctor.bio || "Professional bio not available."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">

                {/* Education */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9" />
                    </svg>
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {(safeDoctor.education || ["Education information not available"]).map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-600">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Experience
                  </h3>
                  <ul className="space-y-2">
                    {(safeDoctor.experienceDetails || ["Experience information not available"]).map((exp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-600">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Available Schedule
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(safeDoctor.availableDays || ["Schedule not available"]).map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="font-semibold text-gray-800">{day}</div>
                        <div className="text-sm text-gray-600">{safeDoctor.timings || "Timings not available"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {safeDoctor.achievements && safeDoctor.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Achievements & Publications
                  </h3>
                  <ul className="space-y-2">
                    {safeDoctor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
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
                  onClick={() => navigate('/appBook')}
                  className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Book Appointment with Dr. {safeDoctor.name?.split(' ')[1] || ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorsPage;
