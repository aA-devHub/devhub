import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Card from './ProjectCard';
import { fetchProjects } from '../../actions/project_actions';
import { sortProjects, byPopularity, byDate } from '../../selectors/projects';

const mapStateToProps = (state, _ownProps) => {
  const { search, tags, order } = state.ui;
  let { projects } = state.entities;

  return {
    search,
    tags,
    projects,
    order,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (filter) => dispatch(fetchProjects(filter)),
});

function ProjectCards({ projects, order, fetchProjects, search, tags }) {
  useEffect(() => {
    fetchProjects({ search, tags });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const sortedProjects =
    (order === 'popularity'
      ? sortProjects(projects, byPopularity)
      : sortProjects(projects, byDate)) || [];

  return (
    <Grid container>
      {sortedProjects.map((project, idx) => (
        <Grid item md={3} sm={6} key={idx}>
          <Card project={project} />
        </Grid>
      ))}
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCards);
