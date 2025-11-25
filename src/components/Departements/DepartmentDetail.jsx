import { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import { getDoctorsByDepartment } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function DepartmentDetail({ department, onDoctorSelect }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const navigate = useNavigate();

  // ================================
  // FETCH DOCTORS OF THIS DEPARTMENT
  // ================================
  useEffect(() => {
    async function loadDocs() {
      try {
        setLoadingDoctors(true);
        const res = await getDoctorsByDepartment(department.id);
        setDoctors(res);
      } catch (err) {
        console.error("Error loading doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    }
    loadDocs();
  }, [department.id]);

  return (
    <div className="min-h-screen bg-mute">
      {/* Banner */}
      <div className="relative h-72 bg-gradient-to-r from-primary via-primary/90 to-secondary">
        <img
          src={department.bannerimage}
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute inset-0 bg-primary/60"></div>

        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
            {department.name}
          </h1>
          <p className="text-white/90 max-w-2xl">{department.description}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MAIN SECTION */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-6 overflow-x-auto no-scrollbar gap-2 sm:gap-0">
            {["overview", "services", "doctors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-3 sm:px-6 font-semibold whitespace-nowrap transition duration-200
                  ${
                    activeTab === tab
                      ? "text-primary border-b-4 border-secondary"
                      : "text-gray-500 hover:text-primary"
                  }
                `}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>

              <p className="text-gray-700 leading-relaxed mb-8">
                {department.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Success Rate */}
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl shadow-sm relative">
                  <h3 className="font-bold text-primary text-lg mb-2">
                    Success Rate
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {department.success_rate
                      ? `${department.success_rate}%`
                      : "—"}
                  </p>
                </div>

                {/* Patients */}
                <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-2xl shadow-sm relative">
                  <h3 className="font-bold text-secondary text-lg mb-2">
                    Patients Treated
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {department.patients ?? "—"}
                  </p>
                </div>

                {/* Experience */}
                <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl shadow-sm relative">
                  <h3 className="font-bold text-accent text-lg mb-2">
                    Experience
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {department.experience
                      ? `${department.experience}+ Years`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === "services" && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Services Offered
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.services.map((s, i) => (
                  <li
                    key={i}
                    className="p-4 bg-mute border border-gray-200 rounded-xl shadow-sm flex items-center gap-3"
                  >
                    <span className="text-secondary text-lg">✓</span>
                    <span className="font-medium text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DOCTORS TAB */}
          {activeTab === "doctors" && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Doctors in This Department
              </h2>

              {loadingDoctors && (
                <div className="text-gray-500">Loading doctors...</div>
              )}

              {!loadingDoctors && doctors.length === 0 && (
                <div className="text-gray-500">
                  No doctors available for this department.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => onDoctorSelect(doc)}
                    className="
                      p-5 bg-mute rounded-xl border border-gray-200 
                      hover:border-primary hover:shadow-lg transition cursor-pointer
                    "
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={doc.photo}
                        className="w-16 h-16 rounded-xl shadow-md object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-primary">
                          {doc.fullname}
                        </h3>
                        <p className="text-gray-600">{doc.specialization}</p>
                        <p className="text-[13px] text-gray-500">
                          {doc.experience_years}+ years experience
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div
            className="
              bg-gradient-to-br from-primary to-secondary 
              text-white p-6 rounded-2xl shadow-xl sticky top-12
            "
          >
            <h3 className="text-xl font-bold mb-2">Book an Appointment</h3>
            <p className="text-white/80 text-sm mb-4">
              Schedule a consultation with our specialists.
            </p>
            <button
              className="
                w-full bg-white text-primary font-bold 
                py-3 rounded-xl shadow hover:bg-mute transition
              "
              onClick={() => navigate("/appBook")}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
