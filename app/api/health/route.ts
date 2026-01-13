import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/db"

export async function GET() {
  const connected = await checkDatabaseConnection()

  if (!connected) {
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 503 }
    )
  }

  return NextResponse.json(
    { status: "ok", message: "Database connected" },
    { status: 200 }
  )
}
