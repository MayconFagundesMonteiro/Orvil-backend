import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Response } from 'express';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly _registrosService: RegistrosService) { }

  @Post()
  async create(@Res() res: Response, @Body() createRegistroDto: CreateRegistroDto) {
    const response = await this._registrosService.create(createRegistroDto);
    if (typeof response === "string" && response === "O livro já está alugado") return res.status(HttpStatus.BAD_REQUEST).json({ message: response });
    if (typeof response === "string") return res.status(HttpStatus.NOT_FOUND).json({ message: response });
    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  findAll() {
    return this._registrosService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._registrosService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    const result = await this._registrosService.update(+id, updateRegistroDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('devolucao/:id')
  async devolucao(@Res() res: Response, @Param('id') id: string) {
    const result = await this._registrosService.devolucao(+id);
    if (result && typeof result === "string") return res.status(HttpStatus.NOT_FOUND).json({ message: result });
    return res.status(HttpStatus.OK).json(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._registrosService.remove(+id);
  }
}