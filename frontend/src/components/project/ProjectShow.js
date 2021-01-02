import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { fetchProject, fetchProjects } from '../../actions/project_actions';
import Drawer from './drawers/Drawers';

function Project({ projects }) {
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Drawer />
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
