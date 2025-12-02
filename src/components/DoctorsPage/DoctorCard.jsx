import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const cardFade = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardFade}
      initial="hidden"
      animate="visible"
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="
        bg-fadedblue/10 rounded-2xl shadow-md p-5 cursor-pointer 
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
        border border-fadedblue/50 h-full
      "
    >
      {/* Top Row */}
      <div className="flex items-center gap-4">
        {/* Doctor Image */}
        <div className="relative">
          <img
            src={doctor.photo || "/default-doctor.png"}
            alt={doctor.fullname}
            className="
              h-20 w-20 rounded-full object-cover border-4 
              border-primary/20 shadow-sm bg-gray-50
            "
          />

          {/* Expert Badge */}
          {doctor.isexpert && (
            <span
              className="
                absolute -bottom-1 -right-1 bg-secondary text-white 
                text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md
              "
            >
              Expert
            </span>
          )}
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {doctor.fullname}
          </h3>

          <p className="text-primary text-sm font-medium mt-0.5">
            {doctor.qualification}
          </p>

          <p className="text-gray-600 text-sm mt-1">{doctor.specialization}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 flex items-center justify-between">
        {/* Experience Badge */}
        <span
          className="
            px-3 py-1 text-xs bg-primary/5 text-primary border border-primary/20 
            rounded-full font-medium
          "
        >
          {doctor.experience_years || 0} yrs experience
        </span>

        {/* Department Badge */}
        <span
          className="
            px-3 py-1 text-xs bg-gray-100 text-gray-700 
            rounded-full border border-gray-200
          "
        >
          Dept #{doctor.departmentid}
        </span>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
