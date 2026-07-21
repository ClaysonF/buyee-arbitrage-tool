import { chromium } from "playwright";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const keyword = body.keyword;

  const searchSession = await prisma.searchSession.create({
  data: {
      keyword,
    },
  });

  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    const searchUrl =
      `https://buyee.jp/mercari/search?keyword=${encodeURIComponent(
        keyword
      )}&translationType=99&status=on_sale`;

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForTimeout(5000);

    const listings = await page
      .locator("a[href*='/mercari/item/']")
      .evaluateAll((cards) =>
        cards.slice(0, 20).map((card) => {
          const title =
            card.querySelector("h2.name")?.textContent?.trim() ??
            "Unknown Title";

          const priceText =
            card.querySelector("p.price")?.textContent ?? "0";

          const price = Number(
            priceText
              .replace("YEN", "")
              .replace(/,/g, "")
              .trim()
          );

          const href =
            card.getAttribute("href") ?? "";

          const img = card.querySelector("img");

          const image =
            img?.getAttribute("src") ||
            img?.getAttribute("data-src") ||
            img?.getAttribute("data-original") ||
            img?.getAttribute("data-lazy-src") ||
            "";

          return {
            title,
            price,
            url: `https://buyee.jp${href}`,
            imageUrl: image.startsWith("//")
              ? `https:${image}`
              : image,
          };
        })
      );

    console.log("FIRST PARSED LISTING:");
    console.log(listings[0]);

    for (const listing of listings) {
      await prisma.listing.upsert({
        where: {
          url: listing.url,
        },
        update: {
          title: listing.title,
          price: listing.price,
          imageUrl: listing.imageUrl,
          source: "Mercari",
          keyword,
          searchId: searchSession.id,
        },
        create: {
          title: listing.title,
          price: listing.price,
          url: listing.url,
          imageUrl: listing.imageUrl,
          source: "Mercari",
          keyword,
          searchId: searchSession.id,
        },
      });
    }

    const count = await prisma.listing.count();

    console.log("Listing count:", count);

    return NextResponse.json({
      keyword,
      imported: listings.length,
    });
  } finally {
    await browser.close();
  }
}