-- CreateTable
CREATE TABLE "Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capa" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "ano" DATETIME NOT NULL,
    "edicacao" INTEGER,
    "genero" TEXT NOT NULL
);
