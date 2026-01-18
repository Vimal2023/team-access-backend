const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  teamCode?: string;
};

class ApiClient {
  async request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Request failed");

    return res.json();
  }

  register(data: RegisterPayload) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  login(email: string, password: string) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  logout() {
    return this.request("/api/auth/logout", { method: "POST" });
  }

  me() {
    return this.request("/api/auth/me");
  }

  updateUserRole(id: string, role: string) {
    return this.request(`/api/user/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  }

  assignUserToTeam(id: string, teamId: string | null) {
    return this.request(`/api/user/${id}/team`, {
      method: "PATCH",
      body: JSON.stringify({ teamId }),
    });
  }
}

export const api = new ApiClient();
