import Route from '@ember/routing/route';

export interface BookingRouteParams {}

export type BookingRouteModel = Resolved<ReturnType<BookingRoute['model']>>;

export default class BookingRoute extends Route {
  model() {
    return {};
  }
}
