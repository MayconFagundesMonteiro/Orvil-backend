import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Registro } from "../entities/registro.entity";

export class CreateRegistroDto extends Registro {
    @IsBoolean()
    ativo?: boolean;

    @IsNumber()
    leitorId: number;

    @IsNumber()
    livroId: number;

    @IsString()
    dataEmprestimo: string;

    @IsString()
    dataDevolucao: string;
}