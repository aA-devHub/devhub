import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { demoLogin, logout } from '../../actions/session_actions';
import Cards from '../project/ProjectCards';

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
        <Cards />

        <footer>Copyright &copy; 2020 Devhub</footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
