// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import BookingModal from "./BookingModal";
// import { getDoctorsByDepartment } from "../../api/userApi";
// import { useNavigate } from "react-router-dom";

// export default function DepartmentDetail({ department, onDoctorSelect }) {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [fullscreenImage, setFullscreenImage] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadDocs() {
//       try {
//         setLoadingDoctors(true);
//         const res = await getDoctorsByDepartment(department.id);
//         setDoctors(res);
//       } catch (err) {
//         console.error("Error loading doctors:", err);
//       } finally {
//         setLoadingDoctors(false);
//       }
//     }
//     loadDocs();
//   }, [department.id]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-mute"
//     >
//       {/* =========================== BANNER =========================== */}
//       <motion.div
//         className="relative h-72 bg-gradient-to-r from-primary via-primary/90 to-secondary"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <img
//           src={department.bannerimage}
//           className="w-full h-full object-cover mix-blend-overlay opacity-80"
//         />
//         <div className="absolute inset-0 bg-primary/60"></div>

//         <motion.div
//           className="absolute bottom-8 left-8 text-white"
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
//             {department.name}
//           </h1>
//           <p className="text-white/90 max-w-2xl" dangerouslySetInnerHTML={{ __html: department.description }}></p>
//         </motion.div>
//       </motion.div>

//       {/* =========================== CONTENT GRID =========================== */}
//       <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* =========================== MAIN SECTION =========================== */}
//         <div className="lg:col-span-3">
//           {/* ---------- Tabs ---------- */}
//           <motion.div
//             className="flex border-b border-gray-300 mb-6 overflow-x-auto no-scrollbar gap-2 sm:gap-0"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             {["overview", "services", "doctors"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-3 sm:px-6 font-semibold transition ${
//                   activeTab === tab
//                     ? "text-primary border-b-4 border-secondary"
//                     : "text-gray-500 hover:text-primary"
//                 }`}
//               >
//                 {tab.toUpperCase()}
//               </button>
//             ))}
//           </motion.div>

//           {/* ===================== OVERVIEW TAB ===================== */}
//           {activeTab === "overview" && (
//             <motion.div
//               className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//               initial={{ opacity: 0, y: 25 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>

//               <p className="text-gray-700 leading-relaxed mb-8"
//                 dangerouslySetInnerHTML={{ __html: department.description }}>
//               </p>

//               {/* Stats */}
//               <motion.div
//                 className="grid grid-cols-1 md:grid-cols-3 gap-6"
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 variants={{
//                   show: { transition: { staggerChildren: 0.12 } },
//                 }}
//               >
//                 {[
//                   {
//                     label: "Success Rate",
//                     val: department.success_rate
//                       ? `${department.success_rate}%`
//                       : "—",
//                   },
//                   {
//                     label: "Patients Treated",
//                     val: department.patients ?? "—",
//                   },
//                   {
//                     label: "Experience",
//                     val: department.experience
//                       ? `${department.experience}+ Years`
//                       : "—",
//                   },
//                 ].map((item, i) => (
//                   <motion.div
//                     key={i}
//                     variants={{
//                       hidden: { opacity: 0, y: 15 },
//                       show: { opacity: 1, y: 0 },
//                     }}
//                     className={`p-6 rounded-2xl shadow-sm border ${
//                       i === 0
//                         ? "bg-primary/10 border-primary/20"
//                         : i === 1
//                         ? "bg-secondary/10 border-secondary/20"
//                         : "bg-accent/10 border-accent/20"
//                     }`}
//                   >
//                     <h3
//                       className={`font-bold text-lg mb-2 ${
//                         i === 0
//                           ? "text-primary"
//                           : i === 1
//                           ? "text-secondary"
//                           : "text-accent"
//                       }`}
//                     >
//                       {item.label}
//                     </h3>
//                     <p className="text-gray-700 font-medium">{item.val}</p>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}

//           {/* ===================== SERVICES TAB ===================== */}
//           {activeTab === "services" && (
//             <motion.div
//               className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.45 }}
//             >
//               <h2 className="text-2xl font-bold text-primary mb-6">
//                 Services Offered
//               </h2>

//               <motion.ul
//                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 variants={{
//                   show: { transition: { staggerChildren: 0.1 } },
//                 }}
//               >
//                 {department.services.map((s, i) => (
//                   <motion.li
//                     key={i}
//                     variants={{
//                       hidden: { opacity: 0, y: 15 },
//                       show: { opacity: 1, y: 0 },
//                     }}
//                     className="p-4 bg-mute border border-gray-200 rounded-xl shadow-sm flex items-center gap-3"
//                   >
//                     <span className="text-secondary text-lg">✓</span>
//                     <span className="font-medium text-gray-700">{s}</span>
//                   </motion.li>
//                 ))}
//               </motion.ul>
//             </motion.div>
//           )}

//           {/* ===================== DOCTORS TAB ===================== */}
//           {activeTab === "doctors" && (
//             <motion.div
//               className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <h2 className="text-2xl font-bold text-primary mb-6">
//                 Doctors in This Department
//               </h2>

//               {loadingDoctors && (
//                 <div className="text-gray-500">Loading doctors...</div>
//               )}
//               {!loadingDoctors && doctors.length === 0 && (
//                 <div className="text-gray-500">No doctors available.</div>
//               )}

//               <motion.div
//                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 variants={{
//                   show: { transition: { staggerChildren: 0.1 } },
//                 }}
//               >
//                 {doctors.map((doc) => (
//                   <motion.div
//                     key={doc.id}
//                     variants={{
//                       hidden: { opacity: 0, y: 15 },
//                       show: { opacity: 1, y: 0 },
//                     }}
//                     onClick={() => onDoctorSelect(doc)}
//                     className="p-5 bg-mute rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={doc.photo}
//                         className="w-16 h-16 rounded-xl shadow-md object-cover"
//                       />
//                       <div>
//                         <h3 className="text-lg font-bold text-primary">
//                           {doc.fullname}
//                         </h3>
//                         <p className="text-gray-600">{doc.specialization}</p>
//                         <p className="text-sm text-gray-500">
//                           {doc.experience_years}+ years experience
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           )}
//         </div>

//         {/* =========================== SIDEBAR =========================== */}
//         <motion.div
//           className="space-y-6"
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-xl sticky top-12">
//             <h3 className="text-xl font-bold mb-2">Book an Appointment</h3>
//             <p className="text-white/80 text-sm mb-4">
//               Schedule a consultation with our specialists.
//             </p>
//             <button
//               onClick={() => navigate("/appBook")}
//               className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow hover:bg-mute transition"
//             >
//               Book Consultation
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";
import { getDoctorsByDepartment,getFullImageUrl } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function DepartmentDetail({ department, onBack, onDoctorSelect }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const navigate = useNavigate();

  // ✅ Safety check for department
  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mute">
        <div className="text-center">
          <div className="text-5xl mb-4">🏥</div>
          <p className="text-gray-500 mb-4">Department not found</p>
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // ✅ Safe services array
  const services = Array.isArray(department.services) ? department.services : [];

  // ✅ FIX: Apply getFullImageUrl to banner image
  const bannerImage = getFullImageUrl(department.bannerimage);

  useEffect(() => {
    async function loadDocs() {
      try {
        setLoadingDoctors(true);
        const res = await getDoctorsByDepartment(department.id);

        // ✅ Safety check + transform doctor photos
        const docs = Array.isArray(res) ? res : [];
        const transformedDocs = docs
          .filter((doc) => doc.isactive !== false)
          .map((doc) => ({
            ...doc,
            photo: getFullImageUrl(doc.photo),
          }));

        setDoctors(transformedDocs);
      } catch (err) {
        console.error("Error loading doctors:", err);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    }
    
    if (department?.id) {
      loadDocs();
    }
  }, [department?.id]);

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
        {/* ✅ Banner image with full URL */}
        {bannerImage && (
          <img
            src={bannerImage}
            alt={department.name || "Department"}
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
            onError={(e) => {
              console.error("Banner image failed to load:", bannerImage);
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="absolute inset-0 bg-primary/60"></div>

        {/* ✅ Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition flex items-center gap-2"
          >
            ← Back
          </button>
        )}

        <motion.div
          className="absolute bottom-8 left-8 text-white max-w-2xl pr-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
            {department.name || "Department"}
          </h1>
          {department.description && (
            <div 
              className="text-white/90 max-w-2xl mt-2 line-clamp-2" 
              dangerouslySetInnerHTML={{ __html: department.description }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* ... rest of the component remains the same ... */}
      
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
                className={`px-4 py-3 sm:px-6 font-semibold transition whitespace-nowrap ${
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

              {department.description ? (
                <div 
                  className="text-gray-700 leading-relaxed mb-8 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: department.description }}
                />
              ) : (
                <p className="text-gray-500 mb-8">No description available.</p>
              )}

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
                    bgClass: "bg-primary/10 border-primary/20",
                    textClass: "text-primary",
                  },
                  {
                    label: "Patients Treated",
                    val: department.patients ?? "—",
                    bgClass: "bg-secondary/10 border-secondary/20",
                    textClass: "text-secondary",
                  },
                  {
                    label: "Experience",
                    val: department.experience
                      ? `${department.experience}+ Years`
                      : "—",
                    bgClass: "bg-accent/10 border-accent/20",
                    textClass: "text-accent",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className={`p-6 rounded-2xl shadow-sm border ${item.bgClass}`}
                  >
                    <h3 className={`font-bold text-lg mb-2 ${item.textClass}`}>
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

              {services.length > 0 ? (
                <motion.ul
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    show: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {services.map((s, i) => (
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
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-gray-500">No services listed for this department.</p>
                </div>
              )}
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
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-500">Loading doctors...</span>
                </div>
              )}

              {!loadingDoctors && doctors.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">👨‍⚕️</div>
                  <p className="text-gray-500">No doctors available in this department.</p>
                </div>
              )}

              {!loadingDoctors && doctors.length > 0 && (
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
                      onClick={() => onDoctorSelect && onDoctorSelect(doc)}
                      className="p-5 bg-mute rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        {doc.photo ? (
                          <img
                            src={doc.photo}
                            alt={doc.fullname || "Doctor"}
                            className="w-16 h-16 rounded-xl shadow-md object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        
                        <div
                          className={`w-16 h-16 rounded-xl shadow-md bg-primary/20 items-center justify-center ${
                            doc.photo ? "hidden" : "flex"
                          }`}
                        >
                          <span className="text-2xl text-primary font-bold">
                            {doc.fullname?.charAt(0)?.toUpperCase() || "D"}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-primary truncate">
                            {doc.fullname || "Doctor"}
                          </h3>
                          <p className="text-gray-600 truncate">
                            {doc.specialization || "Specialization"}
                          </p>
                          {doc.experience_years && (
                            <p className="text-sm text-gray-500">
                              {doc.experience_years}+ years experience
                            </p>
                          )}
                          {doc.isexpert && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              ⭐ Expert
                            </span>
                          )}
                        </div>

                        <span className="text-gray-400 text-xl">→</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
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
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-xl sticky top-24">
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

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-primary mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Doctors</span>
                <span className="font-semibold text-primary">
                  {loadingDoctors ? "..." : doctors.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Services</span>
                <span className="font-semibold text-primary">{services.length}</span>
              </div>
              {department.experience && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-primary">
                    {department.experience}+ years
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
    </motion.div>
  );
}