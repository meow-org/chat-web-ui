import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import history from './core/history';
import store from './core/store';
import { URLS } from './conf';
import { SignIn, Chat } from './pages';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path={URLS.SIGN_IN} component={SignIn} />
        <Route exact path={URLS.MAIN} component={Chat} />
      </Switch>
    </Router>
  </Provider>
);
