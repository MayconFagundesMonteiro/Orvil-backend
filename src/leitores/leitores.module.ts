import { Module } from '@nestjs/common';
import { LeitoresService } from './leitores.service';
import { LeitoresController } from './leitores.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LeitoresController],
  providers: [LeitoresService, PrismaService]
})
export class LeitoresModule { }
