import React, { useEffect } from 'react';
import {useDataAPI} from "../core/hooks";
import Request from "../core/request";
import { Redirect } from "react-router-dom";
import { URLS } from '../conf';

const ValidateEmailPage = ({ match }) => {
  const [{ isError, data }, requert] = useDataAPI(Request.validateEmail);

  useEffect(() => {
    requert(match.params);
  }, []);

  if(isError){
    return <div>{data.message}</div>
  }

  if(data && data.success){
    return <Redirect to={URLS.SIGN_IN} />
  }

  return null;
};

export default ValidateEmailPage;
