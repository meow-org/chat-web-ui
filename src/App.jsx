import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import history from './core/history';
import store from './core/store';
import { URLS } from './conf';
import { SignIn, Chat, SignUp, ChangePass, ValidateEmail, NewPassPage } from './pages';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path={URLS.SIGN_IN} component={SignIn} />
        <Route exact path={URLS.MAIN} component={Chat} />
        <Route exact path={URLS.SIGN_UP} component={SignUp} />
        <Route exact path={URLS.CHANGE_PASSWORD} component={ChangePass} />
        <Route exact path={URLS.VALIDATE_EMAIL} component={ValidateEmail} />
        <Route exact path={URLS.VALIDATE_PASSWORD} component={NewPassPage} />
      </Switch>
    </Router>
  </Provider>
);
