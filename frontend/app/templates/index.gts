import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import AccomodationCard from 'ember-boilerplate/components/accomodation-card';
import SearchBar from 'ember-boilerplate/components/search-bar';
import RouteTemplate from 'ember-route-template';

export interface AccomodationSignature {
  imgUrl: string;
  name: string;
  adress: {
    street: string;
    number: string;
    zip: string;
    city: string;
    country: string;
  };
  disabledDates: { from: string; to: string }[];
  tags: string[];
  price: number;
  maxGuests: number;
}

class ApplicationRouteComponent extends Component {
  @tracked properties: AccomodationSignature[] = [
    {
      id: '1',
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
      disabledDates: [
        {
          from: '2023-11-10',
          to: '2023-11-17',
        },
        {
          from: '2023-11-20',
          to: '2023-11-23',
        },
      ],
      price: 287,
      maxGuests: 8,
    },
    {
      id: '2',
      imgUrl: '/assets/images/accomadation2.jpg',
      name: 'Villa de luxe avec piscine privée et vue panoramique',
      adress: {
        street: 'Rue de Cuesmes',
        number: '12',
        zip: '7012',
        city: 'Jemappes',
        country: 'Belgique',
      },
      disabledDates: [],
      tags: ['Nature', 'Romantique', 'Détente'],
      price: 822,
      maxGuests: 2,
    },
    {
      id: '3',
      imgUrl: '/assets/images/accomadation3.jpg',
      name: 'Studio artistique au coeur du quartier historique',
      adress: {
        street: 'Grand-Place',
        number: '102',
        zip: '7500',
        city: 'Tournai',
        country: 'Belgique',
      },
      disabledDates: [],
      tags: ['Culturel', 'Détente'],
      price: 15,
      maxGuests: 18,
    },
    {
      id: '4',
      imgUrl: '/assets/images/accomadation4.jpeg',
      name: 'Loft spacieux et lumineux au design contemporain',
      adress: {
        street: 'Chaussée de Binche',
        number: '177A',
        zip: '7000',
        city: 'Mons',
        country: 'Belgique',
      },
      disabledDates: [],
      tags: ['Aventure', 'Escapade'],
      price: 1200,
      maxGuests: 12,
    },
  ];

  @action
  onSearch(value: string) {
    console.log(value);
  }

  <template>
    <div class="my-10">
      <div class="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div class="flex flex-col items-stretch w-full">
          <div
            class="items-stretch content-start flex-wrap space-y-8 flex grow flex-col max-md:max-w-full max-md:mt-10"
          >
            <SearchBar
              @label=""
              @placeholder="Trouvez votre TRIPNB... comme un ninja cherchant son dojo"
              @onSearch={{this.onSearch}}
            />
            {{#each this.properties as |property|}}
              <AccomodationCard @accomodation={{property}} />
            {{/each}}
          </div>
        </div>
        {{! <div class="flex flex-col items-stretch w-5/12 ml-5 max-md:w-full max-md:ml-0">
          <BookingSummary />
        </div> }}
      </div>
    </div>
  </template>
}

export default RouteTemplate(ApplicationRouteComponent);
