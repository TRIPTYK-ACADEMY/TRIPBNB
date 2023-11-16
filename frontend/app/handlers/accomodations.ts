import { rest } from 'msw';

const TYPE_ACCOMODATION = "accomodations";
const data = [
  {
    id: '1',
    imgUrl: '/assets/images/accomadation1.jpg',
    name: 'Charmant appartement en plein coeur de la ville',
    address: {
      street: 'Allée du Marais',
      number: '58',
      zip: '7390',
      city: 'Quaregnon',
      country: 'Belgique',
    },
    tags: ['Rustique', 'Moderne'],
    disabledDates: [
      {
        from: new Date('2023-11-10'),
        to: new Date('2023-11-17'),
      },
      {
        from: new Date('2023-11-20'),
        to: new Date('2023-11-23'),
      },
    ],
    price: 287,
    maxGuests: 8,
  },
  {
    id: '2',
    imgUrl: '/assets/images/accomadation2.jpg',
    name: 'Villa de luxe avec piscine privée et vue panoramique',
    address: {
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
    address: {
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
    address: {
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
]

export const accomodationHandlers = [
  rest.get(`http://localhost:8080/api/v1/${TYPE_ACCOMODATION}`, (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json({
        data: data.map((accomodation) => ({
          type: TYPE_ACCOMODATION,
          id: accomodation.id,
          attributes: {
            ...accomodation
          },
        })),
      }),
    );
  }),
  rest.get(`http://localhost:8080/api/v1/${TYPE_ACCOMODATION}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const accomodation = data.find((accomodation) => accomodation.id === id);

    if (!accomodation) {
      return res(
        ctx.status(404),
        ctx.json({}),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          type: TYPE_ACCOMODATION,
          id,
          attributes: {
            ...accomodation
          },
        },
      }),
    );
  }),
];
