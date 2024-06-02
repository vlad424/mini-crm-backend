import { Module } from '@nestjs/common';
import { CounteragentService } from './counteragent.service';
import { CounteragentController } from './counteragent.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CounteragentController],
  providers: [CounteragentService, PrismaService],
})
export class CounteragentModule {}
