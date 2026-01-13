import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email },
    include: { team: true },
  })

  if (!user || !(await verifyPassword(password, user.password)))
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )

  const token = generateToken(user.id)
  const { password: _, ...safeUser } = user

  const response = NextResponse.json({ user: safeUser })
  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
