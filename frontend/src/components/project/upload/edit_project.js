import { connect } from 'react-redux';
import { updateProject } from '../../../actions/project_actions';
import StepsMaster from './steps_master';

const mapSTP = (store, ownProps) => ({
  projectAction: 'edit',
  project: store.entities.projects[ownProps.match.params.id],
});

const mapDTP = (dispatch) => ({
  updateProject: (project) => dispatch(updateProject(project)),
});

export default connect(mapSTP, mapDTP)(StepsMaster);
