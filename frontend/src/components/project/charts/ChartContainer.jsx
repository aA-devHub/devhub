import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';

import { fetchLanguages } from '../../../actions/github_actions';

const mapStateToProps = (state, ownProps) => ({
  languages: state.entities.languages,
});

const mapDispatchToProps = (dispatch, { project }) => ({
  fetchLanguages: () => project && dispatch(fetchLanguages(project.githubLink)),
});

const ChartContainer = ({ project, languages, fetchLanguages, ...props }) => {
  // if (!project) return <PropagateLoader />;

  useEffect(() => {
    console.log('Fetching languages for: ', project);
    fetchLanguages();
  }, []);

  if (!languages) return <PropagateLoader />;
  return <>{props.children}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
