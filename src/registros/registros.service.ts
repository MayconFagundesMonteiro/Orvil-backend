import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Injectable()
export class RegistrosService {
  constructor(private readonly _prisma: PrismaService) { }

  async create(data: CreateRegistroDto) {
    delete data?.id;
    let queryLivro = await this._prisma.livros.findUnique({ where: { id: data.livroId } });
    let queryLeitor = await this._prisma.leitores.findUnique({ where: { id: data.leitorId } });
    if (!queryLivro) return `O livro de id '${data.livroId}' não foi encontrado`;
    if (!queryLeitor) return `O leitor de id '${data.leitorId}' não foi encontrado`;
    if (queryLivro.alugado) return `O livro já está alugado`;

    var response = await this._prisma.registros.create({
      data: {
        ...data,
        dataEmprestimo: new Date(data.dataEmprestimo),
        dataDevolucao: new Date(data.dataDevolucao)
      }
    });

    await this._prisma.livros.update({
      where: { id: queryLivro.id },
      data: {
        ...queryLivro,
        alugado: true
      }
    })

    return response;
  }

  findAll() {
    return this._prisma.registros.findMany();
  }

  findOne(id: number) {
    return this._prisma.registros.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateRegistroDto) {
    delete data?.id;
    const query = await this._prisma.registros.findUnique({ where: { id } });
    if (!query) return null;
    return this._prisma.registros.update({
      where: { id },
      data: {
        ...data,
        dataEmprestimo: data.dataEmprestimo ? new Date(data.dataEmprestimo) : query.dataEmprestimo,
        dataDevolucao: data.dataDevolucao ? new Date(data.dataDevolucao) : query.dataDevolucao
      }
    });
  }

  async devolucao(id: number) {
    let registro = await this._prisma.registros.findUnique({ where: { id } });
    let livro = await this._prisma.livros.findUnique({ where: { id: registro.livroId } });
    if (!registro) return `O registro de id '${id}' não foi encontrado`;
    if (!livro) return `O livro de id '${livro.id}' não foi encontrado`;
    var response = await this._prisma.registros.update({
      where: { id },
      data: {
        ...registro,
        ativo: false
      }
    });

    await this._prisma.livros.update({
      where: { id: livro.id },
      data: {
        ...livro,
        alugado: false
      }
    })

    return response;
  }

  remove(id: number) {
    return this._prisma.registros.delete({ where: { id } });
  }
}