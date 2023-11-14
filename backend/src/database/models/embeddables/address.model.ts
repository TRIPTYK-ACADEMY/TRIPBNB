import { EntitySchema } from "@mikro-orm/core";

export interface Address {
    street: string;
    city: string;
    number: string;
    country: string;
    zipCode: string;
}
  
export const addressSchema = new EntitySchema<Address>({
    name: 'Address',
    embeddable: true,
    properties: {
        street: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        number: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        zipCode: {
            type: 'string'
        },
    },
});