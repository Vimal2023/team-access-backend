import "dotenv/config" 
import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  await prisma.user.deleteMany()
  await prisma.team.deleteMany()

  const engineering = await prisma.team.create({
    data: { name: "Engineering", code: "ENG" },
  })

  const marketing = await prisma.team.create({
    data: { name: "Marketing", code: "MKT" },
  })

  const hashedPassword = await bcrypt.hash("password123", 12)

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@company.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  await prisma.user.create({
    data: {
      name: "Bob Manager",
      email: "bob@company.com",
      password: hashedPassword,
      role: Role.MANAGER,
      teamId: engineering.id,
    },
  })

  await prisma.user.create({
    data: {
      name: "Alice User",
      email: "alice@company.com",
      password: hashedPassword,
      role: Role.USER,
      teamId: engineering.id,
    },
  })

  console.log(" Database seeded successfully")
}

main()
  .catch((err) => {
    console.error(" Seeding failed:", err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
