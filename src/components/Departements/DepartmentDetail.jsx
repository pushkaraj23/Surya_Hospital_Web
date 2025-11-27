import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-mute"
    >
      {/* =========================== BANNER =========================== */}
      <motion.div
        className="relative h-72 bg-gradient-to-r from-primary via-primary/90 to-secondary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={department.bannerimage}
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="absolute inset-0 bg-primary/60"></div>

        <motion.div
          className="absolute bottom-8 left-8 text-white"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
            {department.name}
          </h1>
          <p className="text-white/90 max-w-2xl">{department.description}</p>
        </motion.div>
      </motion.div>

      {/* =========================== CONTENT GRID =========================== */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* =========================== MAIN SECTION =========================== */}
        <div className="lg:col-span-3">
          {/* ---------- Tabs ---------- */}
          <motion.div
            className="flex border-b border-gray-300 mb-6 overflow-x-auto no-scrollbar gap-2 sm:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {["overview", "services", "doctors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 sm:px-6 font-semibold transition ${
                  activeTab === tab
                    ? "text-primary border-b-4 border-secondary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </motion.div>

          {/* ===================== OVERVIEW TAB ===================== */}
          {activeTab === "overview" && (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>

              <p className="text-gray-700 leading-relaxed mb-8">
                {department.description}
              </p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  show: { transition: { staggerChildren: 0.12 } },
                }}
              >
                {[
                  {
                    label: "Success Rate",
                    val: department.success_rate
                      ? `${department.success_rate}%`
                      : "—",
                  },
                  {
                    label: "Patients Treated",
                    val: department.patients ?? "—",
                  },
                  {
                    label: "Experience",
                    val: department.experience
                      ? `${department.experience}+ Years`
                      : "—",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className={`p-6 rounded-2xl shadow-sm border ${
                      i === 0
                        ? "bg-primary/10 border-primary/20"
                        : i === 1
                        ? "bg-secondary/10 border-secondary/20"
                        : "bg-accent/10 border-accent/20"
                    }`}
                  >
                    <h3
                      className={`font-bold text-lg mb-2 ${
                        i === 0
                          ? "text-primary"
                          : i === 1
                          ? "text-secondary"
                          : "text-accent"
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p className="text-gray-700 font-medium">{item.val}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ===================== SERVICES TAB ===================== */}
          {activeTab === "services" && (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                Services Offered
              </h2>

              <motion.ul
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {department.services.map((s, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="p-4 bg-mute border border-gray-200 rounded-xl shadow-sm flex items-center gap-3"
                  >
                    <span className="text-secondary text-lg">✓</span>
                    <span className="font-medium text-gray-700">{s}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* ===================== DOCTORS TAB ===================== */}
          {activeTab === "doctors" && (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                Doctors in This Department
              </h2>

              {loadingDoctors && (
                <div className="text-gray-500">Loading doctors...</div>
              )}
              {!loadingDoctors && doctors.length === 0 && (
                <div className="text-gray-500">No doctors available.</div>
              )}

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {doctors.map((doc) => (
                  <motion.div
                    key={doc.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0 },
                    }}
                    onClick={() => onDoctorSelect(doc)}
                    className="p-5 bg-mute rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition cursor-pointer"
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
                        <p className="text-sm text-gray-500">
                          {doc.experience_years}+ years experience
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* =========================== SIDEBAR =========================== */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-xl sticky top-12">
            <h3 className="text-xl font-bold mb-2">Book an Appointment</h3>
            <p className="text-white/80 text-sm mb-4">
              Schedule a consultation with our specialists.
            </p>
            <button
              onClick={() => navigate("/appBook")}
              className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow hover:bg-mute transition"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
