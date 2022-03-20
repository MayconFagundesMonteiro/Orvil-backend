import { IsNumber, IsOptional, IsString } from "class-validator";
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

    @IsNumber()
    ano: number;

    @IsNumber()
    @IsOptional()
    edicao?: number;

    @IsString()
    genero: string;
}