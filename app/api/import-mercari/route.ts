import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Mercari import request:", body);

  return NextResponse.json({
    success: true,
  });
}