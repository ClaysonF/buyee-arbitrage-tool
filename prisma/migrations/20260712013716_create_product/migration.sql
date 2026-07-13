-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "buyeeUrl" TEXT NOT NULL,
    "buyPrice" REAL NOT NULL,
    "shippingCost" REAL NOT NULL,
    "expectedSalePrice" REAL NOT NULL,
    "estimatedProfit" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
