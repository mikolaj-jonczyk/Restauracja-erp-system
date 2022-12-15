
import { Module } from '@nestjs/common';
import { GenerateRandomId } from './generateRandomId';


@Module({
  providers: [GenerateRandomId],
  exports: [GenerateRandomId]
})
export class HelpersModule {}
