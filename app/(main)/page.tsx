import Link from "next/link";

export default function HomePage() {
  const user = false;
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">
        Team Access Control Demo
      </h1>

      <p className="text-slate-300 mb-8">
        Role-based access control system built using Next.js 16 and React 19.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-3">Features Contain</h3>
          <ul className="list-disc list-inside ml-5 text-sm text-slate-300 space-y-1">
            <li>Role-based access control (RBAC)</li>
            <li>Route protection with middleware</li>
            <li>Server-side permission checks</li>
            <li>Client-side permission hooks</li>
            <li>Dynamic route access</li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-3">User Roles</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              <strong className="text-purple-400">Super_Admin:</strong> Full
              System access
            </li>
            <li>
              <strong className="text-green-400">Admin:</strong> User & team
              Management
            </li>
            <li>
              <strong className="text-yellow-400">Manager:</strong>{" "}
              Team-specific management
            </li>
            <li>
              <strong className="text-blue-400">User:</strong> Basic Dashboard
              access
            </li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
          <p className="text-green-300 mb-2">
            Welcome back <strong>User</strong>, you are logged in as{" "}
            <strong className="text-green-200">USER</strong>
          </p>
          <Link
            href="/dashboard"
            className="inline-block text-sm text-green-400 hover:text-green-300"
          >
            Go to Dashboard →
          </Link>
        </div>
      ) : (
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <p className="text-slate-300 mb-3">
            Login or register to access your dashboard
          </p>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm rounded bg-slate-700 text-white hover:bg-slate-600"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
