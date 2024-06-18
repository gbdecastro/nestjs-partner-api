import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaCoreModule } from '@app/core/prisma/prisma-core.module';
import { EventosModule } from './eventos/eventos.module';
import { LugaresModule } from './lugares/lugares.module';
import { AuthCoreModule } from '@app/core/auth/auth-core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2', isGlobal: true }),
    AuthCoreModule,
    PrismaCoreModule,
    EventosModule,
    LugaresModule,
  ],
})
export class Partner2Module {}
