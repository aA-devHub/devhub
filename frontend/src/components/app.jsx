import React from 'react';
import '../app.scss';
import '../kb.scss';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import { CssBaseline } from '@material-ui/core';
import Navbar from './navbar/navbar';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import UploadProject from './project/upload/upload_project';
import EditProject from './project/upload/edit_project';
import ShowProfile from './user/ShowProfile';
import EditProfile from './user/EditProfile';
// add card and cards
import Cards from './project/FilterCards';
import Card from './project/TinderCard';
import Footer from './main/Footer';
import Project from './project/ProjectShow';
import Messages from './message/messages';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="app">
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={MainPage} />

          <AuthRoute exact path="/signin" component={SigninFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />

          <ProtectedRoute exact path="/users/edit" component={EditProfile} />
          <Route exact path="/users/:id" component={ShowProfile} />

          <ProtectedRoute
            exact
            path="/projects/upload"
            component={UploadProject}
          />

          <ProtectedRoute
            exact
            path="/projects/:id/edit"
            component={EditProject}
          />

          <ProtectedRoute path="/messages" component={Messages} />

          {/* added route to card and cards */}
          <Route path="/card" component={Card} />
          <Route path="/cards" component={Cards} />
          <Route path="/comment" component={Comment} />
          <ProtectedRoute path="/projects/:id" component={Project} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
