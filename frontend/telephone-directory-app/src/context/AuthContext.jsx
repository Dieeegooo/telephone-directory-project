import { createContext, useContext, useState } from "react";

// Contesto di autenticazione: tiene il token e lo stato "sono loggato?"
// condivisi in tutta l'app, così la navbar e le rotte reagiscono al login/logout.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // il token iniziale lo leggo da localStorage: se ricarico la pagina resto loggato
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
