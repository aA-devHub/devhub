import * as COLORS from '../../colors';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  login,
  demoLogin,
  clearSessionErrors,
} from '../../actions/session_actions';
import { makeStyles, TextField, Typography } from '@material-ui/core';
// import { fetchUser } from '../../util/user_api_util';
const logoUrl =
  'https://res.cloudinary.com/willwang/image/upload/v1608418616/devhublogo_plnro3.png';
const leaves =
  'https://res.cloudinary.com/willwang/image/upload/v1609184956/leaves_phog8l.png';
const useStyles = makeStyles((theme) => ({
  root: {
    // height: '90vh',
    marginTop: '4%',
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
    width: 350,
    margin: '30px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  leftPanelItems: {
    width: 270,
    marginTop: '2rem',
  },
  rightPanel: {
    display: 'none',
    flex: 0.5,
    width: '70%',
    minWidth: 350,
    backgroundImage: `url(${leaves})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  leaves: {
    position: 'relative',
    backgroundColor: 'yello',
    height: '100%',
    width: '100%',
  },
  signinButton: {
    marginTop: '2rem',
    width: 270,
    height: 40,
    border: 'none',
    backgroundColor: COLORS.DEVBLUE,
    color: 'white',
    fontWeight: 800,
    cursor: 'pointer',
  },
}));

function SigninForm({ currentUser, login, demoLogin, errors, clearErrors }) {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);
  useEffect(() => {
    if (currentUser) history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, history]);
  const loginUser = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    login(user);
  };
  const renderErrors = () => {
    if (!errors || errors.length === 0) return null;
    console.log(`errors: ${Object.values(errors)}`);
    return (
      <ul className="session-errors">
        {Object.values(errors).map((err, i) => (
          <li key={`error-${i}`}>{err}</li>
        ))}
      </ul>
    );
  };
  const navigateToSignup = () => {
    history.push('/signup');
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={loginUser}>
        <div className={classes.leftPanel}>
          <img alt="devhub logo" className={classes.logo} src={logoUrl}></img>
          <Typography variant="h5" style={{ color: COLORS.DEVBLUE }}>
            Sign in
          </Typography>
          {renderErrors()}
          <TextField
            className={classes.leftPanelItems}
            required
            id="email"
            placeholder="email"
            label="EMAIL"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.leftPanelItems}
            required
            label="PASSWORD"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            No account yet?{' '}
            <span
              onClick={() => demoLogin()}
              style={{
                color: COLORS.DEVBLUE,
                cursor: 'pointer',
                margin: '0 10px',
              }}
            >
              Demo
            </span>
            |
            <span
              onClick={navigateToSignup}
              style={{
                color: COLORS.DEVBLUE,
                cursor: 'pointer',
                marginLeft: 10,
              }}
            >
              Sign Up
            </span>
          </Typography>
          <button type="submit" className={classes.signinButton}>
            Sign in
          </button>
        </div>
        <div className={classes.rightPanel}></div>
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
  clearErrors: () => dispatch(clearSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
