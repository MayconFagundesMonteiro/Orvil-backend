import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LivrosModule } from './livros/livros.module';
import { LeitoresModule } from './leitores/leitores.module';

@Module({
  imports: [LivrosModule, LeitoresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
