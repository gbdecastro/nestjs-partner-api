import { SpotStatus } from '@prisma/client';

export class CriarLugarRequest {
  eventoId: string;
  nome: string;
  status: SpotStatus;
}
