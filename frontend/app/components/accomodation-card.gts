import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type { AccomodationSignature } from 'ember-boilerplate/templates/index';

export interface AccomodationCardSignature {
  Args: {
    accomodation: AccomodationSignature;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class AccomodationCard extends Component<AccomodationCardSignature> {
  @service declare router: RouterService;

  @action
  async goToAccomadationBooking() {
    await this.router.transitionTo('booking', this.args.accomodation.id);
  }

  <template>
    <article class="rounded-md overflow-hidden bg-white flex w-full" ...attributes>
      <img
        loading="lazy"
        src={{@accomodation.imgUrl}}
        class="object-cover object-right w-5/12 h-full overflow-hidden"
      />
      <div class="flex flex-col w-7/12 p-6">
        <h3 class="text-3xl font-medium">{{@accomodation.name}}</h3>
        <div class="flex items-start mt-1 font-thin text-sm text-primary">
          <img loading="lazy" src="/assets/icons/map-pin.svg" class="w-4 mr-0.5" />
          <span>
            {{@accomodation.adress.street}},
            {{@accomodation.adress.number}}
            -
            {{@accomodation.adress.zip}}
            {{@accomodation.adress.city}}
            <span class="uppercase">{{@accomodation.adress.country}}</span>
          </span>
        </div>
        <div class="tags mt-1.5 flex flex-wrap">
          {{#each @accomodation.tags as |tag|}}
            <span
              class="uppercase text-sm font-bold mr-6 text-primary even:text-secondary"
            >{{tag}}</span>
          {{/each}}
        </div>
        <div class="flex items-center self-end flex-grow text-3xl my-16 font-light">
          {{@accomodation.price}}
          par nuit
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <img loading="lazy" src="/assets/icons/users.svg" class="w-4" />
            <span class="font-bold text-primary ml-1.5">{{@accomodation.maxGuests}}</span>
          </div>
          <button
            type="button"
            class="px-3 py-1 bg-primary text-white font-thin flex items-center space-x-4 rounded group"
            {{on "click" this.goToAccomadationBooking}}
          >
            <span>Sélectionner</span>
            <img
              loading="lazy"
              src="/assets/icons/arrow-right.svg"
              class="h-6 duration-200 group-hover:-translate-x-1"
            />
          </button>
        </div>
      </div>
    </article>
  </template>
}
