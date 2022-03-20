import { IsDate, IsOptional, IsString } from "class-validator";
import { Livro } from "../entities/livro.entity";

export class CreateLivroDto extends Livro {
    @IsString()
    capa: string;

    @IsString()
    titulo: string;

    @IsString()
    autor: string;

    @IsString()
    @IsOptional()
    editora?: string;

    @IsString()
    @IsDate()
    ano: number;

    @IsString()
    @IsOptional()
    edicao?: number;

    @IsString()
    genero: string;
}