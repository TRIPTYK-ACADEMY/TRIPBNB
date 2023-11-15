import {
  EntitySchema,
  type EmbeddedOptions,
  type PropertyOptions,
  Reference,
  type ManyToOneOptions,
  ReferenceType,
} from "@mikro-orm/core";
import type { User } from "./embeddables/user.model.js";
import type { Address } from "cluster";
import type { Guest } from "./embeddables/guest.model.js";
import type { Accomodation } from "./accomodation.model.js";

export interface Booking {
  id: string;
  start: Date;
  end: Date;
  user: User;
  guests: Guest[];
  accomodation: Reference<Accomodation>;
}

export const bookingSchema = new EntitySchema<Booking>({
  name: "Booking",
  properties: {
    id: { type: "string", primary:true } satisfies PropertyOptions<Booking>,
    start: { type: "Date" },
    end: { type: "Date" },
    guests: { type: "json" },
    user: {
      entity: "User",
    } satisfies EmbeddedOptions,
    accomodation: {
      reference: ReferenceType.MANY_TO_ONE,
      entity: "Accomodation",
      inversedBy: "bookings",
    } 
  },
});
