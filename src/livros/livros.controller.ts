import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Response } from 'express';

@Controller('livros')
export class LivrosController {
  constructor(private readonly _livrosService: LivrosService) { }

  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    return this._livrosService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this._livrosService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._livrosService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    const result = await this._livrosService.update(+id, updateLivroDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json({ message: `O registro de id ${+id} não foi encontrado.` })
    return res.status(HttpStatus.OK).json(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._livrosService.remove(+id);
  }
}