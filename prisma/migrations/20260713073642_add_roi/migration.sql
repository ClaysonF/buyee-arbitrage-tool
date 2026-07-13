/*
  Warnings:

  - Added the required column `roi` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "buyeeUrl" TEXT NOT NULL,
    "buyPrice" REAL NOT NULL,
    "shippingCost" REAL NOT NULL,
    "expectedSalePrice" REAL NOT NULL,
    "estimatedProfit" REAL NOT NULL,
    "roi" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("buyPrice", "buyeeUrl", "createdAt", "estimatedProfit", "expectedSalePrice", "id", "shippingCost", "title") SELECT "buyPrice", "buyeeUrl", "createdAt", "estimatedProfit", "expectedSalePrice", "id", "shippingCost", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
