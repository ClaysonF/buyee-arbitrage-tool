import { chromium } from "playwright";
import { NextResponse } from "next/server";

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

    console.log("Title:", await page.title());

    const html = await page.content();
    console.log("HTML length:", html.length);
    console.log(html.substring(0, 500));

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
        link.href.includes("/mercari/")
    );

    console.log("Total links:", links.length);
    console.log(
      "Mercari links:",
      mercariLinks.slice(0, 20)
    );

    const listings = mercariLinks.slice(0, 20);

    return NextResponse.json({
      keyword,
      count: listings.length,
      listings,
    });
  } finally {
    await browser.close();
  }
}