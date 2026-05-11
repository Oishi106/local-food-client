import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export default function RoleRoute({ allow, children }) {
  const { role, loading } = useUserRole();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!role || (Array.isArray(allow) && !allow.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}