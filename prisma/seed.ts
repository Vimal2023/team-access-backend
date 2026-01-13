import { PrismaClient, Role } from "@/generated/prisma";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const engineering = await prisma.team.create({
    data: { name: "Engineering", code: "ENG" },
  })

  const marketing = await prisma.team.create({
    data: { name: "Marketing", code: "MKT" },
  })

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@company.com",
      password: await bcrypt.hash("password123", 12),
      role: Role.ADMIN,
    },
  })

  await prisma.user.create({
    data: {
      name: "Bob Manager",
      email: "bob@company.com",
      password: await bcrypt.hash("password123", 12),
      role: Role.MANAGER,
      teamId: engineering.id,
    },
  })

  await prisma.user.create({
    data: {
      name: "Alice User",
      email: "alice@company.com",
      password: await bcrypt.hash("password123", 12),
      role: Role.USER,
      teamId: engineering.id,
    },
  })

  console.log("Database seeded")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
