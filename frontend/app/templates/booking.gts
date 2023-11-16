import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';

import { to } from '@triptyk/ember-utils/utils/to';
import { differenceInDays } from 'date-fns';
import { BookingChangeset } from 'ember-boilerplate/changesets/booking';
import BookingResume from 'ember-boilerplate/components/booking-resume';
import FormsBooking from 'ember-boilerplate/components/forms/booking';
import validationsBooking from 'ember-boilerplate/validations/booking';
import pageTitle from 'ember-page-title/helpers/page-title';
import RouteTemplate from 'ember-route-template';

import type RouterService from '@ember/routing/router-service';
import type AccomodationModel from 'ember-boilerplate/models/accomodation';
import type BookingService from 'ember-boilerplate/services/changesets/booking';
import type ErrorHandlerService from 'ember-boilerplate/services/error-handler';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export interface BookingRouteComponentSignature {
  Args: {
    model: AccomodationModel;
  };
}

class BookingRouteComponent extends Component<BookingRouteComponentSignature> {
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;
  @service declare errorHandler: ErrorHandlerService;
  @service('changesets/booking') declare bookingService: BookingService;

  @tracked changeset: BookingChangeset;
  validationSchema = validationsBooking;
  public constructor(owner: unknown, args: BookingRouteComponentSignature['Args']) {
    super(owner, args);
    this.changeset = new BookingChangeset({
      start: null,
      address: {
        street: 'aa',
        number: 'aa',
        zip: 'aa',
        city: 'aa',
        country: 'aa',
      },
      end: null,
      number: undefined,
      email: 's.cardon@outlook.com',
      firstName: 'aa',
      lastName: 'aa',
      guests: [],
    });
  }

  get numberOfDays(): number {
    const start = this.changeset.get('start');
    const end = this.changeset.get('end');

    if (start && end) {
      const difference = differenceInDays(end, start);

      if (difference === 0) {
        return 1;
      }

      return difference;
    }

    return 0;
  }

  @action
  @waitFor
  async bookSave(changeset: BookingChangeset) {
    try {
      const { ok, result } = await to(
        () => this.bookingService.save(changeset, this.args.model),
        Error
      );

      if (ok) {
        this.flashMessages.success('La réservation a bien été créée');

        return await this.router.transitionTo('index');
      }

      this.errorHandler.handle(result, 'Il y a une erreur lors de la réservation');
    } catch {
      this.flashMessages.danger('Il y a une erreur lors de la réservation');
    }
  }

  <template>
    {{pageTitle "TRIPNB - Réservation"}}
    <div class="self-stretch mb-6 max-md:max-w-full my-10 px-8 xl:px-0">
      <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <FormsBooking
          @changeset={{this.changeset}}
          @saveFunction={{this.bookSave}}
          @validationSchema={{this.validationSchema}}
          @maxGuests={{@model.maxGuests}}
          @disabledDates={{@model.disabledDates}}
          class="w-7/12"
        />
        <div class="flex flex-col items-stretch w-5/12 ml-5 max-md:w-full max-md:ml-0">
          <h3 class="mb-1 text-primary text-sm">Récapitulatif</h3>
          <BookingResume @accomodation={{@model}} @numberOfDays={{this.numberOfDays}} />
        </div>
      </div>
    </div>
  </template>
}

export default RouteTemplate(BookingRouteComponent);
