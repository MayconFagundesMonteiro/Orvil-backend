/*
  Warnings:

  - You are about to alter the column `ano` on the `Livros` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capa" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "ano" INTEGER NOT NULL,
    "edicao" INTEGER,
    "genero" TEXT NOT NULL
);
INSERT INTO "new_Livros" ("ano", "autor", "capa", "edicao", "editora", "genero", "id", "titulo") SELECT "ano", "autor", "capa", "edicao", "editora", "genero", "id", "titulo" FROM "Livros";
DROP TABLE "Livros";
ALTER TABLE "new_Livros" RENAME TO "Livros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
