import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { SpotsService } from '../spots/spots.service';
import { Prisma, ReservationStatus, SpotStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => SpotsService))
    private spotService: SpotsService,
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  async findAll() {
    return await this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: { id },
    });
  }

  async findById(id: string) {
    const event = await this.prismaService.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    if (updateEventDto.date)
      updateEventDto.date = new Date(updateEventDto.date) as any;
    return this.prismaService.event.update({
      data: updateEventDto,
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prismaService.event.delete({
      where: { id },
    });
  }

  async reserverSpot(eventId: string, dto: ReserveSpotDto) {
    const spots = await this.spotService.findManyByNames(eventId, dto.spots);

    if (spots.length !== dto.spots.length) {
      const foundStopNames = spots.map((spot) => spot.name);
      const notFoundSpotName = dto.spots.filter(
        (spotName) => !foundStopNames.includes(spotName),
      );

      throw new BadRequestException(
        `Spots ${notFoundSpotName.join(', ')} not found`,
      );
    }

    try {
      return await this.prismaService.$transaction(
        async (prisma) => {
          await prisma.reservationHistory.createMany({
            data: spots.map((spot) => ({
              spotId: spot.id,
              ticketKind: dto.ticket_kind,
              email: dto.email,
              status: ReservationStatus.reserved,
            })),
          });

          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id),
              },
            },
            data: {
              status: SpotStatus.reserved,
            },
          });

          return await Promise.all(
            spots.map((spot) =>
              prisma.ticket.create({
                data: {
                  spotId: spot.id,
                  ticketKind: dto.ticket_kind,
                  email: dto.email,
                },
              }),
            ),
          );
        },
        { isolationLevel: 'ReadCommitted' },
      );
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002': // Unique Constraint Violation
          case 'P2034': // Transaction Conflict
            throw new BadRequestException('Some lugares are already reserved');
          default:
            throw e;
        }
      }
    }
  }
}
