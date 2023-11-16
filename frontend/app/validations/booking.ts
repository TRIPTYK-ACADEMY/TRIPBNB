import { array, date, number, object, string } from 'yup';

const validationsBooking = object().shape({
  start: date().required("La date d'arrivée est requis"),
  end: date().required('La date de départ est requis'),
  firstName: string().required('Le prénom est requis'),
  lastName: string().required('Le nom est requis'),
  email: string()
    .email("L'email n'est pas dans le bon format")
    .required("L'email est requis"),
  address: object().shape({
    street: string().required('La rue est requise'),
    number: string().required('Le numéro est requis'),
    zip: string().required('Le code postal est requis'),
    city: string().required('La ville est requise'),
    country: string().required('Le pays est requis'),
  }),
  number: number().required('Le nombre de voyageur est requis'),
  guests: array().when(['number'], (numberValue, schema) => {
    if (numberValue && (numberValue as unknown as number) > 0) {
      return schema
        .of(
          object().shape({
            firstName: string().required('Le prénom du voyageur est requis'),
            lastName: string().required('Le nom du voyageur est requis'),
          })
        )
        .required('Les détails des voyageurs sont requis');
    } else {
      return schema.notRequired();
    }
  }),
});

export default validationsBooking;
