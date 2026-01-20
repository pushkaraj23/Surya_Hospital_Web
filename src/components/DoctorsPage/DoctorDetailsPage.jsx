// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams, useNavigate } from "react-router-dom";
// import { getDoctorById } from "../../api/userApi";

// // COLORS (used inline for consistency)
// const COLORS = {
//   primary: "#003B76",
//   secondary: "#F59422",
//   accent: "#EFB626",
//   mute: "#F9FAFB",
// };

// export default function DoctorDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* =========================== FETCH DOCTOR =========================== */
//   useEffect(() => {
//     async function loadDoctor() {
//       try {
//         setLoading(true);
//         const res = await getDoctorById(id);
//         setDoctor(res);
//       } catch (err) {
//         console.error("Error loading doctor:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadDoctor();
//   }, [id]);

//   if (loading || !doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading doctor details...
//       </div>
//     );
//   }

//   /* =========================== FORMAT DATE =========================== */
//   const formattedDate = doctor.createdat
//     ? new Date(doctor.createdat).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "—";

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-mute pb-20"
//     >
//       {/* =========================== HEADER BANNER =========================== */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative w-full h-64 sm:h-80 bg-gradient-to-r from-[#003B76] via-[#002e5c] to-[#001f3d]"
//       >
//         <img
//           src={doctor.photo}
//           alt={doctor.fullname}
//           className="w-full h-full object-cover mix-blend-overlay opacity-80"
//         />

//         <div className="absolute inset-0 bg-primary/60"></div>

//         {/* Doctor Photo */}
//         <div className="absolute bottom-5 max-sm:bottom-6 left-10 max-sm:left-6">
//           <img
//             src={doctor.photo}
//             className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-xl border-4 border-white/20"
//           />

//           {doctor.isexpert && (
//             <span className="absolute -bottom-2 -right-2 bg-secondary text-white px-3 py-1 text-xs rounded-full shadow-lg">
//               Expert
//             </span>
//           )}
//         </div>

//         <div className="absolute bottom-10 right-10 max-sm:right-6 text-white w-1/2 flex flex-col items-end">
//           <h1 className="text-2xl text-right font-quicksand sm:text-4xl font-bold tracking-wide drop-shadow-lg">
//             {doctor.fullname}
//           </h1>
//           <p className="opacity-70 md:text-lg text-right">
//             {doctor.specialization}
//           </p>
//         </div>
//       </motion.div>

//       {/* =========================== MAIN CONTENT =========================== */}
//       <div className="max-w-7xl mx-auto px-4 mt-5">
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-3xl shadow-xl sm:p-10 p-6 border border-gray-100"
//         >
//           {/* ===================== TOP INFO ROW ===================== */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//             {/* Info */}
//             <div className="flex-1">
//               <p className="text-primary font-medium">
//                 {doctor.qualification}
//               </p>

//               <div className="mt-4 flex flex-wrap gap-3">
//                 <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
//                   {doctor.experience_years}+ yrs experience
//                 </span>

//                 <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20">
//                   Dept #{doctor.departmentid}
//                 </span>

//                 <span
//                   className={`px-4 py-1.5 rounded-full text-sm border ${
//                     doctor.isactive
//                       ? "bg-green-50 text-green-600 border-green-200"
//                       : "bg-red-50 text-red-600 border-red-200"
//                   }`}
//                 >
//                   {doctor.isactive ? "Active" : "Inactive"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ===================== BIO ===================== */}
//           <div className="mt-10">
//             <h3 className="text-xl font-bold text-primary mb-4">About</h3>
//             <div
//               className="prose max-w-none text-gray-700 leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: doctor.bio }}
//             ></div>
//           </div>

//           {/* ===================== SCHEDULE ===================== */}
//           {doctor.schedule && (
//             <div className="mt-10">
//               <h3 className="text-xl font-bold text-primary mb-4">
//                 Consultation Schedule
//               </h3>

//               <div className="bg-mute p-6 rounded-2xl border border-gray-200 shadow-sm">
//                 <table className="w-full text-left text-sm">
//                   <thead>
//                     <tr className="text-gray-700 border-b">
//                       <th className="py-2">Day</th>
//                       <th className="py-2">Timing</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(doctor.schedule).map(([day, time]) => (
//                       <tr key={day} className="border-b last:border-none">
//                         <td className="py-3 font-medium text-gray-800">
//                           {day}
//                         </td>
//                         <td className="py-3 text-gray-600">{time}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* ===================== CTA ===================== */}
//           <div className="mt-12">
//             <button
//               onClick={() => navigate("/appBook")}
//               className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-[#002a56] text-white rounded-xl shadow-lg text-lg font-semibold transition"
//             >
//               Book Appointment
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById , getFullImageUrl} from "../../api/userApi";

// COLORS (used inline for consistency)
const COLORS = {
  primary: "#003B76",
  secondary: "#F59422",
  accent: "#EFB626",
  mute: "#F9FAFB",
};

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================== FETCH DOCTOR =========================== */
  useEffect(() => {
    async function loadDoctor() {
      try {
        setLoading(true);
        setError(null);
        const res = await getDoctorById(id);
        
        // ✅ Safety check
        if (!res) {
          setError("Doctor not found");
          return;
        }

        // ✅ Transform photo URL
        const transformedDoctor = {
          ...res,
          photo: getFullImageUrl(res.photo),
        };

        setDoctor(transformedDoctor);
      } catch (err) {
        console.error("Error loading doctor:", err);
        setError("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    }
    loadDoctor();
  }, [id]);

  /* =========================== LOADING STATE =========================== */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading doctor details...</p>
      </div>
    );
  }

  /* =========================== ERROR STATE =========================== */
  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-semibold text-gray-700">
          {error || "Doctor not found"}
        </h2>
        <button
          onClick={() => navigate("/doctors")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  /* =========================== FORMAT DATE =========================== */
  const formattedDate = doctor.createdat
    ? new Date(doctor.createdat).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  /* =========================== CHECK SCHEDULE =========================== */
  const hasSchedule = doctor.schedule && Object.keys(doctor.schedule).length > 0;
  const scheduleEntries = hasSchedule 
    ? Object.entries(doctor.schedule).filter(([_, time]) => time) 
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-mute pb-20"
    >
      {/* =========================== HEADER BANNER =========================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-64 sm:h-80 bg-gradient-to-r from-[#003B76] via-[#002e5c] to-[#001f3d]"
      >
        {/* Background Image */}
        {doctor.photo && (
          <img
            src={doctor.photo}
            alt={doctor.fullname || "Doctor"}
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <div className="absolute inset-0 bg-primary/60"></div>

        {/* Doctor Photo */}
        <div className="absolute bottom-5 max-sm:bottom-6 left-10 max-sm:left-6">
          {doctor.photo ? (
            <img
              src={doctor.photo}
              alt={doctor.fullname || "Doctor"}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-xl border-4 border-white/20"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          
          {/* Fallback Avatar */}
          <div 
            className={`w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-xl border-4 border-white/20 bg-white/20 items-center justify-center ${doctor.photo ? 'hidden' : 'flex'}`}
          >
            <span className="text-5xl text-white">
              {doctor.fullname?.charAt(0)?.toUpperCase() || "D"}
            </span>
          </div>

          {doctor.isexpert && (
            <span className="absolute -bottom-2 -right-2 bg-secondary text-white px-3 py-1 text-xs rounded-full shadow-lg flex items-center gap-1">
              ⭐ Expert
            </span>
          )}
        </div>

        {/* Doctor Name & Specialization */}
        <div className="absolute bottom-10 right-10 max-sm:right-6 text-white w-1/2 flex flex-col items-end">
          <h1 className="text-2xl text-right font-quicksand sm:text-4xl font-bold tracking-wide drop-shadow-lg">
            {doctor.fullname || "Doctor Name"}
          </h1>
          <p className="opacity-70 md:text-lg text-right">
            {doctor.specialization || "Specialization"}
          </p>
        </div>
      </motion.div>

      {/* =========================== MAIN CONTENT =========================== */}
      <div className="max-w-7xl mx-auto px-4 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl sm:p-10 p-6 border border-gray-100"
        >
          {/* ===================== TOP INFO ROW ===================== */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Info */}
            <div className="flex-1">
              <p className="text-primary font-medium">
                {doctor.qualification || "Qualification not specified"}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {doctor.experience_years && (
                  <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                    {doctor.experience_years}+ yrs experience
                  </span>
                )}

                {doctor.departmentid && (
                  <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20">
                    Dept #{doctor.departmentid}
                  </span>
                )}

                <span
                  className={`px-4 py-1.5 rounded-full text-sm border ${
                    doctor.isactive
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {doctor.isactive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* ===================== BIO ===================== */}
          {doctor.bio && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-primary mb-4">About</h3>
              <div
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: doctor.bio }}
              ></div>
            </div>
          )}

          {/* ===================== SCHEDULE ===================== */}
          {scheduleEntries.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-primary mb-4">
                Consultation Schedule
              </h3>

              <div className="bg-mute p-6 rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-700 border-b">
                      <th className="py-2">Day</th>
                      <th className="py-2">Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleEntries.map(([day, time]) => (
                      <tr key={day} className="border-b last:border-none">
                        <td className="py-3 font-medium text-gray-800">
                          {day}
                        </td>
                        <td className="py-3 text-gray-600">{time || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================== CTA ===================== */}
          <div className="mt-12 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/appBook")}
              className="flex-1 sm:flex-none px-10 py-4 bg-primary hover:bg-[#002a56] text-white rounded-xl shadow-lg text-lg font-semibold transition"
            >
              Book Appointment
            </button>
            
            <button
              onClick={() => navigate("/doctors")}
              className="flex-1 sm:flex-none px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl shadow-sm text-lg font-semibold transition"
            >
              Back to Doctors
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}