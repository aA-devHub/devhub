import React, { useEffect } from 'react';
import * as COLORS from '../../colors';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { fetchProject } from '../../actions/project_actions';
import Drawer from './drawers/Drawers';
import { Button } from '@material-ui/core';
import { CarouselWall, Three, Mason } from './ImageWall';
// import { BarChart, PieChart } from './charts/TechChart';
import TechChart from './charts/ChartContainer';
import { Vertical, Whirligig, Horiz } from './Feature';
import FutureFeatures from './FutureFeatures';
import Description from './Description';
import { makeStyles, Typography } from '@material-ui/core';
import { fetchUser } from '../../actions/user_actions';

function Project({ project, fetchProject, user, currentUser }) {
  const useStyles = makeStyles((theme) => ({
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
    // if (id) {
    console.log(`CHECKPOINT- FETCHING: ${id}`);
    fetchProject(id);
    // }
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

  const history = useHistory();
  if (!project || !project.ui || !project.images) return null;
  const { title, overviewLayout, description, futureFeatures } = project;
  const { languageChart, featuresLayout } = project.ui;
  return (
    <div>
      <Drawer project={project} developer={user} comments={project.comments} />

      <div className={classes.root}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography className={classes.title}>{title}</Typography>
          {currentUser === project.user ? (
            <Button
              style={{ marginLeft: 20, marginTop: 2, color: COLORS.DEVBLUE }}
              onClick={() => history.push(`/projects/${project._id}/edit`)}
            >
              Edit
            </Button>
          ) : (
            <div></div>
          )}
        </div>
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
    fetchUser: (id) => dispatch(fetchUser(id)),
  })
)(Project);
