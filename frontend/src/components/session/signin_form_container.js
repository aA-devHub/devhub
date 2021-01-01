import * as COLORS from '../../colors';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, demoLogin } from '../../actions/session_actions';
import { makeStyles, TextField, Typography } from '@material-ui/core';
// import { fetchUser } from '../../util/user_api_util';
const logoUrl =
  'https://res.cloudinary.com/willwang/image/upload/v1608418616/devhublogo_plnro3.png';
const leaves =
  'https://res.cloudinary.com/willwang/image/upload/v1609184956/leaves_phog8l.png';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    boxShadow: '0px 18px 40px 0px rgba(0, 0, 0, 0.3)',
  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    marginBottom: '2rem',
  },
  leftPanel: {
    flex: 0.5,
    margin: '30px 0 0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  leftPanelItems: {
    minWidth: 300,
    marginTop: '2rem',
  },
  rightPanel: {
    flex: 0.5,
  },
  leaves: {
    position: 'relative',
    backgroundColor: 'yello',
    height: '100%',
    width: '100%',
  },
  signinButton: {
    marginTop: '2rem',
    width: 300,
    height: 40,
    border: 'none',
    backgroundColor: COLORS.DEVBLUE,
    color: 'white',
    fontWeight: 800,
    cursor: 'pointer',
  },
}));

function SigninForm({ currentUser, login, demoLogin, errors }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser]);
  const loginUser = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log('email', email);
    console.log('password', password);
    login(user);
  };
  const renderErrors = () => (
    <ul>
      {Object.keys(errors).map((err, i) => (
        <li key={`error-${i}`}>{errors[err]}</li>
      ))}
    </ul>
  );
  const navigateToSignup = () => {
    history.push('/signup');
  };
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={loginUser}>
        <div className={classes.leftPanel}>
          <img
            onClick={demoLogin}
            alt="devhub logo"
            className={classes.logo}
            src={logoUrl}
          ></img>
          <Typography variant="h5" style={{ color: COLORS.DEVBLUE }}>
            Sign in
          </Typography>
          <TextField
            className={classes.leftPanelItems}
            required
            id="outlined-required"
            label="EMAIL"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.leftPanelItems}
            required
            id="outlined-required"
            label="PASSWORD"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            No account yet?{' '}
            <span
              onClick={navigateToSignup}
              style={{ color: COLORS.DEVBLUE, cursor: 'pointer' }}
            >
              Sign Up
            </span>
          </Typography>
          <button type="submit" className={classes.signinButton}>
            Sign in
          </button>
          {renderErrors()}
        </div>
        <div className={classes.rightPanel}>
          <img className={classes.leaves} src={leaves} alt="leaves vector" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state, _ownProps) => ({
  currentUser: state.session.user,
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  demoLogin: () => dispatch(demoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
