import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fade, makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Badge } from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as COLORS from '../../colors';
import { logout } from '../../actions/session_actions';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  fetchNotifications,
  removeNotification,
} from '../../actions/notification_actions';
import SearchInput from './search_input';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '25px',
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '15px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: 'auto',
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  user: {
    backgroundColor: 'white',
    height: '28px',
    width: '28px',
    borderRadius: '50%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('750')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('750')]: {
      display: 'none',
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(
    null
  );

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let location = useLocation();
  const { fetchNotifications } = props;

  useEffect(() => {
    setTimeout(() => {
      fetchNotifications();
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClick = (option) => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();

    switch (option) {
      case 'home':
        props.history.push('/');
        return;
      case 'profile':
        props.history.push(`/users/${props.currentUser.id}`);
        return;
      case 'messages':
        props.history.push('/messages');
        return;
      case 'editprofile':
        props.history.push(`/users/edit`);
        return;
      case 'notifications':
        props.history.push('/notifications');
        return;
      case 'uploadproject':
        props.history.push('/projects/upload');
        return;
      case 'signin':
        props.history.push('/signin');
        return;
      case 'signout':
        props.signout();
        props.history.push('/');
        return;
      default:
        return;
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClick}
      style={{ marginTop: 40 }}
    >
      <MenuItem onClick={() => handleProfileMenuClick('profile')}>
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('editprofile')}>
        Edit Profile
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('signout')}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  const handleNotificationMenuClick = (notificationData) => {
    setNotificationsAnchorEl(null);
    setTimeout(() => {
      props.removeNotification(notificationData._id);
    }, 300);
    props.history.push(`/projects/${notificationData.projectId}`);
  };

  const fetchNotificationsComponent = () => {
    if (
      props.notifications &&
      props.notifications.other &&
      props.notifications.other.length > 0
    ) {
      return props.notifications.other.map((data, idx) => {
        // const type = data.source;
        // const projectId = data.projectId;
        const user = data.userName;
        const action = data.source === 'comment' ? 'commented on' : 'favorited';
        const project = data.projectName;
        return (
          <MenuItem key={idx} onClick={() => handleNotificationMenuClick(data)}>
            <Typography
              style={{ color: COLORS.DEVBLUE, fontWeight: 800, marginRight: 5 }}
            >
              {user}
            </Typography>{' '}
            {action}{' '}
            <Typography
              style={{
                marginLeft: 13,
                fontWeight: 800,
                color: COLORS.DEVDARKBLUE,
                textDecoration: 'underline',
              }}
            >
              {project}
            </Typography>
          </MenuItem>
        );
      });
    } else {
      return <MenuItem>No notifications!</MenuItem>;
    }
  };

  const notificationMenuId = 'primary-notifications-menu';
  let renderNotificationsMenu;
  if (props.currentUser) {
    renderNotificationsMenu = (
      <Menu
        anchorEl={notificationsAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={notificationMenuId}
        keepMounted
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isNotificationsMenuOpen}
        onClose={handleNotificationMenuClose}
        style={{ marginTop: 40 }}
      >
        {fetchNotificationsComponent()}
      </Menu>
    );
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleProfileMenuClick('profile')}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('messages')}>
        <IconButton aria-label="show new mails" color="inherit">
          {/* <Badge badgeContent={props.notifications.messages} color="secondary"> */}
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('notifications')}>
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge
            // this breaks because mobile menu doesn't check if props.currentUser
            // badgeContent={props.notifications.other.length}
            badgeContent={0}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('uploadproject')}>
        <IconButton aria-label="upload new project" color="inherit">
          <AddCircleIcon />
        </IconButton>
        <p>Upload Project</p>
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuClick('signout')}>
        <IconButton aria-label="sign out" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );

  let navIcons;
  if (props.currentUser) {
    navIcons = (
      <React.Fragment>
        <IconButton
          aria-label="show new notifications"
          color="inherit"
          onClick={handleNotificationsMenuOpen}
        >
          <Badge
            badgeContent={
              props.notifications ? props.notifications.other.length : 0
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="show new mails"
          color="inherit"
          onClick={() => handleProfileMenuClick('messages')}
        >
          <Badge
            badgeContent={
              props.notifications ? props.notifications.messages : 0
            }
            color="secondary"
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <img
            src={props.currentUser.imageUrl}
            className={classes.user}
            alt="user avatar"
          />
        </IconButton>

        <IconButton onClick={() => handleProfileMenuClick('uploadproject')}>
          <CloudUploadIcon
            style={{
              color: COLORS.DEVBLUE,
              marginLeft: 20,
              width: 30,
              height: 40,
            }}
          />
        </IconButton>
      </React.Fragment>
    );
  } else {
    navIcons = (
      <IconButton
        edge="end"
        onClick={() => handleProfileMenuClick('signin')}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  }

  return (
    <div
      className={classes.grow}
      style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 999 }}
    >
      <AppBar position="static" style={{ backgroundColor: COLORS.NAVBARBLACK }}>
        <Toolbar
          style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
        >
          <img
            src="../../logo.png"
            alt="logo"
            className={classes.logo + ' pointer'}
            onClick={() => handleProfileMenuClick('home')}
          />
          <Typography
            className={(classes.title, classes.grow)}
            variant="h6"
            noWrap
            style={{ cursor: 'pointer' }}
            onClick={() => handleProfileMenuClick('home')}
          >
            devHUB
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <SearchInput
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                history={props.history}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {navIcons}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationsMenu}
    </div>
  );
}

const mapSTP = ({ session }) => {
  return {
    currentUser: session.user,
    notifications: session.notifications,
  };
};

const mapDTP = (dispatch) => ({
  signout: () => dispatch(logout()),
  fetchNotifications: () => dispatch(fetchNotifications()),
  removeNotification: (notificationId) =>
    dispatch(removeNotification(notificationId)),
});

export default withRouter(connect(mapSTP, mapDTP)(Navbar));
