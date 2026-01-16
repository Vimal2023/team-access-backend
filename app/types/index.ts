export enum Role {
  GUEST = "GUEST",
  USER = "USER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export interface Team {
  id: string
  name: string
  description?: string | null
  code: string
  members: User[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  teamId?: string | null
  team?: Team | null
  createdAt: Date
  updatedAt: Date
}

export interface AuthContextType  {
  user: User | null;
  login: (FormData : FormData) => void;
  hasPermission: (requiredRole: Role) => boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};
