import { object, string, ref } from 'yup';

const email = string()
  .required()
  .email();
const password = string()
  .required()
  .min(4)
  .max(128);

const username = string()
  .required()

export const LoginSchema = object().shape({
  email,
  password,
});

export const RegistrationSchema = object().shape({
  email,
  username,
  password,
});

export const ChangePassSchema = object().shape({
  email,
});

export const ValidatePassSchema = object().shape({
  password,
  passwordConfirmation: string()
    .oneOf([ref('password'), null], 'Passwords must match')
});
