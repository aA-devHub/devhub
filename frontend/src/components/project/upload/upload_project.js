import { connect } from 'react-redux';
import { createProject } from '../../../actions/project_actions';
import StepsMaster from './steps_master';

const mapSTP = () => ({
  projectAction: 'upload',
  project: {
    title: '',
    githubLink: '',
    liveLink: '',
    description: '',
    images: {
      hero: '',
      secondaries: [],
    },
    features: [],
    ui: {
      color: 'light',
      overviewLayout: 1,
      featuresLayout: 1,
      languageChart: 1,
    },
    mobile: false,
    browsers: [],
    futureFeatures: [],
  },
});

const mapDTP = (dispatch) => ({
  createProject: (project) => dispatch(createProject(project)),
});

export default connect(mapSTP, mapDTP)(StepsMaster);
