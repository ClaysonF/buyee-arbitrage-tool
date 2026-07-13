import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}

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
      roi: body.roi,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
}