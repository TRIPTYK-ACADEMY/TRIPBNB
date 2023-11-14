import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type Store from '@ember-data/store';

export interface BookingRouteParams {
  accomodation_id: string;
}

export type BookingRouteModel = Resolved<ReturnType<BookingRoute['model']>>;

export default class BookingRoute extends Route {
  @service declare store: Store;

  async model(params: Record<string, unknown>) {
    return this.store.queryRecord('accomodation', { id: params['accomodation_id'] });
  }
}
