import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { CriarEventoRequest } from './request/criar-evento.request';
import { AlterarEventoRequest } from './request/alterar-evento.request';
import { ReservarLugarRequest } from './request/reservar-lugar.request';
import { TicketKind } from '@prisma/client';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('eventos')
@UseGuards(AuthGuard)
export class EventosController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() criarEventoRequest: CriarEventoRequest) {
    return this.eventsService.create({
      name: criarEventoRequest.nome,
      date: criarEventoRequest.data,
      description: criarEventoRequest.descricao,
      price: criarEventoRequest.preco,
    });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() alterarEventoRequest: AlterarEventoRequest,
  ) {
    return this.eventsService.update(id, {
      name: alterarEventoRequest.nome,
      date: alterarEventoRequest.data,
      description: alterarEventoRequest.descricao,
      price: alterarEventoRequest.preco,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reservar')
  reserve(
    @Body() reservarLugarRequest: ReservarLugarRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsService.reserverSpot(eventId, {
      spots: reservarLugarRequest.lugares,
      ticket_kind:
        reservarLugarRequest.tipo_ingresso === 'inteira'
          ? TicketKind.full
          : TicketKind.half,
      email: reservarLugarRequest.email,
    });
  }
}
