import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { Case } from './schemas/case.schema';

@Module({
  controllers: [CaseController],
  providers: [CaseService],
  imports: [TypeOrmModule.forFeature([Case])],
})
export class CaseModule {}
