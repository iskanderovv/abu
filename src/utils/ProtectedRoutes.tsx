import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children?: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user ? children : <Navigate to="/" />;
}
