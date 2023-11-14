import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type Store from '@ember-data/store';

export default class Index extends Route {
  @service declare store: Store;
  model() {
    return this.store.query('accomodation', {});
  }
}
