import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

const AUTH_KEY = "kindyStarts-auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    //Se ejecuta una vez, cuando el componente carga
    try {
      const storeUser = localStorage.getItem(AUTH_KEY);
      if (storeUser) {
        return JSON.parse(storeUser) as AuthUser;
      }
    } catch (error) {
      console.log("Error al leer el authUser", error);
    }
    //Si no hay error, el estado inicial es null
    return null;
  });

  const login = (useData: AuthUser) => {
    setUser(useData);
    //Guardamos el user
    localStorage.setItem(AUTH_KEY, JSON.stringify(useData))
  };

  const logout = () => {
    setUser(null);
    //Borramos el user
    localStorage.removeItem(AUTH_KEY)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
