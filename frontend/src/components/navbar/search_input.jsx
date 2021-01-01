import React, { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';

import { connect } from 'react-redux';
import { setSearch } from '../../actions/search_actions';
import { fetchProjects } from '../../actions/project_actions';

const mapStateToProps = (state, _ownProps) => {
  const { search, tags } = state.ui;
  return { search, tags };
};

const mapDispatchToProps = (dispatch) => ({
  setSearch: (searchString) => dispatch(setSearch(searchString)),
  fetchProjects: (filter) => dispatch(fetchProjects(filter)),
});

// Debounce reference:
// https://dev.to/jasonnordheim/debounce-performance-and-react-4de1
const SearchInput = ({ search, tags, setSearch, fetchProjects, ...props }) => {
  // debouncing .3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length > 0) {
        fetchProjects({
          search,
          tags,
        });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

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
