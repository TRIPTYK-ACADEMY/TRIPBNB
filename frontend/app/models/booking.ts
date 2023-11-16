import Model, { attr, belongsTo } from '@ember-data/model';

import type AccomodationModel from './accomodation';

export default class BookingModel extends Model {
  @attr('date') declare start: Date;
  @attr('date') declare end: Date;
  @attr() declare guests: {
    firstName: string;
    lastName: string;
  }[]
  @attr() declare user: {
    firstName: string;
    lastName: string;
    email: string;
    address: {
      street: string;
      number: string;
      zip: number;
      city: string;
      country: string;
    }
  }
  @belongsTo('accomodation', { async: false, inverse: 'bookings' }) declare accomodation: AccomodationModel;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    booking: BookingModel;
  }
}
