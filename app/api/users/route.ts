import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { Role } from "@/types"
import { Prisma } from "@/generated/prisma"

export async function GET(req: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const where: Prisma.UserWhereInput = {}
    

  if (currentUser.role === Role.MANAGER) {
    where.OR = [
      { teamId: currentUser.teamId },
      { role: Role.USER },
    ]
  }

  if (currentUser.role === Role.USER) {
    where.teamId = currentUser.teamId
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      team: { select: { id: true, name: true } },
      createdAt: true,
    },
  })

  return NextResponse.json({ users })
}
