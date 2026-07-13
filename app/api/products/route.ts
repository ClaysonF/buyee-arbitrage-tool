import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  const product = await prisma.product.create({
    data: {
      title: body.title,
      buyeeUrl: body.buyeeUrl,
      buyPrice: body.buyPrice,
      shippingCost: body.shippingCost,
      expectedSalePrice: body.expectedSalePrice,
      estimatedProfit: body.estimatedProfit,
    },
  });

  return NextResponse.json(product);
}