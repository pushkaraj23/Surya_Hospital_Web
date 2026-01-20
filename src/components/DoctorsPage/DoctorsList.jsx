// import { motion } from "framer-motion";
// import DoctorCard from "./DoctorCard";

// const DoctorsList = ({ doctors }) => {
//   // Simple fade for each card (no stagger — no blank bugs)
//   const cardFade = {
//     hidden: { opacity: 0, y: 15 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-10 px-4">
//       {/* Empty Data State */}
//       {doctors.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-200">
//           <div className="text-5xl mb-3">😕</div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-1">
//             No doctors found
//           </h3>
//           <p className="text-gray-500">
//             Try adjusting your search or filter selections.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {doctors.map((doc) => (
//             <motion.div
//               key={doc.id}
//               variants={cardFade}
//               initial="hidden"
//               animate="visible"
//             >
//               <DoctorCard doctor={doc} />
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorsList;


import { motion } from "framer-motion";
import DoctorCard from "./DoctorCard";

const DoctorsList = ({ doctors = [] }) => {  // ✅ Default empty array
  const cardFade = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  // ✅ Safety check
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {/* Empty Data State */}
      {safeDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-200">
          <div className="text-5xl mb-3">😕</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-1">
            No doctors found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter selections.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeDoctors.map((doc) => (
            <motion.div
              key={doc.id}
              variants={cardFade}
              initial="hidden"
              animate="visible"
            >
              <DoctorCard doctor={doc} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;