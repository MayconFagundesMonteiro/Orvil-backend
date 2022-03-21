-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alugado" BOOLEAN NOT NULL DEFAULT false,
    "excluido" BOOLEAN NOT NULL DEFAULT false,
    "capa" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "ano" INTEGER NOT NULL,
    "edicao" INTEGER,
    "genero" TEXT NOT NULL
);
INSERT INTO "new_Livros" ("alugado", "ano", "autor", "capa", "edicao", "editora", "genero", "id", "titulo") SELECT "alugado", "ano", "autor", "capa", "edicao", "editora", "genero", "id", "titulo" FROM "Livros";
DROP TABLE "Livros";
ALTER TABLE "new_Livros" RENAME TO "Livros";
CREATE TABLE "new_Leitores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "excluido" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Leitores" ("cidade", "email", "id", "nome", "sexo", "telefone") SELECT "cidade", "email", "id", "nome", "sexo", "telefone" FROM "Leitores";
DROP TABLE "Leitores";
ALTER TABLE "new_Leitores" RENAME TO "Leitores";
CREATE UNIQUE INDEX "Leitores_email_key" ON "Leitores"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
