import { forwardRef, Module } from '@nestjs/common';
import { LugaresController } from './lugares.controller';
import { EventsCoreModule, SpotsCoreModule } from '@app/core';

@Module({
  controllers: [LugaresController],
  imports: [
    forwardRef(() => EventsCoreModule),
    forwardRef(() => SpotsCoreModule),
  ],
})
export class LugaresModule {}
