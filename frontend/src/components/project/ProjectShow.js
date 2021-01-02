import React, { useState, useEffect } from 'react';
import * as COLORS from '../../colors';
import { IconButton, Drawer, Avatar } from '@material-ui/core';
import { Sms } from '@material-ui/icons';
import { connect } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { fetchProject, fetchProjects } from '../../actions/project_actions';
import Comment from './drawers/Comment';
import UserDrawer from './drawers/UserDrawer';

const useStyles = makeStyles((theme) => ({}));

function Project({ projects }) {
  // const { id } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {
    fetchProjects();
  }, []);
  console.log('projects', projects);

  const [cmt, setCmt] = useState({ right: false });
  const [showUser, setShowUser] = useState({ right: false });
  const classes = useStyles();
  const toggleCommentDrawer = (bool) => (event) => {
    setCmt({ right: bool });
  };
  const toggleUserDrawer = (bool) => (event) => {
    setShowUser({ right: bool });
  };

  return (
    <div>
      <React.Fragment key={'right'}>
        <div
          style={{
            position: 'fixed',
            right: 40,
            top: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 19,
          }}
        >
          <div
            style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
          ></div>
          <Avatar
            onClick={toggleUserDrawer(true)}
            style={{
              height: 50,
              width: 50,
              border: `1px solid ${COLORS.DEVBLUE}`,
              cursor: 'pointer',
            }}
            src={
              project?.user?.avatarUrl ||
              'https://res.cloudinary.com/willwang/image/upload/v1608279563/23_npj6fd.webp'
            }
          />
          <div
            style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
          ></div>
          <IconButton
            onClick={toggleCommentDrawer(true)}
            style={{
              height: 50,
              width: 50,
              border: `1px solid ${COLORS.DEVBLUE}`,
              borderRadius: 999,
              backgroundColor: 'white',
              color: COLORS.DEVBLUE,
            }}
          >
            <Sms />
          </IconButton>
          <div
            style={{ backgroundColor: COLORS.DEVBLUE, height: 100, width: 1 }}
          ></div>
        </div>
        <Drawer
          className={classes.drawer}
          anchor={'right'}
          open={cmt.right}
          onClose={toggleCommentDrawer(false)}
        >
          <Comment toggleCommentDrawer={toggleCommentDrawer} />
        </Drawer>
        <Drawer
          className={classes.drawer}
          anchor={'right'}
          open={showUser.right}
          onClose={toggleUserDrawer(false)}
        >
          <UserDrawer toggleDrawer={toggleUserDrawer} />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default connect(
  (state) => ({
    currentUser: state.entities.users,
    projects: state.entities.projects,
  }),
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
    fetchProjects: () => dispatch(fetchProjects()),
  })
)(Project);
