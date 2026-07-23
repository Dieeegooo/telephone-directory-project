import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Avvolge le pagine che richiedono il login.
// Se non sei autenticato, ti rimanda al login invece di mostrare la pagina.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
