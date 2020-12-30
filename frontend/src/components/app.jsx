import React from 'react';
import './app.scss';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import { CssBaseline } from '@material-ui/core';
import Navbar from './navbar/navbar';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import ShowProfile from './user/ShowProfile';
import EditProfile from './user/EditProfile';
// add card and cards
import Card from './project/ProjectCard';
import Cards from './project/ProjectCards';

const App = () => {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <div className="app">
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={MainPage} />

          <AuthRoute exact path="/signin" component={SigninFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <Route exact path="/profile/:id" component={ShowProfile} />
          <Route exact path="/edit" component={EditProfile} />
          {/* added route to card and cards */}
          <Route path="/card" component={Card} />
          <Route path="/cards" component={Cards} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
