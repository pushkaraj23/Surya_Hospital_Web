import { useNavigate } from "react-router-dom";
import departmentsData from "./DepartmentsData";

export default function DepartmentCard({ department }) {
  const navigate = useNavigate();

  const doctors = departmentsData.doctors.filter((doctor) =>
    department.doctors.includes(doctor.id)
  );

  return (
    <div
      onClick={() => navigate(`/departments/${department.id}`)}
      className="
        group cursor-pointer rounded-2xl overflow-hidden shadow-lg 
        bg-white border border-gray-100 
        hover:shadow-2xl hover:-translate-y-1 
        transition-all duration-300
      "
    >
      {/* Header Gradient */}
      <div
        className="
        bg-gradient-to-br 
        from-primary 
        via-primary/90 
        to-secondary 
        p-6 text-white 
        relative
      "
      >
        {/* Floating Icon */}
        <div
          className="
          w-14 h-14 rounded-xl 
          bg-white/20 backdrop-blur-md
          flex items-center justify-center 
          text-2xl shadow-inner
        "
        >
          {department.icon}
        </div>

        {/* Department Name */}
        <h3 className="text-2xl font-bold mt-4 tracking-wide">
          {department.name}
        </h3>

        {/* Short Description */}
        <p className="text-white/90 text-sm mt-1">
          {department.shortDescription}
        </p>

        {/* Specialists Badge */}
        <div
          className="
          absolute top-4 right-4 
          bg-white/20 backdrop-blur-md 
          px-3 py-1 rounded-full text-xs font-semibold 
          text-white shadow
        "
        >
          {doctors.length} Specialists
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          {department.description}
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center">
            <div className="text-primary font-bold">
              {department.stats.successRate}
            </div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
          <div className="text-center">
            <div className="text-secondary font-bold">
              {department.stats.patients}
            </div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold">
              {department.stats.experience}
            </div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
        </div>

        {/* Service Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {department.services.slice(0, 3).map((service, i) => (
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

          {department.services.length > 3 && (
            <span
              className="
              px-3 py-1 bg-secondary/10 text-secondary 
              rounded-full text-xs font-medium border border-secondary/20
            "
            >
              +{department.services.length - 3} more
            </span>
          )}
        </div>

        {/* Footer CTA */}
        <div
          className="
          flex items-center justify-between pt-4 
          border-t border-gray-200
        "
        >
          <span
            className="
            text-primary font-semibold text-sm 
            group-hover:text-secondary transition
          "
          >
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
