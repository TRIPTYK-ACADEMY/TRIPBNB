import { MikroORM, Reference } from "@mikro-orm/core";
import { inject, singleton } from "@triptyk/nfw-core";
import { Result } from "true-myth";
import type { Booking } from "../../database/models/booking.model.js";
import type { Address } from "../../database/models/embeddables/address.model.js";
import { UserBookAccomodationRepository } from "./repository.js";
import type { Guest } from "../../database/models/embeddables/guest.model.js";

export interface UserBookPlaceCommandInput {
  accomodationId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
  };
  bookingRange: [Date, Date];
  guests: Guest[];
}

export type BookingResult = Booking;

@singleton()
export default class UserBookAccomodationCommand {
  public constructor(
    @inject(UserBookAccomodationRepository)
    private readonly repository: UserBookAccomodationRepository
  ) {}

  public async execute(
    params: UserBookPlaceCommandInput
  ): Promise<Result<BookingResult, Error>> {
    if (
      await this.repository.isPlaceAlreadyBookedForDateRange(
        params.accomodationId,
        params.bookingRange[0],
        params.bookingRange[1]
      )
    ) {
      return Result.err(new Error("Place already booked for this date"));
    }

    if (
      await this.repository.isAccomodationCapacityReached(
        params.accomodationId,
        params.guests
      )
    )  {
      return Result.err(new Error("Place capacity reached"));
    }

    const saveResult = await this.repository.save({
      accomodation: params.accomodationId,
      start: params.bookingRange[0],
      end: params.bookingRange[1],
      guests: params.guests,
      user: params.user,
    });

    if (saveResult.isErr) {
      return saveResult;
    }

    return saveResult;
  }
}

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("Returns error if place is already booked", async () => {
    const mockedRepository = {
      isPlaceAlreadyBookedForDateRange: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const command = new UserBookAccomodationCommand(mockedRepository as never);

    const result = await command.execute({
      accomodationId: "123",
      bookingRange: [new Date(), new Date()],
      guests: [],
      user: {
        firstName: "John",
        lastName: "Doe",
        email: "",
        address: {
          number: "",
          street: "",
          city: "",
          country: "",
          zipCode: "",
        },
      },
    });

    expect(result.isErr).toBe(true);
    const error = result.isErr ? result.error : undefined;
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toStrictEqual("Place already booked for this date");
  });

  it("Returns error if it exceeds the capacity of the accomodation", async () => {
    const mockedRepository = {
      isPlaceAlreadyBookedForDateRange: vi.fn().mockResolvedValue(false),
      isAccomodationCapacityReached: vi.fn().mockResolvedValue(true),
      save: vi.fn()
    };

    const command = new UserBookAccomodationCommand(mockedRepository as never);

    const result = await command.execute({
      accomodationId: "123",
      bookingRange: [new Date(), new Date()],
      guests: [],
      user: {
        firstName: "John",
        lastName: "Doe",
        email: "",
        address: {
          number: "",
          street: "",
          city: "",
          country: "",
          zipCode: "",
        },
      },
    });

    expect(result.isErr).toBe(true);
    const error = result.isErr ? result.error : undefined;
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toStrictEqual("Place capacity reached");
  });
}
