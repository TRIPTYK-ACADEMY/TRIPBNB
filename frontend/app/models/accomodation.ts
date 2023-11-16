import Model, { attr, hasMany, type SyncHasMany } from '@ember-data/model';

import type BookingModel from './booking';

export default class AccomodationModel extends Model {
  @attr('string') declare name: string;
  @attr('string') declare imgUrl: string;
  @attr() declare address: {
    street: string;
    number: string;
    zip: string;
    city: string;
    country: string;
  }
  @attr() declare disabledDates: { from: Date; to: Date }[]
  @attr() declare tags: string[];
  @attr('number') declare price: number;
  @attr('number') declare maxGuests: number;
  @hasMany('booking', { async: false, inverse: 'accomodation' }) declare bookings: SyncHasMany<BookingModel>
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    accomodation: AccomodationModel;
  }
}
