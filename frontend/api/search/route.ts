import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const {searchParams}=new URL(request.url)
    const query=searchParams.get("query")

    const res = await fetch(
    `http://localhost:8000/search?query=${encodeURIComponent(query!)}`
  )

  const data = await res.json()
  return NextResponse.json(data)
}