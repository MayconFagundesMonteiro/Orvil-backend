import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { LeitoresService } from './leitores.service';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { UpdateLeitorDto } from './dto/update-leitor.dto';
import { Response } from "express"

@Controller('leitores')
export class LeitoresController {
  constructor(private readonly _leitoresService: LeitoresService) { }

  @Post()
  create(@Body() createLeitorDto: CreateLeitorDto) {
    return this._leitoresService.create(createLeitorDto);
  }

  @Get()
  findAll() {
    return this._leitoresService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this._leitoresService.findOne(+id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateLeitorDto: UpdateLeitorDto) {
    const result = await this._leitoresService.update(+id, updateLeitorDto);
    if (!result) return res.status(HttpStatus.NOT_FOUND).json();
    return res.status(HttpStatus.OK).json(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._leitoresService.remove(+id);
  }
}