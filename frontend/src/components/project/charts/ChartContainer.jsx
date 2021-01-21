import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';

import PieChart from './PieChart';
import BarChart from './BarChart';
import {
  fetchLanguages,
  clearLanguages,
} from '../../../actions/github_actions';

const mapStateToProps = (state, _ownProps) => ({
  languages: state.entities.languages,
});

const mapDispatchToProps = (dispatch, { project }) => ({
  fetchLanguages: () => project && dispatch(fetchLanguages(project.githubLink)),
  clearLanguages: () => dispatch(clearLanguages()),
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
  clearLanguages,
  ...props
}) => {
  useEffect(() => {
    clearLanguages();
    setTimeout(() => fetchLanguages(), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearLanguages, fetchLanguages]);

  if (!languages) return <PropagateLoader />;
  const Component = theme !== 1 ? BarChart : PieChart;

  return (
    <>
      <Component data={normalizeData(languages)} {...chartSpecs} {...props} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
