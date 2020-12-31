import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { demoLogin, logout } from '../../actions/session_actions';
import FilterCards from '../project/FilterCards';
import TinderCard from '../project/TinderCard';
import Cards from '../project/ProjectCards';
import Footer from './Footer';

const mapStateToProps = (state, ownProps) => ({
  signedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  demoLogin: () => dispatch(demoLogin()),
  logout: () => dispatch(logout()),
});

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { signedIn, demoLogin, logout } = this.props;

    return (
      <div>
        <TinderCard />
        <FilterCards />
        <Cards />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
