import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { waitFor } from '@ember/test-waiters';

import { BookingChangeset } from 'ember-boilerplate/changesets/booking';
import BookingResume from 'ember-boilerplate/components/booking-resume';
import FormsBooking from 'ember-boilerplate/components/forms/booking';
import validationsBooking from 'ember-boilerplate/validations/booking';
import pageTitle from 'ember-page-title/helpers/page-title';
import RouteTemplate from 'ember-route-template';

import type AccomodationModel from 'ember-boilerplate/models/accomodation';

export interface BookingRouteComponentSignature {
  Args: {
    model: AccomodationModel;
  };
}

class BookingRouteComponent extends Component<BookingRouteComponentSignature> {
  @tracked changeset: BookingChangeset;
  validationSchema = validationsBooking;
  public constructor(owner: unknown, args: BookingRouteComponentSignature['Args']) {
    super(owner, args);
    this.changeset = new BookingChangeset({
      startAt: null,
      endAt: null,
      number: undefined,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      guests: [],
    });
  }
  @action
  @waitFor
  async book(changeset: BookingChangeset) {}

  <template>
    {{pageTitle "TRIPNB - Réservation"}}
    <div class="self-stretch mt-20 mb-6 max-md:max-w-full max-md:mt-10">
      <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <FormsBooking
          @changeset={{this.changeset}}
          @saveFunction={{this.book}}
          @validationSchema={{this.validationSchema}}
          @maxGuests={{@model.maxGuests}}
          @disabledDates={{@model.disabledDates}}
          class="w-7/12"
        />
        <div class="flex flex-col items-stretch w-5/12 ml-5 max-md:w-full max-md:ml-0">
          <h3 class="mb-1 text-primary text-sm">Récapitulatif</h3>
          <BookingResume @accomodation={{@model}} @changeset={{this.changeset}} />
        </div>
      </div>
    </div>
  </template>
}

export default RouteTemplate(BookingRouteComponent);
