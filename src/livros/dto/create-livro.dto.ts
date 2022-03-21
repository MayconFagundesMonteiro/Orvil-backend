import { IsNumber, IsOptional, IsString } from "class-validator";
import { Livro } from "../entities/livro.entity";
import { ApiProperty } from "@nestjs/swagger"

export class CreateLivroDto extends Livro {
    @IsString()
    @ApiProperty({
        example: "url da capa",
        type: "string"
    })
    capa: string;

    @IsString()
    @ApiProperty({
        example: "Clean code",
        type: "string"
    })
    titulo: string;

    @IsString()
    @ApiProperty({
        example: "Bernado da Costa",
        type: "string"
    })
    autor: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "Paulistana",
        type: "string"
    })
    editora?: string;

    @IsNumber()
    @ApiProperty({
        example: 2022,
        type: "number"
    })
    ano: number;

    @IsNumber()
    @ApiProperty({
        example: 1,
        type: "number"
    })
    @IsOptional()
    edicao?: number;

    @IsString()
    @ApiProperty({
        example: "Ação, Aventura",
        type: "string"
    })
    genero: string;
}