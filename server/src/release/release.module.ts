import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuiteService } from 'suite/suite.service';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './release.service';
import { Release } from './schemas/release.schema';
import { Suite } from 'suite/schemas/suite.schema';

@Module({
  controllers: [ReleaseController],
  providers: [ReleaseService, SuiteService],
  imports: [TypeOrmModule.forFeature([Release, Suite])],
})
export class ReleaseModule {}
