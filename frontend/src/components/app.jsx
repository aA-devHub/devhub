import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './navbar/navbar';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Route path="/" component={Navbar} />
      <Switch>
        <Route exact path="/" component={MainPage} />

        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
