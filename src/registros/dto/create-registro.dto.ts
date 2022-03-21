import { IsNumber, IsString } from "class-validator";
import { Registro } from "../entities/registro.entity";
import { ApiProperty } from "@nestjs/swagger"

export class CreateRegistroDto extends Registro {
    @ApiProperty({
        example: 1,
        type: "number"
    })
    @IsNumber()
    leitorId: number;

    @ApiProperty({
        example: 1,
        type: "number"
    })
    @IsNumber()
    livroId: number;

    @ApiProperty({
        example: "2022-03-20",
        type: "string"
    })
    @IsString()
    dataEmprestimo: string;

    @ApiProperty({
        example: "2022-03-20",
        type: "string"
    })
    @IsString()
    dataDevolucao: string;
}