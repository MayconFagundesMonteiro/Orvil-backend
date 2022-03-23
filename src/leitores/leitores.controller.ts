import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LeitoresService } from './leitores.service';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { UpdateLeitorDto } from './dto/update-leitor.dto';
import { Response } from "express"

@ApiTags("Leitores")
@Controller('api/leitores')
export class LeitoresController {
  constructor(private readonly _leitoresService: LeitoresService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um leitor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Leitor criado com sucesso.',
  })
  @ApiBody({
    description: 'Payload para cria um novo leitor',
    type: CreateLeitorDto
  })
  create(@Body() createLeitorDto: CreateLeitorDto) {
    return this._leitoresService.create(createLeitorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtem todos os leitores' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de leitores cadastrados',
    isArray: true
  })
  findAll() {
    return this._leitoresService.findAll();
  }

  @Get("getbyname?")
  @ApiOperation({ summary: 'Obtem leitores por nome' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de leitores cadastrados',
    isArray: true
  })
  @HttpCode(HttpStatus.OK)
  getByName(@Query("name") nome: string) {
    return this._leitoresService.findByName(nome);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtem um leitor por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Leitor informado',
    isArray: false
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Leitor não encontrado',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._leitoresService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um leitor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Leitor atualizado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Informação invalida.',
  })
  @ApiBody({
    description: 'Payload para atualizar um leitor',
    type: CreateLeitorDto
  })
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateLeitorDto: UpdateLeitorDto) {
    const result = await this._leitoresService.update(+id, updateLeitorDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um leitor por id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Leitor deletado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Leitor não encontrado',
  })
  async remove(@Res() res: Response, @Param('id') id: string) {
    const result = await this._leitoresService.remove(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}