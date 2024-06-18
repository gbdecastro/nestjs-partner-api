import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaCoreModule } from '@app/core/prisma/prisma-core.module';
import { AuthCoreModule } from '@app/core/auth/auth-core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner1', isGlobal: true }),
    AuthCoreModule,
    PrismaCoreModule,
    EventsModule,
    SpotsModule,
  ],
})
export class Partner1Module {}
