import React, { useEffect } from 'react';
import * as COLORS from '../../colors';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { fetchProject, deleteProject } from '../../actions/project_actions';
import Drawer from './drawers/Drawers';

import { CarouselWall, Three, Mason } from './ImageWall';
// import { BarChart, PieChart } from './charts/TechChart';
import TechChart from './charts/ChartContainer';
import { Vertical, Whirligig, Horiz } from './Feature';
import FutureFeatures from './FutureFeatures';
import Description from './Description';
import { makeStyles, Typography } from '@material-ui/core';
import { fetchUser } from '../../actions/user_actions';

function Project({ project, fetchProject, deleteProject, user, currentUser }) {
  const useStyles = makeStyles(() => ({
    root: {
      marginTop: '2%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: 800,
      color: COLORS.DEVBLUE,
    },
    imageWall: {
      margin: '2rem auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxHeight: 700,
    },
  }));

  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    fetchProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const images = [];
  const renderImageWall = (theme) => {
    switch (theme) {
      case 1:
        return <CarouselWall images={project.images} />;
      case 2:
        return <Mason images={project.images} />;
      case 3:
        return <Three images={project.images} />;
      default:
        return <CarouselWall images={project.images} />;
    }
  };

  const renderTechChart = (theme) => {
    return <TechChart project={project} theme={theme} />;
  };

  const renderFeatures = (theme) => {
    switch (theme) {
      case 3:
        return <Whirligig features={project.features} />;
      case 2:
        return <Horiz features={project.features} />;
      case 1:
        return <Vertical features={project.features} />;
      default:
        return <Vertical features={project.features} />;
    }
  };

  if (!project || !project.ui || !project.images) return null;
  const { title, overviewLayout, description, futureFeatures } = project;
  const { languageChart, featuresLayout } = project.ui;
  return (
    <div>
      <Drawer
        project={project}
        developer={user}
        comments={project.comments}
        deleteProject={deleteProject}
        currentUser={currentUser}
      />
      <div className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
        <div className={classes.imageWall}>
          {renderImageWall(overviewLayout)}
        </div>
        <div className="project-overview-section">
          <Description description={description} />
          {renderTechChart(languageChart)}
        </div>
        {renderFeatures(featuresLayout)}
        <FutureFeatures project={project} features={futureFeatures} />
      </div>
    </div>
  );
}
export default connect(
  (state, ownProps) => ({
    user:
      state.entities.users[
        state.entities.projects[ownProps.match.params.id]?.user
      ],
    currentUser: state.session.user.id,
    project: state.entities.projects[ownProps.match.params.id],
  }),
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
    deleteProject: (id) => dispatch(deleteProject(id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
  })
)(Project);
