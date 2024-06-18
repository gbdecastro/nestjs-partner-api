import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsCoreModule, SpotsCoreModule } from '@app/core';

@Module({
  controllers: [EventsController],
  imports: [
    forwardRef(() => EventsCoreModule),
    forwardRef(() => SpotsCoreModule),
  ],
})
export class EventsModule {}
