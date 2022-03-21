import { Controller, Get, Post, Body, Patch, Param, HttpStatus, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { RegistrosService } from './registros.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Response } from 'express';

@ApiTags("Registros")
@Controller('api/registros')
export class RegistrosController {
  constructor(private readonly _registrosService: RegistrosService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um registro' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registro criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Informação não encontrada.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Informação invalida.',
  })
  @ApiBody({
    description: 'Payload para cria um novo registro',
    type: CreateRegistroDto
  })
  async create(@Res() res: Response, @Body() createRegistroDto: CreateRegistroDto) {
    const response = await this._registrosService.create(createRegistroDto);
    if (typeof response === "string" && response === "O livro já está alugado") return res.status(HttpStatus.BAD_REQUEST).json({ message: response });
    if (typeof response === "string") return res.status(HttpStatus.NOT_FOUND).json({ message: response });
    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Obtem todos os registros ativos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de registros cadastrados',
    isArray: true
  })
  findAll() {
    return this._registrosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtem um registro por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registro informado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registro não encontrado',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._registrosService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um registro' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registro atualizado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Informação invalida.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Informação não encontrada.',
  })
  @ApiBody({
    description: 'Payload para atualizar um registro',
    type: CreateRegistroDto
  })
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    const result = await this._registrosService.update(+id, updateRegistroDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('devolucao/:id')
  @ApiOperation({ summary: 'Finaliza um registro e faz a devolução do livro em uso' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devolução realizada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Informação não encontrada.',
  })
  async devolucao(@Res() res: Response, @Param('id') id: string) {
    const result = await this._registrosService.devolucao(+id);
    if (result && typeof result === "string") return res.status(HttpStatus.NOT_FOUND).json({ message: result });
    return res.status(HttpStatus.OK).json(result);
  }
}