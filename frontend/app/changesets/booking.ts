/* eslint-disable ember/no-get */
import { differenceInDays } from 'date-fns'
import { ImmerChangeset } from 'ember-immer-changeset';

export interface BookingDTO {
  id?: string;
  startAt: Date | null;
  endAt: Date | null;
  firstName: string;
  number?: number;
  lastName: string;
  phone: string;
  email: string;
  guests: {lastName: string, firstName: string}[]
}

export class BookingChangeset extends ImmerChangeset<BookingDTO> {
  get numberOfDays(): number {
    const startAt = this.get('startAt');
    const endAt = this.get('endAt');

    if (startAt && endAt) {
      const difference = differenceInDays(endAt, startAt);

      if (difference === 0) {
        return 1
      }

      return difference;
    }

    return 0;
  }
}
