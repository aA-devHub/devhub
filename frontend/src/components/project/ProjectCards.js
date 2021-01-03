import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Card from './ProjectCard';
import { fetchProjects } from '../../actions/project_actions';

const mapStateToProps = (state, _ownProps) => {
  const { search, tags } = state.ui;
  const { projects } = state.entities;
  return {
    search,
    tags,
    projects,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (filter) => dispatch(fetchProjects(filter)),
});

function ProjectCards({ projects, fetchProjects, search, tags }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '20px 5%',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    fetchProjects({ search, tags });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.root}>
      {Object.values(projects).map((project, idx) => (
        <Grid item md={3} sm={6} key={idx}>
          <Card project={project} />
        </Grid>
      ))}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
      {/*   <Grid item md={4} sm={6}> */}
      {/*     <Card /> */}
      {/*   </Grid> */}
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCards);
