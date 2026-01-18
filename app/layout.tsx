import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "Team Access Control",
  description: "Role-based access control system",
  keywords: ["access control", "role-based", "team management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-200">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
