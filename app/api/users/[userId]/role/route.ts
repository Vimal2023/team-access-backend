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

  const { role } = await req.json()

  if (![Role.USER, Role.MANAGER].includes(role))
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })

  const user = await prisma.user.update({
    where: { id: params.userId },
    data: { role },
  })

  return NextResponse.json({ user })
}
