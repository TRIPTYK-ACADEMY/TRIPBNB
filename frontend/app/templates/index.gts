import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import BookingSummary from 'ember-boilerplate/components/booking-details';
import PropertyCard from 'ember-boilerplate/components/property-card';
import SearchBar from 'ember-boilerplate/components/search-bar';
import RouteTemplate from 'ember-route-template';

export interface PropertySignature {
  imgUrl: string;
  name: string;
  adress: {
    street: string;
    number: string;
    zip: string;
    city: string;
    country: string;
  };
  tags: string[];
  price: number;
  maxGuests: number;
}

class ApplicationRouteComponent extends Component {
  @tracked properties: PropertySignature[] = [
    {
      imgUrl: '/assets/images/accomadation1.jpg',
      name: 'Charmant appartement en plein coeur de la ville',
      adress: {
        street: 'Allée du Marais',
        number: '58',
        zip: '7390',
        city: 'Quaregnon',
        country: 'Belgique',
      },
      tags: ['Rustique', 'Moderne'],
      price: 287,
      maxGuests: 8,
    },
    {
      imgUrl: '/assets/images/accomadation2.jpg',
      name: 'Villa de luxe avec piscine privée et vue panoramique',
      adress: {
        street: 'Rue de Cuesmes',
        number: '12',
        zip: '7012',
        city: 'Jemappes',
        country: 'Belgique',
      },
      tags: ['Nature', 'Romantique', 'Détente'],
      price: 822,
      maxGuests: 2,
    },
    {
      imgUrl: '/assets/images/accomadation3.jpg',
      name: 'Studio artistique au coeur du quartier historique',
      adress: {
        street: 'Grand-Place',
        number: '102',
        zip: '7500',
        city: 'Tournai',
        country: 'Belgique',
      },
      tags: ['Culturel', 'Détente'],
      price: 15,
      maxGuests: 18,
    },
    {
      imgUrl: '/assets/images/accomadation4.jpeg',
      name: 'Loft spacieux et lumineux au design contemporain',
      adress: {
        street: 'Chaussée de Binche',
        number: '177A',
        zip: '7000',
        city: 'Mons',
        country: 'Belgique',
      },
      tags: ['Aventure', 'Escapade'],
      price: 1200,
      maxGuests: 12,
    },
  ];
  <template>
    <div class="my-10">
      <div class="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div class="flex flex-col items-stretch w-7/12 max-md:w-full">
          <div
            class="items-stretch content-start flex-wrap space-y-8 flex grow flex-col max-md:max-w-full max-md:mt-10"
          >
            <SearchBar />
            {{#each this.properties as |property|}}
              <PropertyCard @property={{property}} />
            {{/each}}
          </div>
        </div>
        <div class="flex flex-col items-stretch w-5/12 ml-5 max-md:w-full max-md:ml-0">
          <BookingSummary />
        </div>
      </div>
    </div>
  </template>
}

export default RouteTemplate(ApplicationRouteComponent);
