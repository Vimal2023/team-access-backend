import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"
import { Role } from "@/types"

export async function POST(req: Request) {
  try {
    const { name, email, password, teamCode } = await req.json()

    if (!name || !email || !password)
      return NextResponse.json(
        { error: "Name, email, password required" },
        { status: 400 }
      )

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )

    let teamId: string | undefined
    if (teamCode) {
      const team = await prisma.team.findUnique({ where: { code: teamCode } })
      if (!team)
        return NextResponse.json(
          { error: "Invalid team code" },
          { status: 400 }
        )
      teamId = team.id
    }

    const userCount = await prisma.user.count()
    const role = userCount === 0 ? Role.ADMIN : Role.USER

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        role,
        teamId,
      },
      include: { team: true },
    })

    const token = generateToken(user.id)

    const response = NextResponse.json({ user })
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    )
  }
}
