import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './release.service';
import { ReleaseM } from './schemas/release.schema';

@Module({
  controllers: [ReleaseController],
  providers: [ReleaseService],
  imports: [MongooseModule.forFeature([ReleaseM])],
})
export class ReleaseModule {}
