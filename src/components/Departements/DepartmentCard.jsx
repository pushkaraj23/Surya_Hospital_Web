// import { useNavigate } from "react-router-dom";

// export default function DepartmentCard({ department }) {
//   const navigate = useNavigate();

//   // Extract API fields safely
//   const {
//     id,
//     name,
//     description,
//     bannerimage,
//     services = [],
//     success_rate,
//     patients,
//     experience,
//   } = department;

//   const stripHtml = (html) => {
//     const div = document.createElement("div");
//     div.innerHTML = html;
//     return div.textContent || div.innerText || "";
//   };

//   return (
//     <div
//       onClick={() => navigate(`/departments/${id}`)}
//       className="
//         group cursor-pointer rounded-2xl overflow-hidden shadow-lg 
//         bg-white border border-gray-100 
//         hover:shadow-2xl hover:-translate-y-1 
//         transition-all duration-300
//       "
//     >
//       {/* Header Image */}
//       <div className="h-44 w-full overflow-hidden">
//         <img
//           src={bannerimage}
//           alt={name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
//         />
//       </div>

//       {/* Body */}
//       <div className="p-6">
//         {/* Department Name */}
//         <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>

//         {/* Description */}
//         {/* <p className="text-gray-600 text-sm mb-5 leading-relaxed">
//           {description?.slice(0, 120)}...
//         </p> */}
//         <p className="text-gray-600 text-sm mb-5 leading-relaxed">
//           {stripHtml(description)?.slice(0, 120)}...
//         </p>


//         {/* Stats Section */}
//         <div className="grid grid-cols-3 gap-3 mb-5">
//           <div className="text-center">
//             <div className="text-primary font-bold">
//               {success_rate ? `${success_rate}%` : "—"}
//             </div>
//             <div className="text-xs text-gray-500">Success</div>
//           </div>
//           <div className="text-center">
//             <div className="text-secondary font-bold">{patients ?? "—"}</div>
//             <div className="text-xs text-gray-500">Patients</div>
//           </div>
//           <div className="text-center">
//             <div className="text-accent font-bold">
//               {experience ? `${experience}+` : "—"}
//             </div>
//             <div className="text-xs text-gray-500">Experience</div>
//           </div>
//         </div>

//         {/* Service Chips */}
//         <div className="flex flex-wrap gap-2 mb-5">
//           {(services || []).slice(0, 3).map((service, i) => (

//             <span
//               key={i}
//               className="
//                 px-3 py-1 bg-mute text-primary 
//                 rounded-full text-xs font-medium 
//                 border border-primary/10
//               "
//             >
//               {service}
//             </span>
//           ))}

//           {services.length > 3 && (
//             <span
//               className="
//                 px-3 py-1 bg-secondary/10 text-secondary 
//                 rounded-full text-xs font-medium 
//                 border border-secondary/20
//               "
//             >
//               +{services.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Footer CTA */}
//         <div
//           className="
//           flex items-center justify-between pt-4 
//           border-t border-gray-200
//         "
//         >
//           <span
//             className="
//             text-primary font-semibold text-sm 
//             group-hover:text-secondary transition
//           "
//           >
//             Explore →
//           </span>

//           <div className="text-xs text-gray-500 flex items-center gap-1">
//             ⭐ 4.8
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function DepartmentCard({ department }) {
  const navigate = useNavigate();

  // ✅ Safety check
  if (!department) return null;

  // Extract API fields safely
  const {
    id,
    name = "Department",
    description = "",
    bannerimage,  // ✅ Already has full URL from DepartmentsPage
    services = [],
    success_rate,
    patients,
    experience,
  } = department;

  // ✅ Safe services array
  const safeServices = Array.isArray(services) ? services : [];

  const stripHtml = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div
      onClick={() => navigate(`/departments/${id}`)}
      className="
        group cursor-pointer rounded-2xl overflow-hidden shadow-lg 
        bg-white border border-gray-100 
        hover:shadow-2xl hover:-translate-y-1 
        transition-all duration-300 h-full flex flex-col
      "
    >
      {/* Header Image */}
      <div className="h-44 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        {bannerimage ? (
          <img
            src={bannerimage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl text-primary/30">🏥</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Department Name */}
        <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          {stripHtml(description)?.slice(0, 120) || "No description available"}
          {description && stripHtml(description).length > 120 ? "..." : ""}
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center">
            <div className="text-primary font-bold">
              {success_rate ? `${success_rate}%` : "—"}
            </div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
          <div className="text-center">
            <div className="text-secondary font-bold">{patients ?? "—"}</div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold">
              {experience ? `${experience}+` : "—"}
            </div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
        </div>

        {/* Service Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {safeServices.slice(0, 3).map((service, i) => (
            <span
              key={i}
              className="
                px-3 py-1 bg-mute text-primary 
                rounded-full text-xs font-medium 
                border border-primary/10
              "
            >
              {service}
            </span>
          ))}

          {safeServices.length > 3 && (
            <span
              className="
                px-3 py-1 bg-secondary/10 text-secondary 
                rounded-full text-xs font-medium 
                border border-secondary/20
              "
            >
              +{safeServices.length - 3} more
            </span>
          )}

          {safeServices.length === 0 && (
            <span className="text-xs text-gray-400 italic">No services listed</span>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <span className="text-primary font-semibold text-sm group-hover:text-secondary transition">
            Explore →
          </span>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            ⭐ 4.8
          </div>
        </div>
      </div>
    </div>
  );
}