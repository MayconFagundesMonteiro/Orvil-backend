import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Response } from 'express';

@ApiTags("Livros")
@Controller('api/livros')
export class LivrosController {
  constructor(private readonly _livrosService: LivrosService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um livro' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Livro criado com sucesso.',
  })
  @ApiBody({
    description: 'Payload para cria um novo livro',
    type: CreateLivroDto
  })
  create(@Body() createLivroDto: CreateLivroDto) {
    return this._livrosService.create(createLivroDto);
  }

  @Get("alugados")
  @ApiOperation({ summary: 'Obtem todos os livros alugados' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de livros alugados',
    isArray: true
  })
  findAllUnavailable() {
    return this._livrosService.findAllUnavailable();
  }

  @Get()
  @ApiOperation({ summary: 'Obtem todos os livros disponíveis' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de livros disponíveis',
    isArray: true
  })
  findAll() {
    return this._livrosService.findAll();
  }

  @Get("getbytitle?")
  @ApiOperation({ summary: 'Obtem livros disponíveis por titulo' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de livros disponíveis',
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Informe um titulo para busca',
    isArray: true
  })
  @HttpCode(HttpStatus.OK)
  findByTitle(@Query("title") title: string) {
    return this._livrosService.findByTitle(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtem um livro por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Livro informado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Livro não encontrado',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._livrosService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um livro' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Livro atualziado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Informação invalida.',
  })
  @ApiBody({
    description: 'Payload para atualizar um novo livro',
    type: CreateLivroDto
  })
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    const result = await this._livrosService.update(+id, updateLivroDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json({ message: `O Livro de id ${+id} não foi encontrado.` })
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um livro por id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Livro deletado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Livro não encontrado',
  })
  async remove(@Res() res: Response, @Param('id') id: string) {
    const result = await this._livrosService.remove(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}