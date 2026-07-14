import { chromium } from "playwright";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const keyword = body.keyword;

  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    const searchUrl =
      `https://buyee.jp/mercari/search?keyword=${encodeURIComponent(
        keyword
      )}&status=on_sale`;

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForTimeout(5000);

    const links = await page
      .locator("a")
      .evaluateAll((elements) =>
        elements.map((element) => ({
          text: element.textContent?.trim(),
          href: element.getAttribute("href"),
        }))
      );

    const mercariLinks = links.filter(
      (link) =>
        link.href &&
        link.href.includes("/mercari/item/")
    );

    const listings = mercariLinks
      .slice(0, 20)
      .map((listing) => {
        const text = listing.text ?? "";

        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        const title = lines[0];

        const priceLine =
          lines.find((line) =>
            line.includes("YEN")
          ) ?? "0";

        const price = Number(
          priceLine
            .replace("YEN", "")
            .replace(/,/g, "")
            .trim()
        );

        return {
          title,
          price,
          url: `https://buyee.jp${listing.href}`,
        };
      });

    console.log("FIRST PARSED LISTING:");
    console.log(listings[0]);

    for (const listing of listings) {
      await prisma.listing.upsert({
        where: {
          url: listing.url,
        },
        update: {},
        create: {
          title: listing.title,
          price: listing.price,
          url: listing.url,
          source: "Mercari",
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