import { forwardRef, Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { EventsCoreModule } from '../events/events-core.module';

@Module({
  imports: [forwardRef(() => EventsCoreModule)],
  providers: [SpotsService],
  exports: [SpotsService],
})
export class SpotsCoreModule {}
