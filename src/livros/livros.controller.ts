import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Response } from 'express';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) { }

  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livrosService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.livrosService.findOne(+id);
    console.log(result);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  update(@Res() res: Response, @Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    if (+id <= 0) return res.status(HttpStatus.BAD_REQUEST).json({ message: "O parâmetro 'id é obrigatório." })
    return this.livrosService.update(+id, updateLivroDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livrosService.remove(+id);
  }
}