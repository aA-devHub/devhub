import React, { useState, useEffect } from 'react';
import * as COLORS from '../../colors';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { fetchProject } from '../../actions/project_actions';
import Drawer from './drawers/Drawers';
import { CarouselWall, Three, Mason } from './ImageWall';
import { BarChart, PieChart } from './charts/TechChart';
import { Vertical, Whirligig, Horiz } from './Feature';
import FutureFeatures from './FutureFeatures';
import Description from './Description';
import { makeStyles, Typography } from '@material-ui/core';

function Project({ project, fetchProject, users }) {
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
    fetchProject(id);
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
    switch (theme) {
      case 1:
        return <BarChart project={project} />;
      case 2:
        return <PieChart project={project} />;
      default:
        return <PieChart project={project} />;
    }
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
      <Drawer />
      <div className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
        <div className={classes.imageWall}>
          {renderImageWall(overviewLayout)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Description description={description} />
          {renderTechChart(languageChart)}
        </div>
        {renderFeatures(featuresLayout)}
        <FutureFeatures features={futureFeatures} />
      </div>
    </div>
  );
}
export default connect(
  (state, ownProps) => ({
    users: state.entities.users,
    currentUser: state.entities.users,
    project: state.entities.projects[ownProps.match.params.id],
  }),
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
  })
)(Project);
