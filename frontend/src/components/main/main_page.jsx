import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { demoLogin, logout } from '../../actions/session_actions';

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
        <h1>DevHub</h1>
        <br />

        {!signedIn && (
          <button
            onClick={() => {
              demoLogin();
              return <Redirect to="/" />;
            }}
          >
            Demo Login
          </button>
        )}

        {signedIn && <button onClick={() => logout()}>Logout</button>}

        <footer>Copyright &copy; 2020 Devhub</footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
