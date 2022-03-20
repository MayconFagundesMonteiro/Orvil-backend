import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';

@Injectable()
export class LivrosService {
  constructor(private readonly _prisma: PrismaService) { }

  create(data: CreateLivroDto) {
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

  update(id: number, data: UpdateLivroDto) {
    delete data.id;
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