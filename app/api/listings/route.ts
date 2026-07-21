import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchId = request.nextUrl.searchParams.get("searchId");

  const listings = await prisma.listing.findMany({
    where: searchId
      ? {
          searchId: Number(searchId),
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(listings);
}