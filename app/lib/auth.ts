import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "./db"
import { Role, User } from "@/types"

const JWT_SECRET = process.env.JWT_SECRET!

//PASSWORD 
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword)
}

// JWT 
export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string }
}

// CURRENT USER
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) return null

    const { userId } = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { team: true },
    })

    if (!user) return null

    const { password, ...safeUser } = user;
    return safeUser as User
  } catch {
    return null
  }
}

//PERMISSIONS
export function checkUserPermission(
  user: User,
  requiredRole: Role
): boolean {
  const hierarchy: Record<Role, number> = {
    GUEST: 0,
    USER: 1,
    MANAGER: 2,
    ADMIN: 3,
  }

  return hierarchy[user.role] >= hierarchy[requiredRole]
}
