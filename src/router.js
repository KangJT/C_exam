import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import SystemLayout from '@/layout/SystemLayout/index';

import Login from '@/routes/Login/index';

function RouterConfig({ history }) {
  return (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={SystemLayout}/>
    </Switch>
  </Router>)
}
export default RouterConfig;

