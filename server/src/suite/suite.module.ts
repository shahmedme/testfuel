import { Module } from '@nestjs/common';
import { SuiteService } from './suite.service';
import { SuiteController } from './suite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuiteM } from './schemas/suite.schema';

@Module({
  controllers: [SuiteController],
  providers: [SuiteService],
  imports: [MongooseModule.forFeature([SuiteM])],
})
export class SuiteModule {}
