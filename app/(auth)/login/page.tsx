"use client";

import { useActionState } from "react";
import { api } from "@/lib/api-client";

type LoginState = {
  error?: string;
};

export default function LoginPage() {
  const [, loginAction, isPending] = useActionState<
    LoginState,
    FormData
  >(async (_prevState: LoginState, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await api.login(email, password);
    window.location.href = "/dashboard";

    return {};
  }, {});

  return (
    <form
      action={loginAction}
      className="bg-slate-800 p-8 rounded-lg w-96"
    >
      <h2 className="text-xl font-bold mb-4 text-white">
        Sign in to your account
      </h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full mb-4 p-2 rounded bg-slate-700 text-white"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 p-2 rounded text-white"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
