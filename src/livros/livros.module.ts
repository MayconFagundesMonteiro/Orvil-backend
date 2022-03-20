import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LivrosController],
  providers: [LivrosService, PrismaService]
})
export class LivrosModule {}
