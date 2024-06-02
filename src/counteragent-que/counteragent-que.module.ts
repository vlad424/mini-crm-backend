import { Module } from '@nestjs/common';
import { CounteragentQueService } from './counteragent-que.service';
import { CounteragentQueController } from './counteragent-que.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CounteragentQueController],
  providers: [CounteragentQueService, PrismaService],
})
export class CounteragentQueModule {
  
}
