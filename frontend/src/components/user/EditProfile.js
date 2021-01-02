import React, { useState, useEffect } from 'react';
import { DatePicker } from '@material-ui/pickers';
import * as COLORS from '../../colors';
import { fetchUser, updateUser } from '../../actions/user_actions';
import {
  Public,
  AccountCircle,
  Add,
  HighlightOff,
  Clear,
} from '@material-ui/icons';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  makeStyles,
  Button,
  Grid,
  Typography,
  fade,
  InputBase,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditUserForm({ fetchUser, userId, updateUser, user }) {
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
    skill: {
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    sliders: {
      width: '70%',
      margin: '0 2rem 0 auto',
    },
    addSkill: {
      display: showAdd,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    formControl: {
      marginLeft: '1rem',
    },
    addExp: {
      display: showAddExp,
    },
    labelTag: {
      fontWeight: 800,
      color: COLORS.DEVDARKBLUE,
    },
  }));

  const [showAdd, setShowAdd] = useState('none');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [skills, setSkills] = useState({});
  const [newSkill, setNewSkill] = useState({ skill: '', level: 1 });
  const [experience, setExperience] = useState([]);
  const [newSkillError, setNewSkillError] = useState('');
  const [newExperience, setNewExperience] = useState({
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    company: '',
    position: '',
  });
  const [newExperienceError, setNewExperienceError] = useState('');
  const [showAddExp, setShowAddExp] = useState('none');

  useEffect(() => {
    fetchUser(userId).then(({ user }) => {
      console.log('user', user);
      setTitle(user.title);
      setLocation(user.location);
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      setAvatarUrl(user.imageUrl);
      const socials = user.socials;
      setFacebook(socials.facebook || '');
      setTwitter(socials.twitter || '');
      setInstagram(socials.instagram || '');
      setGithub(socials.github || '');
      setLinkedin(socials.linkedin || '');
      setSkills(user.skills);
      console.log('skills', skills);
      setExperience(user.experience);
      console.log('experience here', experience);
      console.log('showAddExp', showAddExp);
    });
  }, []);

  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const renderSkills = () => {
    let res = [];
    for (const key in skills) {
      res.push(
        <div className={classes.skill} key={key}>
          <Typography
            style={{ fontSize: 14, fontWeight: 400, color: COLORS.DEVDARKBLUE }}
          >
            {key}
          </Typography>
          <Slider
            className={classes.sliders}
            value={skills[key]}
            onChange={(e, value) => {
              setSkills({ ...skills, [key]: value });
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            style={{ color: COLORS.DEVBLUE }}
          />
          <HighlightOff
            color="secondary"
            onClick={() => {
              const newSkills = { ...skills };
              delete newSkills[key];
              setSkills({ ...newSkills });
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>
      );
    }
    return res;
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

  const renderExperience = () => {
    const exp = [];
    console.log('experience[0]', experience[0]);
    for (const key in experience) {
      exp.push(
        <div style={{ display: 'flex', alignItems: 'center' }} key={key}>
          <DatePicker
            format="MM-yyyy"
            margin="normal"
            label="start"
            value={experience[key].start}
            onChange={(val) =>
              setExperience({
                ...experience,
                [key]: {
                  ...experience[key],
                  start: val.toISOString(),
                },
              })
            }
          />
          <div style={{ width: 30 }}></div>

          <DatePicker
            format="MM-yyyy"
            margin="normal"
            label="end"
            value={experience[key].end}
            onChange={(val) =>
              setExperience({
                ...experience,
                [key]: {
                  ...experience[key],
                  end: val.toISOString(),
                },
              })
            }
          />
          <div style={{ width: 50 }}></div>

          <InputBase
            style={{ width: '60%' }}
            className={classes.baseInput}
            value={experience[key].company || ''}
            onChange={(e) =>
              setExperience({
                ...experience,
                [key]: { ...experience[key], company: e.target.value },
              })
            }
          />
          <div style={{ width: 50 }}></div>
          <InputBase
            style={{ width: '60%' }}
            className={classes.baseInput}
            value={experience[key].position}
            onChange={(e) =>
              setExperience({
                ...experience,
                [key]: { ...experience[key], position: e.target.value },
              })
            }
          />
          <HighlightOff
            style={{
              color: 'red',
              marginLeft: 20,
              marginTop: 20,
              cursor: 'pointer',
            }}
            onClick={() => {
              let newExper = { ...experience };
              delete newExper[key];
              setExperience({ ...newExper });
              console.log('experience', experience);
            }}
          />
        </div>
      );
    }
    return exp;
  };
  const addExperience = () => {
    return (
      <div style={{ marginTop: '1rem' }}>
        <div
          style={{
            display: showAddExp,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{
              color: COLORS.DEVBLUE,
              fontWeight: 800,
            }}
          >
            ADD AN EXPERIENCE
          </Typography>
          <div>
            <Add
              style={{ color: COLORS.DEVBLUE, marginRight: 10 }}
              onClick={() => handleAddExperience()}
            />
            <Clear
              style={{ color: 'red' }}
              onClick={() => setShowAddExp('none')}
            />
          </div>
        </div>
        <div className={classes.addExp}>
          <DatePicker
            format="MM-yyyy"
            margin="normal"
            label="start"
            value={newExperience.start}
            onChange={(val) =>
              setNewExperience({
                ...newExperience,
                start: val.toISOString(),
              })
            }
          />
          <div style={{ width: 30 }}></div>

          <DatePicker
            format="MM-yyyy"
            margin="normal"
            label="end"
            value={newExperience.end}
            onChange={(val) =>
              setNewExperience({
                ...newExperience,
              })
            }
          />
          <div style={{ width: 50 }}></div>

          <InputBase
            style={{ width: '60%' }}
            className={classes.baseInput}
            value={newExperience.company}
            onChange={(e) => {
              setNewExperience({ ...newExperience, company: e.target.value });
            }}
            placeholder="company name"
          />
          <div style={{ width: 50 }}></div>
          <InputBase
            style={{ width: '60%' }}
            className={classes.baseInput}
            value={newExperience.position}
            placeholder="position"
            onChange={(e) =>
              setNewExperience({ ...newExperience, position: e.target.value })
            }
          />
        </div>
      </div>
    );
  };
  const handleAddExperience = () => {
    if (
      newExperience.end < newExperience.start ||
      newExperience.start > new Date() ||
      newExperience.end > new Date()
    ) {
      setNewExperienceError('invalid start end date');
    } else if (!newExperience.company) {
      setNewExperienceError('Company name required');
    } else if (!newExperience.position) {
      setNewExperienceError('Position required');
    } else {
      setExperience({
        ...experience,
        [parseInt(Math.max(...Object.keys(experience)) + 1)]: newExperience,
      });
      setNewExperience({
        start: new Date(),
        end: new Date(),
        company: '',
        position: '',
      });
      setShowAddExp('none');
      setNewExperienceError('');
    }
  };

  const accountForm = (
    <div>
      <label className={classes.labels}>
        <Typography className={classes.labelTag}>Name</Typography>

        <InputBase
          className={classes.baseInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography className={classes.labelTag}>Email</Typography>
        <InputBase
          className={classes.baseInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
    </div>
  );
  const handleAddSkill = () => {
    setNewSkillError('');
    setNewSkill({ skill: '', level: 1 });

    if (!newSkill.skill) {
      setNewSkillError('need a skill name');
    } else {
      setSkills({ ...skills, [newSkill.skill]: newSkill.level });
      setShowAdd('none');
    }
  };

  const renderAddSkill = () => (
    <div className={classes.addSkill}>
      <Typography
        variant="body2"
        style={{
          marginTop: 20,
          marginRight: 10,
          fontWeight: 800,
          color: COLORS.DEVBLUE,
        }}
      >
        ADD A SKILL
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="skill name"
          value={newSkill.skill}
          onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">level</InputLabel>
          <Select
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: e.target.value })
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ minWidth: 100 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <MenuItem value={num} key={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <Add
            style={{ color: COLORS.DEVBLUE, marginRight: 10 }}
            onClick={() => handleAddSkill()}
          />
          <Clear style={{ color: 'red' }} onClick={() => setShowAdd('none')} />
        </div>
      </div>
    </div>
  );

  const pubForm = (
    <div>
      <label className={classes.labels}>
        <Typography className={classes.labelTag}>Location</Typography>

        <InputBase
          className={classes.baseInput}
          value={location || ''}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography className={classes.labelTag}>Title</Typography>
        <InputBase
          className={classes.baseInput}
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <Typography className={classes.labelTag}>Bio</Typography>
        <InputBase
          className={classes.baseInput}
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <label className={classes.labels}>
        <div
          style={{
            display: 'flex',
            marginTop: '2rem',
            marginBottom: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <Typography className={classes.labelTag}>Skills</Typography>
          <Add
            style={{ color: 'gray', cursor: 'pointer' }}
            onClick={() => setShowAdd('flex')}
          />
        </div>
        <Divider />
        {renderSkills()}
        {renderAddSkill()}
        <Typography style={{ color: 'red' }}>{newSkillError}</Typography>
        <div></div>
      </label>
      <div
        style={{
          display: 'flex',
          marginTop: '2rem',
          marginBottom: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography className={classes.labelTag}>Experiences</Typography>
        <Add
          style={{ color: 'gray', cursor: 'pointer' }}
          onClick={() => setShowAddExp('flex')}
        />
      </div>
      <Divider />
      {renderExperience()}
      {addExperience()}
      <Typography style={{ color: 'red' }}>{newExperienceError}</Typography>
      <br></br>
      <Typography className={classes.labelTag}>Socials</Typography>
      <Divider style={{ marginTop: '1rem' }} />
      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://res.cloudinary.com/willwang/image/upload/v1609451981/instagram_uk5pzd.png"
          style={{ marginTop: 20, marginRight: 20 }}
        />
        <InputBase
          className={classes.baseInput}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://res.cloudinary.com/willwang/image/upload/v1609451981/linkedin_k6foep.png"
          style={{ marginTop: 20, marginRight: 20 }}
        />
        <InputBase
          className={classes.baseInput}
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://res.cloudinary.com/willwang/image/upload/v1609282516/fb_zkz2ev.png"
          style={{ marginTop: 20, marginRight: 20 }}
        />
        <InputBase
          className={classes.baseInput}
          value={facebook}
          onChange={(e) => {
            setFacebook(e.target.value);
            console.log('facebook', facebook);
          }}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://res.cloudinary.com/willwang/image/upload/v1609282516/twitter_crwwns.png"
          style={{ marginTop: 20, marginRight: 20 }}
        />
        <InputBase
          className={classes.baseInput}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://res.cloudinary.com/willwang/image/upload/v1609282516/gh_syxrpn.png"
          style={{ marginTop: 20, marginRight: 20 }}
        />
        <InputBase
          className={classes.baseInput}
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
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
    const userinfo = {
      id: userId,
      _id: userId,
      name,
      location,
      email,
      imageUrl: avatarUrl,
      bio,
      socials: { facebook, twitter, instagram, github, linkedin },
      skills: skills,
      experience: Object.values(experience),
    };
    console.log('userinfo', userinfo);
    updateUser(userinfo);
    history.push(`/users/${user._id}`);
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
                {user?.name}
              </Typography>
              <label>
                <Avatar
                  src={avatarUrl}
                  style={{
                    marginRight: 10,
                    width: 100,
                    height: 100,
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleAvatar(e.target.files[0])}
                />
              </label>
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
  (state) => ({
    userId: state.session.user.id,
    user: state.entities.users[state.session.user.id],
  }),
  (dispatch) => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user)),
    // updateUser: (user) => dispatch(editUserAction(user)),
  })
)(EditUserForm);
