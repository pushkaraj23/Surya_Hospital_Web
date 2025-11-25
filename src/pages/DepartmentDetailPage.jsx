import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DepartmentDetail from "../components/Departements/DepartmentDetail";
import { fetchDepartmentById } from "../api/userApi";

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================================
  // Fetch department by ID
  // ================================
  useEffect(() => {
    async function loadDepartment() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDepartmentById(id);
        setDepartment(data);
      } catch (err) {
        setError(err.message || "Failed to load department details");
      } finally {
        setLoading(false);
      }
    }

    loadDepartment();
  }, [id]);

  // ================================
  // Loading State
  // ================================
  if (loading) {
    return (
      <div className="p-10 text-center text-primary font-semibold tracking-wide">
        Loading Department Details...
      </div>
    );
  }

  // ================================
  // Error State
  // ================================
  if (error) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold tracking-wide">
        {error}
      </div>
    );
  }

  // ================================
  // Not Found State
  // ================================
  if (!department) {
    return (
      <div className="p-10 text-center text-red-600">Department not found</div>
    );
  }

  // ================================
  // Success State → Show Details
  // ================================
  return <DepartmentDetail department={department} />;
}
