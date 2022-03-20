/*
  Warnings:

  - You are about to drop the column `none` on the `Leitores` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Leitores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leitores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Leitores" ("cidade", "email", "id", "sexo", "telefone") SELECT "cidade", "email", "id", "sexo", "telefone" FROM "Leitores";
DROP TABLE "Leitores";
ALTER TABLE "new_Leitores" RENAME TO "Leitores";
CREATE UNIQUE INDEX "Leitores_email_key" ON "Leitores"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
