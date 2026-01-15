"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api-client";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "MANAGER";
  teamId?: string | null;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.me().then((res) => {
      if (res?.user) setUser(res.user);
    });
  }, []);

  const logout = async () => {
    await api.logout();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
