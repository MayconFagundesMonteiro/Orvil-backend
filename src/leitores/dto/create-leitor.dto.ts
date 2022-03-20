import { IsString } from "class-validator";
import { Leitor } from "../entities/leitor.entity";

export class CreateLeitorDto extends Leitor {
    @IsString()
    nome: string;

    @IsString()
    sexo: string;

    @IsString()
    cidade: string;

    @IsString()
    email: string;

    @IsString()
    telefone: string;
}
