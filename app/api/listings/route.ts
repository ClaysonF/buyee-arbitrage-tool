import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(listings);
}