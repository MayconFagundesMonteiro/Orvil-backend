import { IsString } from "class-validator";
import { Leitor } from "../entities/leitor.entity";
import { ApiProperty } from "@nestjs/swagger"

export class CreateLeitorDto extends Leitor {
    @IsString()
    @ApiProperty({
        example: "Marcos",
        type: 'string'
    })
    nome: string;

    @IsString()
    @ApiProperty({
        example: "M",
        type: "char"
    })
    sexo: string;

    @IsString()
    @ApiProperty({
        example: "Guaçui",
        type: "string"
    })
    cidade: string;

    @IsString()
    @ApiProperty({
        example: "exemplo@gmail.com",
        type: "string"
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: "(28) 99987-1515",
        type: "string"
    })
    telefone: string;
}
