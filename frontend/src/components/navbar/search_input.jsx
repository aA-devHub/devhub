import React, { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setSearch } from '../../actions/search_actions';
import { fetchProjects } from '../../actions/project_actions';
import { clearTags } from '../../actions/tag_actions';

const mapStateToProps = (state, _ownProps) => {
  const { search, tags } = state.ui;
  return { search, tags };
};

const mapDispatchToProps = (dispatch) => ({
  setSearch: (searchString) => dispatch(setSearch(searchString)),
  fetchProjects: (filter) => dispatch(fetchProjects(filter)),
  clearTags: () => dispatch(clearTags()),
});

// Debounce reference:
// https://dev.to/jasonnordheim/debounce-performance-and-react-4de1
const SearchInput = ({
  search,
  tags,
  setSearch,
  clearTags,
  fetchProjects,
  ...props
}) => {
  // clear tags when route changes
  let location = useLocation();
  useEffect(() => {
    clearTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // debouncing .3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProjects({
        search,
        tags,
      });
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, tags]);

  return (
    <>
      <InputBase
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        {...props}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
