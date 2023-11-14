import type { ResourceSchema } from '@triptyk/nfw-resources';
import type { Address } from '../../database/models/embeddables/address.model.js';

export const ACCOMODATION_RESOURCE_TYPE = 'accomodation';

export type AccomodationResource = {
    resourceType: typeof ACCOMODATION_RESOURCE_TYPE;
    id: string;
    name: string;
    tags: string[];
    address: Address;
    price: number;
    maxGuests: number;
    imgUrl: string;
    bookings: string[];
}

export const accomodationResourceSchema = {
  resourceType: ACCOMODATION_RESOURCE_TYPE,
  attributes: {
    name: {
        type: 'string',
        serialize: true,
        deserialize: true
    },
    tags: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
    address: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
    price: {
        type: 'number',
        serialize: true,
        deserialize: true
    },
    maxGuests: {
        type: 'number',
        serialize: true,
        deserialize: true
    },
    imgUrl: {
        type: 'string',
        serialize: true,
        deserialize: true
    },
    bookings: {
        type: 'object',
        serialize: true,
        deserialize: true
    },
  },
  relationships: {
    bookings: {
        type: 'booking',
        cardinality: 'has-many',
        serialize: true,
        deserialize: true
    },
  }
} satisfies ResourceSchema<AccomodationResource>
