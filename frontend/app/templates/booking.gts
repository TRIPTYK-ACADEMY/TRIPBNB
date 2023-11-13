import Component from '@glimmer/component';

import BookingResume from 'ember-boilerplate/components/booking-resume';
import FormsBooking from 'ember-boilerplate/components/forms/booking';
import RouteTemplate from 'ember-route-template';

export interface BookingRouteComponentSignature {
  Args: {};
}

class BookingRouteComponent extends Component<BookingRouteComponentSignature> {
  <template>
    <div class="self-stretch mt-20 mb-6 max-md:max-w-full max-md:mt-10">
      <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <FormsBooking />
        <div class="flex flex-col items-stretch w-[32%] ml-5 max-md:w-full max-md:ml-0">
          <BookingResume />
        </div>
      </div>
    </div>a
  </template>
}

export default RouteTemplate(BookingRouteComponent);
