import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import * as COLORS from '../../colors';
import Navbar from '../navbar/navbar';
// import { getCurrentUserInfo, editUserAction } from '../../Actions/UserActions';
import { Public, AccountCircle, Add } from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  makeStyles,
  Button,
  Paper,
  Grid,
  Typography,
  fade,
  withStyles,
  InputBase,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: '5rem 10rem',
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    padding: '0',
  },
  uploadAvatar: {
    display: 'flex',
    margin: '2rem auto',
  },
  avatar: {
    marginRight: 20,
    width: 50,
    height: 50,
    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 100,
    },
  },
  buttons: {
    fontSize: 9,
    height: '2rem',
    padding: '0 .7rem',
    margin: 'auto 1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  labels: {
    display: 'block',
    marginTop: '1rem',
  },
  endnote: {
    color: '#3c3c3c',
    fontSize: 14,
    fontWeight: 100,
  },
  formGrid: {
    maxWidth: '70%',
  },
  selector: {
    marginTop: '2rem',
    minWidth: 50,
    width: '70%',
    fontSize: 7,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      minWidth: 135,
      marginRight: 10,
    },
  },
  listText: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '-1.5rem',
      display: 'block',
    },
  },
  baseInput: {
    width: '100%',
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& > input': {
      borderRadius: 4,
      backgroundColor: '#f1f1f1',
      border: '1px solid #ced4da',
      fontSize: 16,
      fontWeight: 100,
      height: '2rempx',
      padding: '10px 12px',
      marginTop: 20,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(COLORS.DEVBLUE, 0.25)} 0 0 0 0.2rem`,
        borderColor: COLORS.DEVBLUE,
      },
    },
  },
}));

function EditUserForm({ user }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState({ name: '', level: '' });
  const [experience, setExperience] = useState({
    time: '',
    company: '',
    title: '',
  });
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [github, setGithub] = useState('');
  useEffect(() => {}, []);
  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const selection = (
    <div className={classes.selector}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Public />
          </ListItemIcon>
          <ListItemText className={classes.listText} secondary="Public Info" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText className={classes.listText} secondary="Account" />
        </ListItem>
      </List>
    </div>
  );
  const accountForm = (
    <div>
      <label className={classes.labels}>
        <Typography>User Name</Typography>
        {/* TODO why it's showing the use name? */}
        <InputBase
          className={classes.baseInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography>Email</Typography>

        <InputBase
          className={classes.baseInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography>Password</Typography>
        <InputBase
          className={classes.baseInput}
          type="password"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </div>
  );

  const pubForm = (
    <div>
      <label className={classes.labels}>
        <Typography>
          Name<span style={{ color: 'red' }}>*</span>
        </Typography>
        <InputBase
          className={classes.baseInput}
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography>Location</Typography>

        <InputBase
          className={classes.baseInput}
          value={location || ''}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography>Title</Typography>
        <InputBase
          className={classes.baseInput}
          value={title || ''}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography>Bio</Typography>
        <InputBase
          className={classes.baseInput}
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
          // multiline
          // rows='3'
          // rowsMax='5'
        />
      </label>
      <label className={classes.labels}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Skills</Typography>
          <Add style={{ color: 'gray' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '100%' }}>
            <InputBase
              className={classes.baseInput}
              value={skills.name || ''}
              onChange={(e) => e.target.value}
              placeholder="e.g. ruby"
            />
            <Typography className={classes.endnote}>
              language/skill name: eg. ruby
            </Typography>
          </div>
          <div style={{ width: 40 }}></div>
          <div style={{ width: '100%' }}>
            <InputBase
              className={classes.baseInput}
              value={skills.level || ''}
              onChange={(e) => setSkills({ ...skills, level: e.target.value })}
              placeholder="e.g. 10"
            />
            <Typography className={classes.endnote}>
              level: a number between 1-10
            </Typography>
          </div>
        </div>
      </label>
      <label className={classes.labels}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Experience</Typography>
          <Add style={{ color: 'gray' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '100%' }}>
            <InputBase
              className={classes.baseInput}
              value={experience.time || ''}
              onChange={(e) =>
                setExperience({ ...experience, time: e.target.value })
              }
              placeholder="start end time: 2002-2005"
            />
          </div>
          <div style={{ width: 40 }}></div>
          <div style={{ width: '100%' }}>
            <InputBase
              className={classes.baseInput}
              value={experience.company || ''}
              onChange={(e) =>
                setExperience({ ...experience, company: e.target.value })
              }
              placeholder="company name: devHUB"
            />
          </div>
          <div style={{ width: 40 }}></div>
          <div style={{ width: '100%' }}>
            <InputBase
              className={classes.baseInput}
              value={experience.title || ''}
              onChange={(e) =>
                setExperience({ ...experience, title: e.target.value })
              }
              placeholder="title: frontend dev"
            />
          </div>
        </div>
      </label>
    </div>
  );

  const publicInfoForm = (
    <Grid item md={8} sm={12} xs={12} className={classes.formGrid}>
      <div className={classes.info}>
        {selectedIndex ? accountForm : pubForm}
        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          style={{
            marginTop: '2rem',
            backgroundColor: COLORS.DEVBLUE,
            color: 'white',
          }}
        >
          <Typography>Save Profile</Typography>
        </Button>
      </div>
    </Grid>
  );
  const handleAvatar = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'dribbble');
    data.append('cloud_name', 'willwang');
    fetch('https://api.cloudinary.com/v1_1/willwang/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatarUrl(data.url);
        console.log('data', data.url);
      })
      .catch((err) => console.log('error', err));
  };
  // }
  const history = useHistory();

  const handleSubmit = () => {
    console.log('user', bio);
    const userinfo = {
      id: user.id,
      name,
      username,
      location,
      email,
      password,
      avatar_url: avatarUrl,
      bio,
      skills,
      experience,
      twitter,
      facebook,
      github,
    };
    // updateUser(userinfo);
    // history.push(`/users/${user.id}`);
  };

  return (
    <div>
      {/* {errors} */}
      <div className={classes.root}>
        <Grid container className={classes.form}>
          <Grid item md={4}>
            <div className={classes.title}>
              <Typography
                variant="h6"
                style={{ marginBottom: '1rem', fontWeight: 800 }}
              >
                Edit Profile
              </Typography>
              <Avatar
                src={avatarUrl}
                style={{ marginRight: 10, width: 100, height: 100 }}
              />
            </div>
            {selection}
          </Grid>
          {publicInfoForm}
        </Grid>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ user: state.user, state }),
  (dispatch) => ({
    // fetchUser: (sessionToken) => dispatch(getCurrentUserInfo(sessionToken)),
    // updateUser: (user) => dispatch(editUserAction(user)),
  })
)(EditUserForm);
