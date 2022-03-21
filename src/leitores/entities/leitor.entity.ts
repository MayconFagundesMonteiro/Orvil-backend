import { Prisma } from "@prisma/client";

export class Leitor implements Prisma.LeitoresUncheckedCreateInput {
    id?: number;
    excluido?: boolean;
    nome: string;
    sexo: string;
    cidade: string;
    email: string;
    telefone: string;
}