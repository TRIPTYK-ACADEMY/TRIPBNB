import { Collection, EntitySchema, ReferenceType } from "@mikro-orm/core";
import type { Address } from "./embeddables/address.model.js";
import type { Booking } from "./booking.model.js";

export interface Accomodation {
    id: string;
    name: string;
    tags: string[];
    address: Address;
    price: number;
    maxGuests: number;
    imgUrl: string;
    bookings: Collection<Booking>;
}
  
export const accomodationSchema = new EntitySchema<Accomodation>({
    name: 'Accomodation',
    properties: {
        id: { type: 'string', primary: true },
        name: { type: 'string' },
        tags: { type: 'string[]' },
        address: { type: 'object' },
        price: { type: 'number' },
        maxGuests: { type: 'number' },
        imgUrl: { type: 'string' },
        bookings: { entity: 'Booking', reference: ReferenceType.ONE_TO_MANY, mappedBy: 'accomodation' },
    },
});