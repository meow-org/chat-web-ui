import { API } from '../conf';

const postFetch = (utl, body) =>
  fetch(utl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });

const getFetch = utl => fetch(utl);

const Request = {
  login: body => postFetch(API.LOGIN, body),
  registration: body => postFetch(API.REGISTRATION, body),
  validateEmail: body => postFetch(API.VALIDATE_EMAIL, body),
  logout: () => getFetch(API.LOGOUT),
};

export default Request;
