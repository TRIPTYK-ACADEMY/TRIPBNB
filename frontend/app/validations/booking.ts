import { object, string } from 'yup';

const validationsBooking = object().shape({
  firstName: string().required('validations.firstName.required'),
  lastName: string().required('validations.lastName.required'),
  phone: string().required('validations.phone.required'),
  email: string()
    .email('validations.email.format')
    .required('validations.email.required'),
});

export default validationsBooking;
