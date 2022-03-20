import { Prisma } from "@prisma/client";

export class Registro implements Prisma.RegistrosUncheckedCreateInput {
    id?: number;
    ativo?: boolean;
    leitorId: number;
    livroId: number;
    dataEmprestimo: string | Date;
    dataDevolucao: string | Date;
}