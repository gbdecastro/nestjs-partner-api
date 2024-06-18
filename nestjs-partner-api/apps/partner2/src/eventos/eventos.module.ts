import { forwardRef, Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventsCoreModule, SpotsCoreModule } from '@app/core';

@Module({
  controllers: [EventosController],
  imports: [
    forwardRef(() => EventsCoreModule),
    forwardRef(() => SpotsCoreModule),
  ],
})
export class EventosModule {}
