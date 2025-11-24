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
      className="bg-white rounded-2xl shadow-lg cursor-pointer"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-xl">{department.icon}</span>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">Specialists</div>
            <div className="text-lg font-bold">{doctors.length}</div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{department.name}</h3>
        <p className="text-blue-100 text-sm">{department.shortDescription}</p>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm">{department.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-sm font-bold text-blue-600">
              {department.stats.successRate}
            </div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">
              {department.stats.patients}
            </div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">
              {department.stats.experience}
            </div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {department.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {service}
              </span>
            ))}
            {department.services.length > 3 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                +{department.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-semibold text-sm">Explore →</span>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            ⭐ 4.8
          </div>
        </div>
      </div>
    </div>
  );
}
