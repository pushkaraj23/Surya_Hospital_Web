// import React from "react";
// import { FaLinkedinIn, FaRegEnvelope, FaTelegramPlane } from "react-icons/fa";

// const experts = [
//   {
//     name: "Dr. James Patrick",
//     title: "Cardiologist & Medicine",
//     image:
//       "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Dr. James Patrick",
//     title: "Cardiologist & Medicine",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Dr. James Patrick",
//     title: "Cardiologist & Medicine",
//     image:
//       "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Dr. James Patrick",
//     title: "Cardiologist & Medicine",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Dr. James Patrick",
//     title: "Cardiologist & Medicine",
//     image:
//       "https://plus.unsplash.com/premium_photo-1702598520071-60c9b9fd0d49?w=600&auto=format&fit=crop&q=60",
//   },
// ];

// export default function ExpertsSection() {
//   return (
//     <div
//       className="px-5 mb-20 
//         bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 py-16"
//     >
//       {/* Header */}
//       <div className="text-start mb-12">
//         <h2 className="text-3xl font-bold text-primary">Experts</h2>
//         <p className="text-gray-600 text-sm mt-1">
//           Professionals at Work — delivering excellence in every case
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:grid-cols-1">
//         {experts.map((expert, idx) => (
//           <div
//             key={idx}
//             className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl group transition-all duration-500 ease-out flex flex-col items-center justify-end h-[40vh]"
//           >
//             {/* Image */}
//             <img
//               src={expert.image}
//               alt={expert.name}
//               className="w-full h-full absolute object-cover group-hover:scale-105 transition-all duration-300"
//               loading="lazy"
//             />

//             {/* Glass Info Card */}
//             <div
//               className="group-hover: 
//                 bg-white/70 backdrop-blur-xl 
//                 rounded-2xl px-4 py-4 
//                 shadow-xl mb-4 w-[90%]"
//             >
//               <h3 className="text-primary text-center font-semibold text-sm">
//                 {expert.name}
//               </h3>
//               <p className="text-gray-600 text-center text-xs mb-4">
//                 {expert.title}
//               </p>

//               {/* Social Buttons */}
//               <div className="flex justify-center gap-3">
//                 <SocialButton type="telegram" icon={<FaTelegramPlane />} />
//                 <SocialButton type="linkedin" icon={<FaLinkedinIn />} />
//                 <SocialButton type="email" icon={<FaRegEnvelope />} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ----------------- Reusable Social Button ----------------- */
// const SocialButton = ({ icon, type }) => {
//   const base =
//     "p-2.5 text-sm rounded-full flex items-center justify-center transition-all duration-300";

//   const styles = {
//     telegram: "bg-secondary text-white hover:brightness-90",
//     linkedin:
//       "border border-primary text-primary hover:bg-primary hover:text-white",
//     email:
//       "border border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white",
//   };

//   return <button className={`${base} ${styles[type]}`}>{icon}</button>;
// };


import React, { useState, useEffect } from "react";
import { FaLinkedinIn, FaRegEnvelope, FaTelegramPlane } from "react-icons/fa";
import { getDoctors } from "../../api/userApi"; 

export default function ExpertsSection() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors data from API
  useEffect(() => {
    const loadExperts = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        console.log("📋 Experts data loaded:", data);
        
        // Transform API data to match component structure
        const transformedExperts = data.map(doctor => ({
          name: doctor.fullname || "Dr. Name Not Available",
          title: doctor.specialization || "Medical Specialist",
          image: doctor.photo || "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60",
          qualification: doctor.qualification,
          experience: doctor.experience_years,
          bio: doctor.bio
        }));

        setExperts(transformedExperts);
        setError(null);
      } catch (err) {
        console.error("❌ Error loading experts:", err);
        setError(err.message);
        // Fallback to sample data if API fails
       
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="px-5 mb-20 bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 py-16">
        {/* Header */}
        <div className="text-start mb-12">
          <h2 className="text-3xl font-bold text-primary">Experts</h2>
          <p className="text-gray-600 text-sm mt-1">
            Professionals at Work — delivering excellence in every case
          </p>
        </div>

        {/* Loading Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:grid-cols-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl group transition-all duration-500 ease-out flex flex-col items-center justify-end h-[40vh] animate-pulse"
            >
              {/* Loading Image */}
              <div className="w-full h-full absolute bg-gray-300" />
              
              {/* Loading Glass Info Card */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl px-4 py-4 shadow-xl mb-4 w-[90%]">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state (still shows data but with fallback)
  if (error && experts.length === 0) {
    return (
      <div className="px-5 mb-20 bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 py-16">
        {/* Header */}
        <div className="text-start mb-12">
          <h2 className="text-3xl font-bold text-primary">Experts</h2>
          <p className="text-gray-600 text-sm mt-1">
            Professionals at Work — delivering excellence in every case
          </p>
          <p className="text-red-500 text-xs mt-2">Failed to load experts data</p>
        </div>

        {/* Fallback Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:grid-cols-1">
          {experts.map((expert, idx) => (
            <ExpertCard key={idx} expert={expert} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-5 mb-20 
        bg-gradient-to-tl from-white/0 via-accent/50 to-white/0 py-16"
    >
      {/* Header */}
      <div className="text-start mb-12">
        <h2 className="text-3xl font-bold text-primary">Experts</h2>
        <p className="text-gray-600 text-sm mt-1">
          Professionals at Work — delivering excellence in every case
        </p>
        {error && (
          <p className="text-yellow-600 text-xs mt-2">
            Using cached data: {error}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-sm:grid-cols-1">
        {experts.map((expert, idx) => (
          <ExpertCard key={idx} expert={expert} />
        ))}
      </div>
    </div>
  );
}

/* ----------------- Expert Card Component ----------------- */
const ExpertCard = ({ expert }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl group transition-all duration-500 ease-out flex flex-col items-center justify-end h-[40vh]">
      {/* Image */}
      <img
        src={expert.image}
        alt={expert.name}
        className="w-full h-full absolute object-cover group-hover:scale-105 transition-all duration-300"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60";
        }}
      />

      {/* Glass Info Card */}
      <div
        className="group-hover: 
          bg-white/70 backdrop-blur-xl 
          rounded-2xl px-4 py-4 
          shadow-xl mb-4 w-[90%]"
      >
        <h3 className="text-primary text-center font-semibold text-sm">
          {expert.name}
        </h3>
        <p className="text-gray-600 text-center text-xs ">
          {expert.title}
        </p>
        <p className="text-gray-600 text-center text-xs mb-4">
          Experience : {expert.experience} years
        </p>
        {/* Social Buttons */}
        <div className="flex justify-center gap-3">
          <SocialButton type="telegram" icon={<FaTelegramPlane />} />
          <SocialButton type="linkedin" icon={<FaLinkedinIn />} />
          <SocialButton type="email" icon={<FaRegEnvelope />} />
        </div>
      </div>
    </div>
  );
};

/* ----------------- Reusable Social Button ----------------- */
const SocialButton = ({ icon, type }) => {
  const base =
    "p-2.5 text-sm rounded-full flex items-center justify-center transition-all duration-300";

  const styles = {
    telegram: "bg-secondary text-white hover:brightness-90",
    linkedin:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    email:
      "border border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white",
  };

  return <button className={`${base} ${styles[type]}`}>{icon}</button>;
};