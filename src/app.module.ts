import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LivrosModule } from './livros/livros.module';
import { LeitoresModule } from './leitores/leitores.module';
import { RegistrosModule } from './registros/registros.module';

@Module({
  imports: [LivrosModule, LeitoresModule, RegistrosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
