import Header from "@/components/layout/Header";
import { AuthProvider } from "@/providers/AuthProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </AuthProvider>
  );
}
