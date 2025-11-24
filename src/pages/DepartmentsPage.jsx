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
      <div className="min-h-screen flex items-center justify-center text-lg">
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
    <div className="min-h-screen bg-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          Medical Departments
        </h1>

        {/* Search + Filter */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search departments..."
              className="border p-3 rounded-lg flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="border p-3 rounded-lg w-64"
            >
              <option value="all">All Departments</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onClick={() => setSelectedDepartment(dept)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
