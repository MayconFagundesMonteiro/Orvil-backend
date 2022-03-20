-- CreateTable
CREATE TABLE "Leitores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "none" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Leitores_email_key" ON "Leitores"("email");
