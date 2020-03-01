import { API } from '../conf';

const postFetch = (utl, body) =>
  fetch(utl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });

const fileUploader = (url, formData) =>
  fetch(url, {
    method: 'POST',
    body: formData
  });

const getFetch = utl => fetch(utl);

const Request = {
  login: body => postFetch(API.LOGIN, body),
  registration: body => postFetch(API.REGISTRATION, body),
  validateEmail: body => postFetch(API.VALIDATE_EMAIL, body),
  logout: () => getFetch(API.LOGOUT),
  changePass: body => postFetch(API.CHANGE_PASSWORD, body),
  validateNewPass: body => postFetch(API.VALIDATE_NEW_PASS, body),
  uploadFileMessage: formData => fileUploader(API.UPLOAD_FILE_MESSAGE, formData)
};

export default Request;
