import { EntitySchema, type EmbeddableOptions } from "@mikro-orm/core";
import type { Address } from "./address.model.js";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
}
  
export const userSchema = new EntitySchema<User>({
    name: 'User',
    embeddable: true,
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        address: {
            entity: 'Address',
            object: true
        }
    },
});