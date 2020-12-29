import { signup } from '../../actions/session_actions';

import * as COLORS from '../../colors';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, TextField, Typography } from '@material-ui/core';
const logoUrl =
  'https://res.cloudinary.com/willwang/image/upload/v1608418616/devhublogo_plnro3.png';
const leaves =
  'https://res.cloudinary.com/willwang/image/upload/v1609187722/leaves_signup_okhbfo.png';
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
  signupButton: {
    marginTop: '2rem',
    width: 300,
    height: 40,
    border: 'none',
    backgroundColor: COLORS.DEVBLUE,
    color: 'white',
    fontWeight: 800,
    cursor: 'pointer',
    marginBottom: '2rem',
  },
}));
function SignupForm({ errors, signedIn, signup }) {
  useEffect(() => {
    if (signedIn) {
      history.push('/tweets');
    }
  }, [signedIn]);
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const signupUser = (e) => {
    e.preventDefault();
    const user = {
      handle: username,
      email,
      password,
      password2: passwordConfirmation,
    };
    console.log('user', user);
    console.log('email', email);
    console.log('password', password);
    signup(user);
  };
  const renderErrors = () => (
    <ul>
      {Object.keys(errors).map((err, i) => (
        <li key={`error-${i}`}>{errors[err]}</li>
      ))}
    </ul>
  );
  const navigateToSignin = () => {
    history.push('/login');
  };
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={signupUser}>
        <div className={classes.leftPanel}>
          <img className={classes.logo} src={logoUrl}></img>
          <Typography variant="h5" style={{ color: COLORS.DEVBLUE }}>
            Sign Up
          </Typography>
          <TextField
            className={classes.leftPanelItems}
            required
            id="outlined-required"
            label="USERNAME"
            value={username}
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <TextField
            className={classes.leftPanelItems}
            required
            id="outlined-required"
            label="CONFIRM PASSWORD"
            type="password"
            value={passwordConfirmation}
            variant="outlined"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            No account yet?{' '}
            <span
              onClick={navigateToSignin}
              style={{ color: COLORS.DEVBLUE, cursor: 'pointer' }}
            >
              Sign in
            </span>
          </Typography>
          <button type="submit" className={classes.signupButton}>
            Sign Up
          </button>
        </div>
        <div className={classes.rightPanel}>
          <img className={classes.leaves} src={leaves} alt="leaves vector" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.user,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
