-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "leitorId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "dataEmprestimo" DATETIME NOT NULL,
    "dataDevolucao" DATETIME NOT NULL,
    CONSTRAINT "Registros_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registros_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Registros" ("dataDevolucao", "dataEmprestimo", "id", "leitorId", "livroId") SELECT "dataDevolucao", "dataEmprestimo", "id", "leitorId", "livroId" FROM "Registros";
DROP TABLE "Registros";
ALTER TABLE "new_Registros" RENAME TO "Registros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
