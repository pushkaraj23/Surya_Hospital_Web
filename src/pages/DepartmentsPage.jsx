import React, { useState, useEffect } from "react";

// Static data - This would come from CMS in real implementation
const departmentsData = {
  departments: [
    {
      id: 1,
      name: "Cardiology",
      description: "Comprehensive heart care and cardiovascular treatments",
      shortDescription: "Expert heart care and cardiovascular treatments",
      bannerImage:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60",
      icon: "❤️",
      isActive: true,
      overview:
        "Our Cardiology Department provides comprehensive cardiovascular care with state-of-the-art technology. We specialize in prevention, diagnosis, and treatment of heart diseases with a patient-centered approach.",
      services: [
        "Cardiac Catheterization",
        "Angioplasty & Stenting",
        "Pacemaker Implantation",
        "Echocardiography",
        "Cardiac Rehabilitation",
        "Preventive Cardiology",
        "Heart Failure Management",
        "Cardiac Imaging",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "98%", patients: "5000+", experience: "15+ years" },
      doctors: [1, 2],
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "7:00 AM - 9:00 PM",
    },
    {
      id: 2,
      name: "Neurology",
      description: "Advanced care for brain and nervous system disorders",
      shortDescription: "Advanced brain and nervous system care",
      bannerImage:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
      icon: "🧠",
      isActive: true,
      overview:
        "The Neurology Department offers cutting-edge diagnosis and treatment for neurological disorders. Our team of specialists provides comprehensive care for conditions affecting the brain, spine, and nerves.",
      services: [
        "EEG & EMG Testing",
        "Stroke Treatment",
        "Epilepsy Management",
        "Multiple Sclerosis Care",
        "Headache & Migraine Treatment",
        "Neurological Rehabilitation",
        "Parkinson's Disease Care",
        "Neuromuscular Disorders",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "95%", patients: "3000+", experience: "12+ years" },
      doctors: [3, 4],
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      timings: "8:00 AM - 8:00 PM",
    },
    {
      id: 3,
      name: "Orthopedics",
      description:
        "Bone, joint, and muscle care with advanced surgical options",
      shortDescription: "Comprehensive bone and joint care",
      bannerImage:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
      icon: "🦴",
      isActive: true,
      overview:
        "Our Orthopedics Department specializes in the diagnosis and treatment of musculoskeletal conditions. We offer both surgical and non-surgical interventions to restore mobility and improve quality of life.",
      services: [
        "Joint Replacement Surgery",
        "Arthroscopic Surgery",
        "Spinal Surgery",
        "Sports Injury Treatment",
        "Fracture Care",
        "Physical Therapy",
        "Orthopedic Trauma",
        "Pediatric Orthopedics",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "97%", patients: "4500+", experience: "18+ years" },
      doctors: [5, 6],
      availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
      timings: "6:00 AM - 10:00 PM",
    },
    {
      id: 4,
      name: "Pediatrics",
      description: "Comprehensive healthcare for children and adolescents",
      shortDescription: "Specialized care for children and teens",
      bannerImage:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=60",
      icon: "👶",
      isActive: true,
      overview:
        "The Pediatrics Department provides compassionate, family-centered care for patients from birth through adolescence. We focus on preventive care, growth monitoring, and treatment of childhood illnesses.",
      services: [
        "Well-child Visits",
        "Vaccinations & Immunizations",
        "Developmental Assessments",
        "Childhood Illness Treatment",
        "Adolescent Medicine",
        "Emergency Pediatric Care",
        "Newborn Care",
        "Child Nutrition",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "99%", patients: "8000+", experience: "20+ years" },
      doctors: [7, 8],
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timings: "8:00 AM - 6:00 PM",
    },
    {
      id: 5,
      name: "Oncology",
      description: "Advanced cancer treatment and compassionate care",
      shortDescription: "Comprehensive cancer care and treatment",
      bannerImage:
        "https://images.unsplash.com/photo-1579154204601-015aabd44628?w=800&auto=format&fit=crop&q=60",
      icon: "🎗️",
      isActive: true,
      overview:
        "Our Oncology Department offers multidisciplinary cancer care with the latest treatment modalities. We provide personalized treatment plans and supportive care throughout the cancer journey.",
      services: [
        "Chemotherapy",
        "Radiation Therapy",
        "Immunotherapy",
        "Cancer Surgery",
        "Palliative Care",
        "Clinical Trials",
        "Targeted Therapy",
        "Cancer Screening",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "92%", patients: "2500+", experience: "15+ years" },
      doctors: [9, 10],
      availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
      timings: "7:00 AM - 7:00 PM",
    },
    {
      id: 6,
      name: "Dermatology",
      description: "Skin, hair, and nail care with advanced treatments",
      shortDescription: "Expert skin, hair, and nail care",
      bannerImage:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60",
      icon: "🌟",
      isActive: true,
      overview:
        "The Dermatology Department provides comprehensive care for skin, hair, and nail conditions. We offer medical, surgical, and cosmetic treatments using the latest technology and techniques.",
      services: [
        "Skin Cancer Screening",
        "Acne Treatment",
        "Psoriasis & Eczema Care",
        "Laser Therapy",
        "Cosmetic Dermatology",
        "Hair & Nail Disorders",
        "Anti-Aging Treatments",
        "Dermatologic Surgery",
      ],
      equipment: [
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&auto=format&fit=crop&q=60",
      ],
      stats: { successRate: "96%", patients: "6000+", experience: "14+ years" },
      doctors: [11, 12],
      availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
      timings: "9:00 AM - 5:00 PM",
    },
  ],
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialization: "Interventional Cardiologist",
      departmentId: 1,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=60",
      qualification: "MD, DM Cardiology",
      experience: "12 years",
      bio: "Dr. Sarah Chen specializes in interventional cardiology with expertise in complex coronary interventions.",
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "9:00 AM - 5:00 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialization: "Cardiac Electrophysiologist",
      departmentId: 1,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60",
      qualification: "MD, DM Cardiology",
      experience: "15 years",
      bio: "Dr. Michael Rodriguez is an expert in cardiac rhythm disorders and pacemaker implantation.",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      timings: "10:00 AM - 6:00 PM",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      specialization: "Neurologist",
      departmentId: 2,
      image:
        "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&auto=format&fit=crop&q=60",
      qualification: "MD, DM Neurology",
      experience: "10 years",
      bio: "Dr. Emily Watson specializes in stroke management and neurological disorders.",
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "8:00 AM - 4:00 PM",
    },
    {
      id: 4,
      name: "Dr. James Kumar",
      specialization: "Neurosurgeon",
      departmentId: 2,
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=60",
      qualification: "MCh Neurosurgery",
      experience: "18 years",
      bio: "Dr. James Kumar is a renowned neurosurgeon with expertise in complex brain surgeries.",
      availableDays: ["Tuesday", "Thursday"],
      timings: "7:00 AM - 3:00 PM",
    },
    {
      id: 5,
      name: "Dr. Robert Kim",
      specialization: "Orthopedic Surgeon",
      departmentId: 3,
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=60",
      qualification: "MS Orthopedics",
      experience: "20 years",
      bio: "Dr. Robert Kim specializes in joint replacement and sports medicine.",
      availableDays: ["Monday", "Wednesday", "Friday"],
      timings: "8:00 AM - 6:00 PM",
    },
    {
      id: 6,
      name: "Dr. Lisa Thompson",
      specialization: "Sports Medicine Specialist",
      departmentId: 3,
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&auto=format&fit=crop&q=60",
      qualification: "MD Sports Medicine",
      experience: "8 years",
      bio: "Dr. Lisa Thompson focuses on sports injuries and rehabilitation.",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      timings: "9:00 AM - 5:00 PM",
    },
  ],
};

export default function DepartmentsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Filter departments based on search and active filter
  const filteredDepartments = departmentsData.departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || dept.name.toLowerCase().includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading departments...</p>
        </div>
      </div>
    );
  }

  if (selectedDoctor) {
    return (
      <DoctorProfile
        doctor={selectedDoctor}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  if (selectedDepartment) {
    return (
      <DepartmentDetail
        department={selectedDepartment}
        onBack={() => setSelectedDepartment(null)}
        onDoctorSelect={setSelectedDoctor}
      />
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Medical Departments
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our specialized medical departments, each equipped with
              expert doctors and advanced technology to provide comprehensive
              healthcare services.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                </div>
                <input
                  type="text"
                  placeholder="Search departments by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="oncology">Oncology</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-blue-600">
              {filteredDepartments.length}
            </span>{" "}
            departments
            {activeFilter !== "all" && ` in ${activeFilter}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Departments Grid */}
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No departments found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                onClick={() => setSelectedDepartment(department)}
              />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {departmentsData.departments.length}
            </div>
            <div className="text-gray-600">Specialized Departments</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {departmentsData.doctors.length}+
            </div>
            <div className="text-gray-600">Expert Doctors</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Medical Services</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Emergency Care</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
   DEPARTMENT CARD COMPONENT
---------------------------------------------------------- */
function DepartmentCard({ department, onClick }) {
  const doctors = departmentsData.doctors.filter((doctor) =>
    department.doctors.includes(doctor.id)
  );

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-xl">{department.icon}</span>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">Specialists</div>
            <div className="text-lg font-bold">{doctors.length}</div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{department.name}</h3>
        <p className="text-blue-100 text-sm">{department.shortDescription}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {department.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-sm font-bold text-blue-600">
              {department.stats.successRate}
            </div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">
              {department.stats.patients}
            </div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">
              {department.stats.experience}
            </div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {department.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {service}
              </span>
            ))}
            {department.services.length > 3 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                +{department.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">
            Explore
            <span>→</span>
          </span>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>⭐</span>
            <span>4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
   DEPARTMENT DETAIL COMPONENT
---------------------------------------------------------- */
function DepartmentDetail({ department, onBack, onDoctorSelect }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const doctors = departmentsData.doctors.filter((doctor) =>
    department.doctors.includes(doctor.id)
  );

  const handleBookAppointment = () => {
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
            Back to Departments
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        <img
          src={department.bannerImage}
          alt={department.name}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/80"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-2xl">{department.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{department.name}</h1>
              <p className="text-blue-100 text-lg">{department.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              {["overview", "services", "doctors", "facilities"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 max-sm:px-1.5 max-sm:py-2 max-sm:text-sm rounded-lg font-semibold transition-colors ${activeTab === tab
                      ? " text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Department Overview
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {department.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Available Days
                    </h3>
                    <p className="text-gray-700">
                      {department.availableDays.join(", ")}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {department.timings}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Quick Stats
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-semibold">
                          {department.stats.successRate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patients Treated:</span>
                        <span className="font-semibold">
                          {department.stats.patients}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-semibold">
                          {department.stats.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Services & Treatments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {department.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "doctors" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Specialists
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => onDoctorSelect(doctor)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {doctor.name}
                          </h3>
                          <p className="text-blue-600 font-semibold">
                            {doctor.specialization}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {doctor.experience} experience
                          </p>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "facilities" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Facilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {department.equipment.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${department.name} facility ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Appointment */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Book an Appointment</h3>
              <p className="text-blue-100 mb-4">
                Schedule your consultation with our {department.name}{" "}
                specialists.
              </p>
              <button
                onClick={handleBookAppointment}
                className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Book Consultation
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <span>📞</span>
                  <span>+91 8888-6890-61</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span>✉️</span>
                  <span>contact@fibonce.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span>🌐</span>
                  <span>www.fibonce.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          department={department}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------
   DOCTOR PROFILE COMPONENT
---------------------------------------------------------- */
function DoctorProfile({ doctor, onBack }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
            Back to Department
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Doctor Photo and Basic Info */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <div className="text-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white"
                />
                <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
                <p className="text-blue-100 mb-1">{doctor.qualification}</p>
                <p className="text-blue-100 font-semibold mb-4">
                  {doctor.specialization}
                </p>

                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available for Consultation
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">{doctor.experience}</div>
                  <div className="text-blue-100 text-sm">Experience</div>
                </div>
                <div>
                  <div className="text-xl font-bold">4.9/5</div>
                  <div className="text-blue-100 text-sm">Rating</div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                About Dr. {doctor.name.split(" ")[1]}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">{doctor.bio}</p>

              {/* Schedule */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  Available Schedule
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {doctor.availableDays.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="font-semibold text-gray-800">{day}</div>
                        <div className="text-sm text-gray-600">
                          {doctor.timings}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment with Dr. {doctor.name.split(" ")[1]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          doctor={doctor}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------
   BOOKING MODAL COMPONENT
---------------------------------------------------------- */
function BookingModal({ department, doctor, onClose }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    reason: "",
  });

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const entity = doctor || department;
    alert(
      `Appointment booked with ${entity.name} on ${formData.date} at ${formData.time}`
    );
    onClose();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const entity = doctor || department;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Book with{" "}
            {doctor ? `Dr. ${entity.name.split(" ")[1]}` : entity.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Briefly describe your symptoms or reason for consultation..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
