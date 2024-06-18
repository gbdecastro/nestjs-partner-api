import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CriarLugarRequest } from './request/criar-lugar.request';
import { SpotsService } from '@app/core/spots/spots.service';
import { AlterarLugarRequest } from './request/alterar-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class LugaresController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() criarLugarRequest: CriarLugarRequest,
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
  ) {
    return this.spotsService.create(eventoId, lugarId, {
      name: criarLugarRequest.nome,
      eventId: criarLugarRequest.eventoId,
      status: criarLugarRequest.status,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':lugarId')
  findOne(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
  ) {
    return this.spotsService.findOne(eventoId, lugarId);
  }

  @Patch(':lugarId')
  update(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
    @Body() alterarLugarRequest: AlterarLugarRequest,
  ) {
    return this.spotsService.update(eventoId, lugarId, {
      name: alterarLugarRequest.nome,
      eventId: alterarLugarRequest.eventoId,
      status: alterarLugarRequest.status,
    });
  }

  @Delete(':lugarId')
  remove(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
  ) {
    return this.spotsService.remove(eventoId, lugarId);
  }
}
