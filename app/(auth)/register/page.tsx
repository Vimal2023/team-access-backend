"use client";

import { useActionState } from "react";
import { api } from "@/lib/api-client";
import Link from "next/link";

type RegisterState = {
  error?: string;
};

export default function RegisterPage() {
  const [state, registerAction, isPending] = useActionState<
    RegisterState,
    FormData
  >(async (_prevState: RegisterState, formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const teamCode = formData.get("teamCode") as string | null;

    try {
      await api.register({
        name,
        email,
        password,
        teamCode: teamCode || undefined,
      });

      window.location.href = "/dashboard";
      return {};
    } catch (err) {
      return { error: "Registration failed. Try again." };
    }
  }, {});

  return (
    <div className="bg-slate-800 p-8 rounded-lg border-slate-700 w-full max-w-md">
      <form action={registerAction}>
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">
            Create new account
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Or{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:underline cursor-pointer"
            >
              login to existing account
            </Link>
            .
          </p>
        </div>

        {state.error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-700 rounded p-2">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 font-medium text-slate-300"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="enter your full name"
              autoComplete="name"
              required
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-1 font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="enter your Email"
              autoComplete="email"
              required
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-1 font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="teamCode"
              className="block text-sm mb-1 font-medium text-slate-300"
            >
              Team Code (optional)
            </label>
            <input
              id="teamCode"
              name="name"
              type="text"
              placeholder="enter team code if you have one"
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
            <p className="text-xs text-slate-500 mt-1 ">Leave empty if you don&apos;t have a team code </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-600 p-2 rounded text-white"
        >
          {isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
