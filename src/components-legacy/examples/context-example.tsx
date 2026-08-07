import { createContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>
}

