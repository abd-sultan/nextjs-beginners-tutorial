import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page: number = Number(searchParams.get("page")) || 1;
  const size: number = Number(searchParams.get("size")) || 10;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&per_page=${size}`
  );
  const data = await response.json();
  console.log("🚀 ~ GET ~ response:", data);
  return NextResponse.json(data);
}
