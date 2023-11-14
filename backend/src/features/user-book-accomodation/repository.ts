import { MikroORM, type EntityRepository } from "@mikro-orm/postgresql";
import { inject, singleton } from "@triptyk/nfw-core";
import type { Accomodation } from "../../database/models/accomodation.model.js";
import type { Booking } from "../../database/models/booking.model.js";
import type { RequiredEntityData } from "@mikro-orm/core";
import { fromResult } from "true-myth/toolbelt";
import { Result } from "true-myth";
import type { Guest } from "../../database/models/embeddables/guest.model.js";
import { randomUUID } from "crypto";

@singleton()
export class UserBookAccomodationRepository {
  private bookingRepository: EntityRepository<Booking>;
  private accomodationRepository: EntityRepository<Accomodation>;

  public constructor(@inject(MikroORM) private readonly orm: MikroORM) {
    this.bookingRepository = this.orm.em.getRepository<Booking>("Booking");
    this.accomodationRepository = this.orm.em.getRepository<Accomodation>(
      "Accomodation"
    );
  }

  public async isPlaceAlreadyBookedForDateRange(
    accomodationId: string,
    date1: Date,
    date2: Date
  ) {
    return this.bookingRepository.count({
      id: accomodationId,
      $or: [
        {
          start: {
            $gte: date1,
            $lte: date2,
          },
        },
        {
          end: {
            $gte: date1,
            $lte: date2,
          },
        },
      ],
    }).then((count) => count > 0);
  }

  public async isAccomodationCapacityReached(
    accomodationId: string,
    guests: Guest[]
  ) : Promise<boolean> {
    const place = await this.accomodationRepository.findOne({
      id:  accomodationId
    }, {
      fields: ["maxGuests"]
    });

    if (!place) {
      return false;
    }

    return guests.length > place.maxGuests;
  }

  public async save(
    bookingData: RequiredEntityData<Booking>
  ): Promise<Result<Booking, Error>> {
    const em = this.orm.em.fork();
    try {
      bookingData.id = randomUUID();
      const booking = em.create<Booking>("Booking", bookingData);
      console.log(booking);
      
      await em.persistAndFlush(booking);
      return Result.ok<Booking, Error>(booking);
    } catch (error) {
      if (error instanceof Error) {
        return Result.err<Booking, Error>(error);
      }
      throw error;
    }
  }
}
