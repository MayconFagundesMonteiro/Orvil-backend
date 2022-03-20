-- CreateTable
CREATE TABLE "Registros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitorId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "dataEmprestimo" DATETIME NOT NULL,
    "dataDevolucao" DATETIME NOT NULL,
    CONSTRAINT "Registros_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registros_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
