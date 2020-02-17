import { useReducer } from 'react';
import history from '../history';
import {
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_DATA,
} from '../constants/requestStatus';
import { URLS } from '../../conf';

const initState = {
  data: null,
  isLoading: false,
  isError: false,
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_SUCCESS:
      return {
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case FETCH_ERROR:
      return {
        data: action.payload,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error('oops');
  }
};

export default fetcher => {
  const [state, dispatch] = useReducer(dataFetchReducer, initState);
  const request = async params => {
    try {
      dispatch({ type: FETCH_DATA });
      const response = await fetcher(params);
      const data = await response.json();
      if (response.status === 401) {
        history.push(URLS.SIGN_IN);
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }
      dispatch({ type: FETCH_SUCCESS, payload: data });

      return response;

    } catch (e) {
      dispatch({ type: FETCH_ERROR, payload: e.message });
    }
  };

  return [state, request];
};
