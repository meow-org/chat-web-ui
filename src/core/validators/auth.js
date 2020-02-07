import { object, string } from 'yup';

const email = string()
  .required()
  .email();
const password = string()
  .required()
  .min(4)
  .max(128);

export const LoginSchema = object().shape({
  email,
  password,
});
