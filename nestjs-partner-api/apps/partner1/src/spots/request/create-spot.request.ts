import { SpotStatus } from '@prisma/client';

export class CreateSpotRequest {
  eventId: string;
  name: string;
  status: SpotStatus;
}
