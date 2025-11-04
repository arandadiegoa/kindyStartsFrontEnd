import { useAuth } from "@/hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ validRoles}: {validRoles: string[]}) {

  const { role } = useAuth()

  if(!role) {
    return <Navigate to="/" replace />
  }
  
  if(!validRoles.includes(role)){
    return <Navigate to="/login" replace />
  }

  return <Outlet />

}