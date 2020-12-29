import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import { CssBaseline } from '@material-ui/core';
import Navbar from './navbar/navbar';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import ShowProfile from './user/ShowProfile';
import EditProfile from './user/EditProfile';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Route path="/" component={Navbar} />
      <Switch>
        <Route exact path="/" component={MainPage} />

        <AuthRoute exact path="/signin" component={SigninFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/profile/:id" component={ShowProfile} />
        <Route exact path="/edit" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default App;
