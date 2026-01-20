// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import DepartmentCard from "../components/Departements/DepartmentCard";
// import DepartmentDetail from "../components/Departements/DepartmentDetail";
// import DoctorProfile from "../components/Departements/DoctorProfile";
// import { fetchDepartments } from "../api/userApi";

// export default function DepartmentsPage() {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Load Departments
//   useEffect(() => {
//     async function loadDepartments() {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetchDepartments();
//         setDepartments(response || []);
//       } catch (err) {
//         setError("Failed to load departments. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadDepartments();
//   }, []);

//   // Filter Logic
//   const filteredDepartments = departments.filter((dept) => {
//     const name = dept.name?.toLowerCase() || "";
//     const desc = dept.description?.toLowerCase() || "";

//     const matchesSearch =
//       name.includes(searchTerm.toLowerCase()) ||
//       desc.includes(searchTerm.toLowerCase());

//     const matchesFilter =
//       activeFilter === "all" || name.includes(activeFilter.toLowerCase());

//     return matchesSearch && matchesFilter;
//   });

//   // Loading UI
//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-mute text-primary font-semibold">
//         Loading Departments...
//       </div>
//     );

//   // Error UI
//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-mute text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   // Doctor Profile Screen
//   if (selectedDoctor)
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <DoctorProfile
//           doctor={selectedDoctor}
//           onBack={() => setSelectedDoctor(null)}
//         />
//       </motion.div>
//     );

//   // Department Detail Screen
//   if (selectedDepartment)
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <DepartmentDetail
//           department={selectedDepartment}
//           onBack={() => setSelectedDepartment(null)}
//           onDoctorSelect={setSelectedDoctor}
//         />
//       </motion.div>
//     );

//   // Department List Page
//   return (
//     <motion.div
//       className="min-h-screen bg-mute pt-36 max-sm:pt-24 px-1"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Header */}
//       <motion.div
//         className="text-center mb-10 mt-2"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <h1 className="text-5xl font-quicksand max-sm:text-4xl font-extrabold text-primary mb-2">
//           Medical Departments
//         </h1>
//         <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
//         <p className="text-gray-600 mt-4">
//           Explore our advanced medical facilities, team moments, and events.
//         </p>
//       </motion.div>

//       {/* Search + Filter */}
//       <motion.div
//         className="max-w-7xl mx-auto px-4 mb-12"
//         initial={{ opacity: 0, y: 25 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//       >
//         <div className="bg-gradient-to-r from-primary/10 via-mute to-primary/5 rounded-2xl shadow-xl p-8 border border-primary/10 backdrop-blur-sm">
//           {/* Title */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//             <h2 className="text-2xl font-bold text-primary tracking-wide">
//               Find a Department
//             </h2>
//             <p className="text-gray-600 text-sm md:text-base">
//               Search by name or filter by specialties
//             </p>
//           </div>

//           {/* Search + Filter Row */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                 <div className="w-10 h-10 bg-white/70 border border-primary/20 backdrop-blur-md shadow-md rounded-xl flex items-center justify-center">
//                   <span className="text-primary text-lg">🔍</span>
//                 </div>
//               </div>

//               <input
//                 type="text"
//                 placeholder="Search by department, specialty or keyword..."
//                 className="w-full pl-16 pr-4 py-4 rounded-xl bg-white shadow-md text-gray-700 border border-gray-200 focus:ring-2 focus:ring-primary transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Filter */}
//             <div className="relative w-full md:w-64">
//               <select
//                 value={activeFilter}
//                 onChange={(e) => setActiveFilter(e.target.value)}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 shadow-md cursor-pointer focus:ring-2 focus:ring-secondary transition-all"
//               >
//                 <option value="all">All Departments</option>
//                 {Array.from(new Set(departments.map((d) => d.name))).map(
//                   (name) => (
//                     <option key={name} value={name.toLowerCase()}>
//                       {name}
//                     </option>
//                   )
//                 )}
//               </select>

//               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
//                 ▼
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 h-[3px] w-24 bg-secondary rounded-full"></div>
//         </div>
//       </motion.div>

//       {/* Department Cards */}
//       <div className="max-w-7xl mx-auto px-4 mb-20">
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={{
//             hidden: {},
//             show: {
//               transition: {
//                 staggerChildren: 0.12,
//               },
//             },
//           }}
//         >
//           {filteredDepartments.map((dept) => (
//             <motion.div
//               key={dept.id}
//               variants={{
//                 hidden: { opacity: 0, y: 25 },
//                 show: { opacity: 1, y: 0 },
//               }}
//               transition={{ duration: 0.5 }}
//             >
//               <DepartmentCard department={dept} />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* No Results */}
//         {filteredDepartments.length === 0 && (
//           <motion.div
//             className="text-center mt-10 text-gray-500"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No departments found. Try adjusting your search.
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DepartmentCard from "../components/Departements/DepartmentCard";
import DepartmentDetail from "../components/Departements/DepartmentDetail";
import DoctorProfile from "../components/Departements/DoctorProfile";
import { fetchDepartments,getFullImageUrl } from "../api/userApi";


export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Departments
  useEffect(() => {
    async function loadDepartments() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchDepartments();

        // ✅ Safety check + transform banner images
        const deps = Array.isArray(response) ? response : [];
        const transformedDeps = deps
          .filter((d) => d.isactive) // Only active departments
          .map((dept) => ({
            ...dept,
            bannerimage: getFullImageUrl(dept.bannerimage),
            // Keep services as array
            services: Array.isArray(dept.services) ? dept.services : [],
          }));

        setDepartments(transformedDeps);
      } catch (err) {
        console.error("Error loading departments:", err);
        setError("Failed to load departments. Please try again later.");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    }
    loadDepartments();
  }, []);

  // Filter Logic
  const filteredDepartments = (departments || []).filter((dept) => {
    const name = dept.name?.toLowerCase() || "";
    const desc = dept.description?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      desc.includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || name.includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Loading UI
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-mute">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-semibold">Loading Departments...</p>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-mute">
        <div className="text-5xl">😕</div>
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );

  // Doctor Profile Screen
  if (selectedDoctor)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <DoctorProfile
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(null)}
        />
      </motion.div>
    );

  // Department Detail Screen
  if (selectedDepartment)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <DepartmentDetail
          department={selectedDepartment}
          onBack={() => setSelectedDepartment(null)}
          onDoctorSelect={setSelectedDoctor}
        />
      </motion.div>
    );

  // Department List Page
  return (
    <motion.div
      className="min-h-screen bg-mute pt-36 max-sm:pt-24 px-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 mt-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl font-quicksand max-sm:text-4xl font-extrabold text-primary mb-2">
          Medical Departments
        </h1>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-4">
          Explore our advanced medical facilities, team moments, and events.
        </p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mb-12"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-primary/10 via-mute to-primary/5 rounded-2xl shadow-xl p-8 border border-primary/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-primary tracking-wide">
              Find a Department
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Search by name or filter by specialties
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <div className="w-10 h-10 bg-white/70 border border-primary/20 backdrop-blur-md shadow-md rounded-xl flex items-center justify-center">
                  <span className="text-primary text-lg">🔍</span>
                </div>
              </div>

              <input
                type="text"
                placeholder="Search by department, specialty or keyword..."
                className="w-full pl-16 pr-4 py-4 rounded-xl bg-white shadow-md text-gray-700 border border-gray-200 focus:ring-2 focus:ring-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative w-full md:w-64">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 shadow-md cursor-pointer focus:ring-2 focus:ring-secondary transition-all appearance-none"
              >
                <option value="all">All Departments</option>
                {Array.from(new Set((departments || []).map((d) => d.name))).map(
                  (name) => (
                    <option key={name} value={name.toLowerCase()}>
                      {name}
                    </option>
                  )
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          <div className="mt-6 h-[3px] w-24 bg-secondary rounded-full"></div>
        </div>
      </motion.div>

      {/* Department Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {filteredDepartments.map((dept) => (
            <motion.div
              key={dept.id}
              variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <DepartmentCard department={dept} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDepartments.length === 0 && (
          <motion.div
            className="text-center mt-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No departments found. Try adjusting your search.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}