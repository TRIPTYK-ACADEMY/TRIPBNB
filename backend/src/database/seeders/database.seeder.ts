import type { EntityManager, IDatabaseDriver, Connection, Dictionary } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import type { Accomodation } from "../models/accomodation.model.js";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager<IDatabaseDriver<Connection>>, context?: Dictionary | undefined) {
        const accomodation  = em.getRepository<Accomodation>('Accomodation').create({
            id: '1',
            name: 'test',
            tags: ['test'],
            address: {
                street: 'test',
                city: 'test',
                country: 'test',
                zipCode: 'test'
            },
            price: 1,
            maxGuests: 1,
            imgUrl: 'test',
            bookings: []
        });
        
        await em.persistAndFlush(accomodation);
    }
}