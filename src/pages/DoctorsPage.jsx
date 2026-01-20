// import { useEffect, useState } from "react";
// import {
//   getDoctors,
//   fetchDepartmentById,
//   fetchDepartments,
// } from "../api/userApi";
// import { motion } from "framer-motion";
// import DoctorsList from "../components/DoctorsPage/DoctorsList";

// const DoctorsPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [departmentsData, setDepartmentsData] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "",
//     gender: "",
//   });

//   const pageFade = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
//   };

//   /* Load Doctors + Departments */
//   useEffect(() => {
//     const loadData = async () => {
//       const docs = await getDoctors();
//       const deps = await fetchDepartments();

//       setDoctors(docs);
//       setFilteredDoctors(docs);
//       setDepartmentsData(
//         deps.filter((d) => d.isactive === true) // safe filtering
//       );
//     };
//     loadData();
//   }, []);

//   /* Filtering Logic */
//   useEffect(() => {
//     let result = doctors;

//     if (searchTerm.trim() !== "") {
//       result = result.filter(
//         (d) =>
//           d.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filters.department) {
//       result = result.filter(
//         (d) => Number(d.departmentid) === Number(filters.department)
//       );
//     }

//     if (filters.gender) {
//       result = result.filter((d) => d.gender === filters.gender);
//     }

//     setFilteredDoctors(result);
//   }, [searchTerm, filters, doctors]);

//   return (
//     <motion.div
//       className="min-h-screen pt-36 max-sm:pt-28 px-5 bg-gray-50 pb-20"
//       variants={pageFade}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Header Section */}
//       <div className="text-center">
//         <h1 className="text-5xl max-sm:text-4xl mb-1.5 font-extrabold text-primary font-quicksand">
//           Our Doctors
//         </h1>
//         <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
//         <p className="text-gray-600 mt-2 text-lg max-w-xl mx-auto">
//           Search and consult with our trusted specialists across multiple
//           medical departments.
//         </p>
//       </div>

//       {/* 🔥 Updated Search + Filters Section */}
//       <div className="max-w-7xl mx-auto bg-gradient-to-br from-fadedyellow/40 to-mute rounded-2xl shadow-lg p-6 md:p-8 mt-10 border border-gray-100">
//         <div className="grid grid-cols-1 md:grid-cols-4 mb-1 gap-6">
//           {/* Search Input */}
//           <div className="md:col-span-2">
//             <label className="font-semibold text-primary text-sm">
//               Search Doctor
//             </label>
//             <div className="relative mt-2">
//               <input
//                 type="text"
//                 placeholder="Search by name, specialization..."
//                 className="
//                   w-full border border-gray-300 p-3 rounded-xl 
//                   focus:ring-2 focus:ring-primary focus:border-primary 
//                   shadow-sm transition
//                 "
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
//                 <i className="bi bi-search"></i>
//               </span>
//             </div>
//           </div>

//           {/* Department Filter */}
//           <div>
//             <label className="font-semibold text-primary text-sm">
//               Select Department
//             </label>
//             <select
//               className="
//                 w-full border border-gray-300 mt-2 p-3 rounded-xl 
//                 focus:ring-2 focus:ring-secondary focus:border-secondary
//                 shadow-sm transition
//               "
//               value={filters.department}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, department: e.target.value }))
//               }
//             >
//               <option value="">All Departments</option>

//               {departmentsData.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Gender Filter */}
//           <div>
//             <label className="font-semibold text-primary text-sm">Gender</label>
//             <select
//               className="
//                 w-full border border-gray-300 mt-2 p-3 rounded-xl
//                 focus:ring-2 focus:ring-secondary focus:border-secondary
//                 shadow-sm transition
//               "
//               value={filters.gender}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, gender: e.target.value }))
//               }
//             >
//               <option value="">Any Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="max-w-7xl mx-auto mt-6 px-4">
//         <p className="text-sm text-gray-600">
//           Showing{" "}
//           <span className="font-semibold text-primary">
//             {filteredDoctors.length}
//           </span>{" "}
//           doctors
//         </p>
//       </div>

//       {/* Doctors List */}
//       <DoctorsList doctors={filteredDoctors} />
//     </motion.div>
//   );
// };

// export default DoctorsPage;


import { useEffect, useState } from "react";
import {
  getDoctors,
  fetchDepartments,
  getFullImageUrl
} from "../api/userApi";
import { motion } from "framer-motion";
import DoctorsList from "../components/DoctorsPage/DoctorsList";


const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    gender: "",
  });

  const pageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  /* Load Doctors + Departments */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [docsRes, depsRes] = await Promise.all([
          getDoctors(),
          fetchDepartments(),
        ]);

        // ✅ Safety check + transform doctor photos
        const docs = Array.isArray(docsRes) ? docsRes : [];
        const transformedDocs = docs
          .filter((d) => d.isactive) // Only active doctors
          .map((doc) => ({
            ...doc,
            photo: getFullImageUrl(doc.photo),
          }));

        // ✅ Safety check for departments
        const deps = Array.isArray(depsRes) ? depsRes : [];
        const activeDeps = deps.filter((d) => d.isactive === true);

        setDoctors(transformedDocs);
        setFilteredDoctors(transformedDocs);
        setDepartmentsData(activeDeps);
      } catch (error) {
        console.error("Error loading doctors:", error);
        setDoctors([]);
        setFilteredDoctors([]);
        setDepartmentsData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  /* Filtering Logic */
  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilteredDoctors([]);
      return;
    }

    let result = [...doctors];

    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
          (d.fullname && d.fullname.toLowerCase().includes(search)) ||
          (d.specialization && d.specialization.toLowerCase().includes(search))
      );
    }

    if (filters.department) {
      result = result.filter(
        (d) => Number(d.departmentid) === Number(filters.department)
      );
    }

    if (filters.gender) {
      result = result.filter((d) => d.gender === filters.gender);
    }

    setFilteredDoctors(result);
  }, [searchTerm, filters, doctors]);

  /* Loading State */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-50">
        <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-lg font-medium">Loading doctors...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-36 max-sm:pt-28 px-5 bg-gray-50 pb-20"
      variants={pageFade}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-5xl max-sm:text-4xl mb-1.5 font-extrabold text-primary font-quicksand">
          Our Doctors
        </h1>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-2 text-lg max-w-xl mx-auto">
          Search and consult with our trusted specialists across multiple
          medical departments.
        </p>
      </div>

      {/* Search + Filters Section */}
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-fadedyellow/40 to-mute rounded-2xl shadow-lg p-6 md:p-8 mt-10 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 mb-1 gap-6">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="font-semibold text-primary text-sm">
              Search Doctor
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search by name, specialization..."
                className="
                  w-full border border-gray-300 p-3 rounded-xl 
                  focus:ring-2 focus:ring-primary focus:border-primary 
                  shadow-sm transition
                "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                🔍
              </span>
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label className="font-semibold text-primary text-sm">
              Select Department
            </label>
            <select
              className="
                w-full border border-gray-300 mt-2 p-3 rounded-xl 
                focus:ring-2 focus:ring-secondary focus:border-secondary
                shadow-sm transition
              "
              value={filters.department}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, department: e.target.value }))
              }
            >
              <option value="">All Departments</option>
              {(departmentsData || []).map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="font-semibold text-primary text-sm">Gender</label>
            <select
              className="
                w-full border border-gray-300 mt-2 p-3 rounded-xl
                focus:ring-2 focus:ring-secondary focus:border-secondary
                shadow-sm transition
              "
              value={filters.gender}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-primary">
            {(filteredDoctors || []).length}
          </span>{" "}
          doctors
        </p>
      </div>

      {/* Doctors List - ✅ Pass safe array */}
      <DoctorsList doctors={filteredDoctors || []} />
    </motion.div>
  );
};

export default DoctorsPage;