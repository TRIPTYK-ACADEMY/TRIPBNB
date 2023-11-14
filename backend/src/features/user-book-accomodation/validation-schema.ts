import { string, object, array, date, tuple } from 'yup';

const AddressSchema = object().shape({
  street: string().required(),
  city: string().required(),
  country: string().required(),
  zipCode: string().required(),
  number: string().required(),
});

const GuestSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
});

const UserBookPlaceCommandInputSchema = object().shape({
  accomodationId: string().required(),
  user: object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    address: AddressSchema,
  }),
  bookingRange: tuple([
    date().required(),
    date().required(),
  ]).required(),
  guests: array().of(GuestSchema).required(),
});

export default UserBookPlaceCommandInputSchema;