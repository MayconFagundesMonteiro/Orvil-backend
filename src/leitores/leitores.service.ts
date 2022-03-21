import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { UpdateLeitorDto } from './dto/update-leitor.dto';

@Injectable()
export class LeitoresService {
  constructor(private readonly _prisma: PrismaService) { }

  create(data: CreateLeitorDto) {
    delete data?.id;
    return this._prisma.leitores.create({ data });
  }

  findAll() {
    return this._prisma.leitores.findMany({
      where: {
        excluido: false,
      }
    });
  }

  findOne(id: number) {
    return this._prisma.leitores.findUnique({
      where: { id },
    });
  }

  findByName(nome: string) {
    return this._prisma.leitores.findMany({
      where: {
        nome,
        excluido: false
      }
    });
  }

  async update(id: number, data: UpdateLeitorDto) {
    delete data?.id;
    const query = await this._prisma.leitores.findUnique({ where: { id } });
    if (!query) return null;
    return this._prisma.leitores.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const query = this._prisma.leitores.findUnique({ where: { id } });
    if (!query) return null;
    return this._prisma.leitores.update({
      where: { id },
      data: {
        ...query,
        excluido: true
      }
    });
  }
}
