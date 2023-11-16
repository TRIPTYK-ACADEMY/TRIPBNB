import Service from '@ember/service';
import { service } from '@ember/service';

import type StoreService from '@ember-data/store';
import type { BookingChangeset } from 'ember-boilerplate/changesets/booking';
import type AccomodationModel from 'ember-boilerplate/models/accomodation';
import type BookingModel from 'ember-boilerplate/models/booking';

export default class BookingChangesetService extends Service {
  @service declare store: StoreService;

  async save(changeset: BookingChangeset, accomodation: AccomodationModel): Promise<BookingModel> {
    changeset.execute();

    const changesetData = changeset.data;

    const booking = this.store.createRecord('booking', {
      accomodation,
      user: {
        firstName: changesetData.firstName,
        lastName: changesetData.lastName,
        email: changesetData.email,
        address: {
          street: changesetData.address.street,
          number: changesetData.address.number,
          zip: changesetData.address.zip,
          city: changesetData.address.city,
          country: changesetData.address.country,
        },
        guests: changesetData.guests
      }
    });

    await changeset.save();
    await booking.save();

    return booking;
  }
}

declare module '@ember/service' {
  interface Registry {
    'changesets/booking': BookingChangesetService;
  }
}
