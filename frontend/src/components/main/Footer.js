import React from 'react';
import { useLocation } from 'react-router-dom';
import * as COLORS from '../../colors';
import {
  Grid,
  makeStyles,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#F8F8F8',
    },
    footer: {
      maginTop: '2rem',
      borderTop: `1px solid #eaeaea`,
      padding: '2rem',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        padding: '2rem 5rem',
      },
    },
    footerText: {
      color: 'gray',
      fontSize: 14,
    },
    footerContainer: {
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerContent: {
      display: 'flex',
      margin: '0 0 2rem 0',
    },
    footerLeft: {
      flex: 0.0,
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.up('sm')]: {
        flex: 0.3,
        display: 'flex',
      },
    },
    footerRight: {
      flex: 0.0,
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flex: 0.3,
      },
    },
    textLogo: {
      fontFamily: 'Futura',
      fontSize: 30,
      fontWeight: 'bold',
    },
    rightCon: {
      padding: '2rem 7rem',
    },
    footerMid: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > div': {
        display: 'flex',
      },
      [theme.breakpoints.up('sm')]: {
        flex: 0.4,
      },
    },
    leftCon: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.NAVBARBLACK,
      lineHeight: '3rem',
    },
    avatars: {
      margin: '2rem 1rem 0 1rem',
    },
    avatarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.DEVDARKBLUE,
    },
  }));
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  if (location.pathname.slice(0, 9) === '/messages') return <div></div>;
  return (
    <div className={classes.root}>
      <div className={classes.footerContainer}>
        <div
          style={{ width: '50%', backgroundColor: '#eaeaea', height: 3 }}
        ></div>
        <div
          style={{
            margin: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src="https://res.cloudinary.com/willwang/image/upload/v1609184704/logoround_tgdkrs.png"
            style={{ width: 100, height: 100, opacity: '.9' }}
            onClick={() => history.push('/')}
          />
        </div>
        <div
          style={{ width: '50%', backgroundColor: '#eaeaea', height: 3 }}
        ></div>
      </div>
      <div className={classes.footerContent}>
        <div className={classes.footerLeft}>
          <Typography className={classes.leftCon}>PRIVACY POLICY</Typography>
          <Typography className={classes.leftCon}>
            TERMS & CONDITIONS
          </Typography>
          <Typography className={classes.leftCon}>ABOUT US</Typography>
        </div>
        <div className={classes.footerMid}>
          <Typography style={{ color: COLORS.DEVDARKBLUE, fontWeight: 900 }}>
            TEAM
          </Typography>
          <Grid
            container
            className={classes.midAvatars}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item className={classes.avatarContainer}>
              <IconButton
                href="https://www.linkedin.com/in/kevin-bastoul/"
                target="_blank"
              >
                <Avatar
                  // className={classes.avatars}
                  src="https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/005/553/medium/kevin_bastoul.jpg?1602007648"
                />
              </IconButton>
              <Typography className={classes.name}>Kevin</Typography>
            </Grid>

            <Grid item className={classes.avatarContainer}>
              <IconButton href="https://github.com/nverno" target="_blank">
                <Avatar
                  // className={classes.avatars}
                  src="https://secure.gravatar.com/avatar/e0fb12778bde5d0dddddd3b8b619681b?secure=true&size=300"
                />
              </IconButton>
              <Typography className={classes.name}>Noah</Typography>
            </Grid>
            <Grid item className={classes.avatarContainer}>
              <IconButton
                href="https://www.linkedin.com/in/oriravid/"
                target="_blank"
              >
                <Avatar
                  // className={classes.avatars}
                  src="https://ca.slack-edge.com/T03GU501J-U01AUNFQF19-4272e55fae3e-512"
                />
              </IconButton>
              <Typography className={classes.name}>Ori</Typography>
            </Grid>

            <Grid item className={classes.avatarContainer}>
              <IconButton
                href="https://www.linkedin.com/in/will-wang-6b1ba675/"
                target="_blank"
              >
                <Avatar
                  // className={classes.avatars}
                  src="https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/005/525/medium/Yizhe_Wang.jpg?1602196612"
                />
              </IconButton>
              <Typography className={classes.name}>Will</Typography>
            </Grid>
          </Grid>
        </div>
        <div className={classes.footerRight}>
          <Typography className={classes.textLogo}>devHUB</Typography>
          <Typography className={classes.rightCon}>
            devHUB is the home to the best developers of the world. We are here
            to share inspirations and create wonderful applications.
          </Typography>
        </div>
      </div>
      <div className={classes.footer}>
        <Typography className={classes.footerText}>
          <span style={{ color: COLORS.DEVDARKBLUE, fontWeight: 800 }}>©</span>{' '}
          2020 devHUB. All rights reserved.
        </Typography>
        <Typography className={classes.footerText}>
          Designed and made with <span style={{ color: 'red' }}>♥</span> in
          California by the{' '}
          <a
            href="https://github.com/aA-devHub/devhub"
            style={{ color: COLORS.DEVDARKBLUE, fontWeight: 800 }}
          >
            Wonder4
          </a>
        </Typography>
        <Typography className={classes.footerText}>
          <span style={{ color: COLORS.DEVDARKBLUE, fontWeight: 800 }}>
            1234
          </span>{' '}
          projects on devHUB now
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
