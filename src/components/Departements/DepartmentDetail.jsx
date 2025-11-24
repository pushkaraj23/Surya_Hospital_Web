// src/components/departments/DepartmentDetail.jsx

import { useState } from "react";
import departmentsData from "./DepartmentsData";
import BookingModal from "./BookingModal";

export default function DepartmentDetail({ department, onBack, onDoctorSelect }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const doctors = departmentsData.doctors.filter((doctor) =>
    department.doctors.includes(doctor.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600">
            ← Back to Departments
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        <img src={department.bannerImage} className="w-full h-full object-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-blue-600/70"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold">{department.name}</h1>
          <p className="text-blue-100">{department.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {["overview", "services", "doctors", "facilities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold ${
                  activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          {activeTab === "overview" && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-4">About Department</h2>
              <p className="text-gray-700 mb-4">{department.overview}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-1">Available Days:</h3>
                  {department.availableDays.join(", ")}
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-1">Stats:</h3>
                  <p>Success Rate: {department.stats.successRate}</p>
                  <p>Patients: {department.stats.patients}</p>
                  <p>Experience: {department.stats.experience}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <ul className="grid grid-cols-2 gap-3">
                {department.services.map((s, i) => (
                  <li key={i} className="p-3 bg-gray-50 rounded-lg">✓ {s}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-4">Doctors</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow"
                    onClick={() => onDoctorSelect(doc)}
                  >
                    <img src={doc.image} className="w-16 h-16 object-cover rounded-lg mb-2" />
                    <h3 className="font-bold">{doc.name}</h3>
                    <p className="text-blue-600">{doc.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "facilities" && (
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-4">Facilities</h2>
              <div className="grid grid-cols-2 gap-4">
                {department.equipment.map((e, i) => (
                  <img
                    key={i}
                    src={e}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
            <button
              className="w-full bg-white text-blue-700 py-2 rounded-lg font-semibold"
              onClick={() => setShowBookingModal(true)}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal department={department} onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
}
