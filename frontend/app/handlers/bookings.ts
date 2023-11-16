import { rest } from 'msw';

const TYPE_BOOKING = "bookings";

export const bookingHandlers = [
  rest.post(`http://localhost:8080/api/v1/${TYPE_BOOKING}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          type: TYPE_BOOKING,
          id: '1',
          attributes: {},
        }
      })
    );
  })
];
