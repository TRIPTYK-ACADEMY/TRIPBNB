import Component from '@glimmer/component';

import type { BookingChangeset } from 'ember-boilerplate/changesets/booking';
import type AccomodationModel from 'ember-boilerplate/models/accomodation';
export interface BookingResumeSignature {
  Args: {
    changeset: BookingChangeset;
    accomodation: AccomodationModel;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
export default class BookingResumeComponent extends Component<BookingResumeSignature> {
  get numberOfDays() {
    return this.args.changeset.numberOfDays ?? 0;
  }
  get totalPrice() {
    return this.args.accomodation.price * this.numberOfDays;
  }

  <template>
    <div class="bg-white px-6 py-8 rounded-md" ...attributes>
      <div class="flex items-center space-x-1.5">
        <img
          loading="lazy"
          src={{@accomodation.imgUrl}}
          class="object-cover object-right w-1/2 rounded-md h-full overflow-hidden"
        />
        <div class="text-xl font-thin">
          {{@accomodation.name}}
        </div>
      </div>
      {{#if this.totalPrice}}
        <h3 class="text-2xl font-semibold mt-8 mb-4">
          Détail du prix
        </h3>
        <div class="flex justify-between items-center">
          <div class="text-lg">
            {{@accomodation.price}}
            x
            {{this.numberOfDays}}
            nuits
          </div>
          <div class="text-2xl text-secondary">
            Total:
            {{this.totalPrice}}
            €
          </div>
        </div>
      {{else}}
        <h3 class="text-2xl text-right text-secondary mt-8">{{@accomodation.price}}€ / par nuit</h3>
      {{/if}}
    </div>
  </template>
}
