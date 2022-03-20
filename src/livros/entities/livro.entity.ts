import { Prisma } from "@prisma/client";

export class Livro implements Prisma.LivrosUncheckedCreateInput {
    id?: number;
    capa: string;
    titulo: string;
    autor: string;
    editora?: string;
    ano: number;
    edicao?: number;
    genero: string;
}