import { forwardRef, Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { EventsCoreModule, SpotsCoreModule } from '@app/core';

@Module({
  controllers: [SpotsController],
  imports: [
    forwardRef(() => EventsCoreModule),
    forwardRef(() => SpotsCoreModule),
  ],
})
export class SpotsModule {}
