import { addressSchema } from './database/models/embeddables/address.model.js';
import { accomodationSchema } from './database/models/accomodation.model.js';
import { bookingSchema } from './database/models/booking.model.js';
import type { Options } from '@mikro-orm/postgresql';
import { userSchema } from './database/models/embeddables/user.model.js';
import { guestSchema } from './database/models/embeddables/guest.model.js';

const config: Options = {
    entities: [addressSchema, accomodationSchema, bookingSchema, userSchema, guestSchema],
    dbName: 'postgres',
    user: 'postgres',
    password: 'test123*'
};

export default config;