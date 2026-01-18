"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";


export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const nav = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          TeamAccess
        </Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname.startsWith(item.href)
                  ? "text-blue-400"
                  : "text-slate-300"
              } hover:text-blue-300`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-300">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-blue-400">
                Login
              </Link>
              <Link href="/register" className="text-sm text-green-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
