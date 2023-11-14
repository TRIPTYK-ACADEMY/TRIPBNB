import { EntitySchema } from "@mikro-orm/core";

export interface Guest {
    firstName: string;
    lastName: string;
    email: string;
}
  
export const guestSchema = new EntitySchema<Guest>({
    name: 'Guest',
    embeddable: true,
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    },
});