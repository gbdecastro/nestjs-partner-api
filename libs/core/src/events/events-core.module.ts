import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { SpotsCoreModule } from '../spots/spots-core.module';

@Module({
  imports: [forwardRef(() => SpotsCoreModule)],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsCoreModule {}
