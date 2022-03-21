import { Module } from '@nestjs/common';
import { LivrosModule } from './livros/livros.module';
import { LeitoresModule } from './leitores/leitores.module';
import { RegistrosModule } from './registros/registros.module';

@Module({
  imports: [LivrosModule, LeitoresModule, RegistrosModule],
})
export class AppModule { }
