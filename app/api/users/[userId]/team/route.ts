import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser, checkUserPermission } from "@/lib/auth"
import { Role } from "@/types"

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const admin = await getCurrentUser()
  if (!admin || !checkUserPermission(admin, Role.ADMIN))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { teamId } = await req.json()

  const user = await prisma.user.update({
    where: { id: params.userId },
    data: { teamId },
    include: { team: true },
  })

  return NextResponse.json({ user })
}
