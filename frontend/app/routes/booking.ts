import Route from '@ember/routing/route';

export interface BookingRouteParams {
  propertyId: string;
}

export type BookingRouteModel = Resolved<ReturnType<BookingRoute['model']>>;

export default class BookingRoute extends Route {
  model() {

    return {
      id: "1",
      imgUrl: '/assets/images/accomadation1.jpg',
      name: 'Charmant appartement en plein coeur de la ville',
      adress: {
        street: 'Allée du Marais',
        number: '58',
        zip: '7390',
        city: 'Quaregnon',
        country: 'Belgique',
      },
      disabledDates: [
        {
          from: '2023-11-10',
          to: '2023-11-17',
        },
        {
          from: '2023-11-20',
          to: '2023-11-23',
        }
      ],
      tags: ['Rustique', 'Moderne'],
      price: 287,
      maxGuests: 8,
    };
  }
}
