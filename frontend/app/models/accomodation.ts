import Model, { attr } from '@ember-data/model';

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
  @attr() declare disabledDates: { from: string; to: string }[]
  @attr() declare tags: string[];
  @attr('number') declare price: number;
  @attr('number') declare maxGuests: number;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    accomodation: AccomodationModel;
  }
}
