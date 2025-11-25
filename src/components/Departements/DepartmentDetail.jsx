import { useState } from "react";
import departmentsData from "./DepartmentsData";
import BookingModal from "./BookingModal";

export default function DepartmentDetail({
  department,
  onBack,
  onDoctorSelect,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const doctors = departmentsData.doctors.filter((doctor) =>
    department.doctors.includes(doctor.id)
  );

  return (
    <div className="min-h-screen bg-mute">
      {/* Banner */}
      <div className="relative h-72 bg-gradient-to-r from-primary via-primary/90 to-secondary">
        <img
          src={department.bannerImage}
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute inset-0 bg-primary/60"></div>

        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
            {department.name}
          </h1>
          <p className="text-white/90">{department.description}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          {/* Tabs */}
          <div
            className="
    flex border-b border-gray-300 mb-6 
    overflow-x-auto no-scrollbar 
    gap-2 sm:gap-0
  "
          >
            {["overview", "services", "doctors", "facilities"].map((tab) => (
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
              <h2 className="text-2xl font-bold text-primary mb-6">
                About the Department
              </h2>

              <p className="text-gray-700 leading-relaxed mb-8">
                {department.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Days Card */}
                <div
                  className="
        bg-gradient-to-br from-primary/10 to-primary/5 
        border border-primary/20 p-6 rounded-2xl shadow-sm relative
      "
                >
                  <div className="absolute top-3 right-3 text-primary/40 text-3xl">
                    📅
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">
                    Available Days
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {department.availableDays.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {department.timings}
                  </p>
                </div>

                {/* Stats Card */}
                <div
                  className="
        bg-gradient-to-br from-secondary/10 to-secondary/5 
        border border-secondary/20 p-6 rounded-2xl shadow-sm relative
      "
                >
                  <div className="absolute top-3 right-3 text-secondary/40 text-3xl">
                    📊
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-2">
                    Department Stats
                  </h3>

                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Success Rate:</span>{" "}
                      {department.stats.successRate}
                    </p>
                    <p>
                      <span className="font-semibold">Patients Treated:</span>{" "}
                      {department.stats.patients}
                    </p>
                    <p>
                      <span className="font-semibold">Experience:</span>{" "}
                      {department.stats.experience}
                    </p>
                  </div>
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
                        src={doc.image}
                        className="w-16 h-16 rounded-xl shadow-md object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-primary">
                          {doc.name}
                        </h3>
                        <p className="text-gray-600">{doc.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FACILITIES TAB */}
          {activeTab === "facilities" && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Facilities & Equipment
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {department.equipment.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setFullscreenImage(img)}
                    className="
            cursor-pointer relative group rounded-xl overflow-hidden 
            shadow hover:shadow-xl transition
          "
                  >
                    <img
                      src={img}
                      className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition duration-300"
                    />

                    {/* Zoom Icon */}
                    <div
                      className="
            absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
            transition flex items-center justify-center text-white text-3xl
          "
                    >
                      🔍
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {fullscreenImage && (
          <div
            className="
      fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center 
      justify-center z-50 p-4 animate-fadeIn
    "
            onClick={() => setFullscreenImage(null)}
          >
            <img
              src={fullscreenImage}
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl border-4 border-white"
            />

            {/* Close Button */}
            <button
              className="
        absolute top-6 right-6 bg-white text-primary shadow-lg 
        w-10 h-10 flex items-center justify-center rounded-full text-xl
      "
              onClick={() => setFullscreenImage(null)}
            >
              ✖
            </button>
          </div>
        )}

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Book Appointment */}
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
              onClick={() => setShowBookingModal(true)}
            >
              Book Consultation
            </button>
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
