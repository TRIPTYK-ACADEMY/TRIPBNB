import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import AccomodationCard from 'ember-boilerplate/components/accomodation-card';
import LoadingIndicator from 'ember-boilerplate/components/loading-indicator';
import SearchBar from 'ember-boilerplate/components/search-bar';
import { task } from 'ember-concurrency';
import pageTitle from 'ember-page-title/helpers/page-title';
import RouteTemplate from 'ember-route-template';

import type ArrayProxy from '@ember/array/proxy';
import type Store from '@ember-data/store';
import type AccomodationModel from 'ember-boilerplate/models/accomodation';

export interface ApplicationIndexRouteSignature {
  Args: {};
}

class ApplicationIndexRouteComponent extends Component<ApplicationIndexRouteSignature> {
  @service declare store: Store;
  @tracked accomodations?: ArrayProxy<AccomodationModel>;
  @tracked search?: string;

  constructor(owner: unknown, args: ApplicationIndexRouteSignature['Args']) {
    super(owner, args);
    this.loadAccomodations.perform();
  }
  loadAccomodations = task(this, { drop: true }, async () => {
    this.accomodations = (await this.store.query('accomodation', {
      q: this.search,
    })) as ArrayProxy<AccomodationModel>;
  });

  @action
  onSearch(value: string) {
    this.search = value;
    this.loadAccomodations.perform();
  }

  <template>
    {{pageTitle "TRIPNB - Logements"}}
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
            {{#if this.loadAccomodations.isIdle}}
              {{#each this.accomodations as |accomodation|}}
                <AccomodationCard @accomodation={{accomodation}} />
              {{/each}}
            {{else}}
              <LoadingIndicator />
            {{/if}}
          </div>
        </div>
      </div>
    </div>
  </template>
}

export default RouteTemplate(ApplicationIndexRouteComponent);
