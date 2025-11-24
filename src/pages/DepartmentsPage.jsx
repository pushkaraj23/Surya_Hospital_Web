import { useState, useEffect } from "react";
import departmentsData from "../components/Departements/DepartmentsData";
import DepartmentCard from "../components/Departements/DepartmentCard";
import DepartmentDetail from "../components/Departements/DepartmentDetail";
import DoctorProfile from "../components/Departements/DoctorProfile";

export default function DepartmentsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

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
      <div className="min-h-screen flex items-center justify-center bg-mute text-primary font-semibold tracking-wide">
        Loading Departments...
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
    <div className="min-h-screen bg-mute pt-36 max-sm:pt-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl max-sm:text-3xl font-extrabold text-primary mb-3">
          Our Medical Departments
        </h1>
      </div>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-primary/10 via-mute to-primary/5 rounded-2xl shadow-xl p-8 border border-primary/10 backdrop-blur-sm">
          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-primary tracking-wide">
              Find a Department
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Search by name or filter by specialties
            </p>
          </div>

          {/* Search + Filter Row */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Box */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <div className="w-10 h-10 bg-white/70 border border-primary/20 backdrop-blur-md shadow-md rounded-xl flex items-center justify-center">
                  <span className="text-primary text-lg">🔍</span>
                </div>
              </div>

              <input
                type="text"
                placeholder="Search by department, specialty or keyword..."
                className="w-full pl-16 pr-4 py-4 rounded-xl bg-white shadow-md text-gray-700 border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-64">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="
            w-full appearance-none bg-white border border-gray-200 rounded-xl
            px-4 py-4 text-gray-700 shadow-md cursor-pointer
            focus:ring-2 focus:ring-secondary focus:border-secondary transition-all
          "
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="oncology">Oncology</option>
                <option value="dermatology">Dermatology</option>
              </select>

              {/* Dropdown Arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="mt-6 h-[3px] w-24 bg-secondary rounded-full"></div>
        </div>
      </div>

      {/* Department Listing */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepartments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onClick={() => setSelectedDepartment(dept)}
            />
          ))}
        </div>

        {/* If No Matching Results */}
        {filteredDepartments.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            No departments found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
}
