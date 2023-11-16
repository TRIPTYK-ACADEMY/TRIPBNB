import { ImmerChangeset } from 'ember-immer-changeset';

export interface BookingDTO {
  id?: string;
  start: Date | null;
  end: Date | null;
  firstName: string;
  number?: number;
  lastName: string;
  email: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
    country: string;
  };
  guests: {lastName: string, firstName: string}[],
}

export class BookingChangeset extends ImmerChangeset<BookingDTO> {}
