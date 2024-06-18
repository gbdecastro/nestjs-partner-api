import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class SpotsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => EventsService))
    private eventService: EventsService,
  ) {}

  async create(eventId: string, spotId: string, createSpotDto: CreateSpotDto) {
    await this.eventService.findById(eventId);
    createSpotDto.eventId = eventId;

    return await this.prismaService.spot.create({
      data: createSpotDto,
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: { id: spotId, eventId },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: { id: spotId, eventId },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    this.prismaService.spot.delete({
      where: { id: spotId, eventId },
    });
  }

  findManyByNames(eventId: string, spotNames: string[]) {
    return this.prismaService.spot.findMany({
      where: {
        eventId: eventId,
        name: {
          in: spotNames,
        },
      },
    });
  }
}
