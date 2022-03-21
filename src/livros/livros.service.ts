import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
  constructor(private readonly _prisma: PrismaService) { }

  create(data: CreateLivroDto) {
    delete data?.id;
    data.alugado = false;
    return this._prisma.livros.create({ data });
  }

  findAll() {
    return this._prisma.livros.findMany({
      where: {
        excluido: false,
        alugado: false
      }
    });
  }

  findOne(id: number) {
    return this._prisma.livros.findUnique({
      where: { id }
    });
  }

  findByTitle(titulo: string) {
    return this._prisma.livros.findMany({
      where: {
        titulo,
        excluido: false,
        alugado: false
      }
    });
  }

  async update(id: number, data: UpdateLivroDto) {
    delete data.id;
    const query = await this._prisma.livros.findUnique({ where: { id } });
    data.alugado = query.alugado;
    if (!query) return null;
    return this._prisma.livros.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const query = this._prisma.livros.findUnique({ where: { id } });
    if (!query) return null;
    return this._prisma.livros.update({
      where: { id },
      data: {
        ...query,
        excluido: true
      }
    });
  }
}