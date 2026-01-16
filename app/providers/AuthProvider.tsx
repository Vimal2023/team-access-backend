"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { AuthContextType, Role, User } from "@/types/index";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.me().then((res) => {
      if (res?.user) setUser(res.user);
    });
  }, []);

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await api.login(email, password);

  if (res?.user) {
    setUser(res.user);
  }
};


  const hasPermission = (requiredRole: Role): boolean => {
    if (!user) return false;

    const rolePriority: Record<Role, number> = {
      [Role.GUEST]: 0,
      [Role.USER]: 1,
      [Role.MANAGER]: 2,
      [Role.ADMIN]: 3,
    };

    return rolePriority[user.role] >= rolePriority[requiredRole];
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, hasPermission, logout }}
    >
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
