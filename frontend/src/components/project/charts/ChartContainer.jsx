import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';

import PieChart from './PieChart';
import BarChart from './BarChart';
import { fetchLanguages } from '../../../actions/github_actions';

const mapStateToProps = (state, _ownProps) => ({
  languages: state.entities.languages,
});

const mapDispatchToProps = (dispatch, { project }) => ({
  fetchLanguages: () => project && dispatch(fetchLanguages(project.githubLink)),
});

const chartSpecs = {
  width: 800,
  height: 400,
};

const normalizeData = (languages) => {
  return Object.keys(languages).map((key) => ({
    name: key,
    value: languages[key],
  }));
};

const ChartContainer = ({
  project,
  theme,
  languages,
  fetchLanguages,
  ...props
}) => {
  useEffect(() => {
    console.log('Fetching languages for: ', project);
    fetchLanguages();
  }, []);

  if (!languages) return <PropagateLoader />;
  const Component = theme !== 1 ? BarChart : PieChart;
  console.log('Theme: ', theme);

  return (
    <>
      <Component data={normalizeData(languages)} {...chartSpecs} {...props} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
