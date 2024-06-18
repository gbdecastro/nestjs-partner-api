import { SpotStatus } from '@prisma/client';

export class CreateSpotDto {
  eventId: string;
  name: string;
  status: SpotStatus;
}
