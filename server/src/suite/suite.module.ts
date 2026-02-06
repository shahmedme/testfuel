import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuiteService } from './suite.service';
import { SuiteController } from './suite.controller';
import { Suite } from './schemas/suite.schema';
import { Case } from 'case/schemas/case.schema';

@Module({
  controllers: [SuiteController],
  providers: [SuiteService],
  imports: [TypeOrmModule.forFeature([Suite, Case])],
})
export class SuiteModule {}
