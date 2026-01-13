import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const limit = searchParams.get("limit") ?? "5"

    if (!query) {
      return NextResponse.json(
        { error: "Missing query" },
        { status: 400 }
      )
    }

    const res = await fetch(
      `http://localhost:8000/search?query=${encodeURIComponent(query)}&limit=${limit}`
    )

    if (!res.ok) {
      throw new Error(`FastAPI failed: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)

  } catch (err: any) {
    console.error("Error in /api/search:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
