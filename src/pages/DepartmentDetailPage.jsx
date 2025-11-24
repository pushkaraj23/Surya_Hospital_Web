import { useParams, useNavigate } from "react-router-dom";
import departmentsData from "../components/Departements/DepartmentsData";
import DepartmentDetail from "../components/Departements/DepartmentDetail";

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const department = departmentsData.departments.find(
    (d) => d.id === Number(id)
  );

  if (!department) {
    return (
      <div className="p-10 text-center text-red-600">Department not found</div>
    );
  }

  return (
    <DepartmentDetail
      department={department}
      onBack={() => navigate("/departments")}
      onDoctorSelect={(doc) => navigate(`/departments/${id}/doctors/${doc.id}`)}
    />
  );
}
