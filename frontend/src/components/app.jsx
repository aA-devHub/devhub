import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import { CssBaseline } from '@material-ui/core';
import Navbar from './navbar/navbar';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import EditProfile from './user/EditProfile';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainPage} />

        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/edit" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default App;
