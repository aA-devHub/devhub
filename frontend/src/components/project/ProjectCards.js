import Card from './ProjectCard';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

function ProjectCards({ projects }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '20px 5%',
    },
  }));
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {/* {projects.map((project) => (
        <Grid item md={3} sm={6}>
          <Card />
        </Grid>
      ))} */}
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
      <Grid item md={3} sm={6}>
        <Card />
      </Grid>
    </Grid>
  );
}

export default ProjectCards;
