import Component from '@glimmer/component';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type { PropertySignature } from 'ember-boilerplate/templates/index';

export interface PropertyCardSignature {
  Args: {
    property: PropertySignature;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
}

export default class PropertyCard extends Component<PropertyCardSignature> {
  @service declare router: RouterService;

  <template>
    <article class="rounded-md overflow-hidden bg-white flex w-full">
      <img
        loading="lazy"
        src={{@property.imgUrl}}
        class="object-cover object-right w-5/12 h-full overflow-hidden"
      />
      <div class="flex flex-col w-7/12 p-6">
        <h3 class="text-3xl font-medium">{{@property.name}}</h3>
        <div class="flex items-start mt-1 font-thin text-sm text-primary">
          <img loading="lazy" src="/assets/icons/map-pin.svg" class="w-4 mr-0.5" />
          <span>
            {{@property.adress.street}},
            {{@property.adress.number}}
            -
            {{@property.adress.zip}}
            {{@property.adress.city}}
            <span class="uppercase">{{@property.adress.country}}</span>
          </span>
        </div>
        <div class="tags mt-1.5 flex flex-wrap">
          {{#each @property.tags as |tag|}}
            <span
              class="uppercase text-sm font-bold mr-6 text-primary even:text-secondary"
            >{{tag}}</span>
          {{/each}}
        </div>
        <div class="flex items-center self-end flex-grow text-3xl my-16 font-light">
          {{@property.price}}
          par nuit
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <img loading="lazy" src="/assets/icons/users.svg" class="w-4" />
            <span class="font-bold text-primary ml-1.5">{{@property.maxGuests}}</span>
          </div>
          <button
            type="button"
            class="px-3 py-1 bg-primary text-white font-thin flex items-center space-x-4 rounded group"
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
