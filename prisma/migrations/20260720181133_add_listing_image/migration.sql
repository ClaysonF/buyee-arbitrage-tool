/*
  Warnings:

  - Made the column `keyword` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT,
    "source" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Listing" ("createdAt", "id", "keyword", "price", "source", "title", "url") SELECT "createdAt", "id", "keyword", "price", "source", "title", "url" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE UNIQUE INDEX "Listing_url_key" ON "Listing"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
