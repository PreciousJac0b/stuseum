import { Module } from '@nestjs/common';
import { AisupportService } from './aisupport.service';
import { AisupportController } from './aisupport.controller';

@Module({
  providers: [AisupportService],
  controllers: [AisupportController]
})
export class AisupportModule {}
