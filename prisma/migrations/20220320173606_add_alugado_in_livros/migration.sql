-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alugado" BOOLEAN NOT NULL DEFAULT false,
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
