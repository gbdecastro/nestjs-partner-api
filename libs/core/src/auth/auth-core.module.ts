import { Module } from '@nestjs/common';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthCoreModule {}
