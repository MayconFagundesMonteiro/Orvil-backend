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
    data.excluido = false;
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

  findAllUnavailable() {
    return this._prisma.livros.findMany({
      where: {
        excluido: false,
        alugado: true
      }
    });
  }

  findOne(id: number) {
    return this._prisma.livros.findFirst({
      where: { id, excluido: false, alugado: false }
    });
  }

  findByTitle(titulo: string) {
    console.log("title", titulo)
    return this._prisma.livros.findMany({
      where: {
        titulo: { startsWith: titulo },
        excluido: false,
        alugado: false
      }

    });
  }

  async update(id: number, data: UpdateLivroDto) {
    delete data.id;
    const query = await this._prisma.livros.findUnique({ where: { id } });
    data.alugado = query.alugado;
    data.excluido = query.excluido;

    if (!query) return null;
    return this._prisma.livros.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const query = await this._prisma.livros.findUnique({ where: { id } });
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