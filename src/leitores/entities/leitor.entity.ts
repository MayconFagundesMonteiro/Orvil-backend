import { Prisma } from "@prisma/client";

export class Leitor implements Prisma.LeitoresUncheckedCreateInput {
    id?: number;
    nome: string;
    sexo: string;
    cidade: string;
    email: string;
    telefone: string;
}