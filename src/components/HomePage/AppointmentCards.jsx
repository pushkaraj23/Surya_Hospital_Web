import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// React Icons
import { FiGrid, FiUsers, FiPhoneCall, FiCalendar } from "react-icons/fi";

/* --------------------- Single Card Component --------------------- */
const AppointmentCard = ({
  icon: Icon,
  title1,
  title2,
  description,
  bg,
  iconBg,
  buttonColor,
  index,
  isInView,
  route,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      onClick={() => navigate(route)}
      className={`
        rounded-3xl p-6 w-full shadow-lg cursor-pointer 
        ${bg} bg-opacity-90 backdrop-blur-sm
        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
      `}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`${iconBg} p-4 rounded-2xl shadow-md flex items-center justify-center`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <div>
          <h2 className={`text-xl font-semibold leading-tight text-gray-800`}>
            {title1}
          </h2>
          <h2 className={`text-xl font-semibold leading-tight text-gray-800`}>
            {title2}
          </h2>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-black/85 opacity-70 leading-relaxed mb-6">
        {description}
      </p>

      {/* CTA Button */}
      <button
        className={`
          w-full bg-white ${buttonColor} font-semibold py-3 rounded-xl
          shadow-md hover:shadow-lg transition-all
        `}
      >
        Visit Page
      </button>
    </motion.div>
  );
};

/* --------------------- Main Section --------------------- */
export default function AppointmentCards() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 4 Cards Data
  const cards = [
    {
      icon: FiGrid,
      title1: "Explore",
      title2: "Departments",
      description: "Discover our specialized medical departments and services.",
      route: "/departments",
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-200",
      iconBg: "bg-yellow-500",
      buttonColor: "text-yellow-600",
    },
    {
      icon: FiUsers,
      title1: "Meet Our",
      title2: "Doctors",
      description: "Find trusted experts and specialists for your care.",
      route: "/doctors",
      bg: "bg-gradient-to-br from-orange-50 to-orange-200",
      iconBg: "bg-orange-500",
      buttonColor: "text-orange-600",
    },
    {
      icon: FiPhoneCall,
      title1: "Get In",
      title2: "Touch",
      description: "Reach out to our support team for any assistance.",
      route: "/contact",
      bg: "bg-gradient-to-br from-blue-50 to-blue-300",
      iconBg: "bg-blue-700",
      buttonColor: "text-blue-700",
    },
    {
      icon: FiCalendar,
      title1: "Book Your",
      title2: "Appointment",
      description: "Schedule a consultation with top medical experts.",
      route: "/appBook",
      bg: "bg-gradient-to-br from-blue-100 to-blue-400",
      iconBg: "bg-blue-900",
      buttonColor: "text-blue-900",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="bg-gray-50 px-5 py-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item, idx) => (
          <AppointmentCard
            key={idx}
            index={idx}
            isInView={isInView}
            {...item} // Spread all props
          />
        ))}
      </div>
    </motion.section>
  );
}
