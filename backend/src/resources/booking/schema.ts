import type { ResourceSchema } from '@triptyk/nfw-resources';
import type { User } from '../../database/models/embeddables/user.model.js';
import type { Guest } from '../../database/models/embeddables/guest.model.js';

export const BOOKING_RESOURCE_TYPE = 'booking';

export type BookingResource = {
    resourceType: typeof BOOKING_RESOURCE_TYPE;
    id: string;
    start: string;
    end: string;
    user: User;
    bookingRange: [string, string];
    guests: Guest[];
    accomodation: string;
}

export const bookingResourceSchema = {
  resourceType: BOOKING_RESOURCE_TYPE,
  attributes: {
    start: {
        type: 'string',
        serialize: true,
        deserialize: true
    },
    end: {
        type: 'string',
        serialize: true,
        deserialize: true
    },
    user: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
    bookingRange: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
    guests: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
  },
  relationships: {
    accomodation: {
        type: 'accomodation',
        cardinality: 'belongs-to',
        serialize: true,
        deserialize: true
    },
  }
} satisfies ResourceSchema<BookingResource>
