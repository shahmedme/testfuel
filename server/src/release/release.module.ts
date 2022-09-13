import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuiteM } from 'suite/schemas/suite.schema';
import { SuiteService } from 'suite/suite.service';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './release.service';
import { ReleaseM } from './schemas/release.schema';

@Module({
  controllers: [ReleaseController],
  providers: [ReleaseService, SuiteService],
  imports: [
    MongooseModule.forFeature([ReleaseM]),
    MongooseModule.forFeature([SuiteM]),
  ],
})
export class ReleaseModule {}
