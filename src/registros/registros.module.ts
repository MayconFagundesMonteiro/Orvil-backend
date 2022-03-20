import { Module } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { RegistrosController } from './registros.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RegistrosController],
  providers: [RegistrosService, PrismaService]
})
export class RegistrosModule { }
