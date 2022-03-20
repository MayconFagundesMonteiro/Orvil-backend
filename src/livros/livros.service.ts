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
    return this._prisma.livros.findMany();
  }

  findOne(id: number) {
    return this._prisma.livros.findUnique({
      where: { id }
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

  remove(id: number) {
    return this._prisma.livros.delete({
      where: { id }
    });
  }
}