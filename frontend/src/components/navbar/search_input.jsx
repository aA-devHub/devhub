import React, { useEffect, useRef } from 'react';
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

const SearchInput = ({
  search,
  tags,
  setSearch,
  clearTags,
  fetchProjects,
  history,
  ...props
}) => {
  // clear tags/search when route changes from home to other page
  let location = useLocation();
  const locationRef = useRef();
  let prevLocation;

  useEffect(() => {
    locationRef.current = location.pathname;

    if (prevLocation === '/' && locationRef.current !== '/') {
      if (tags.length > 0) clearTags();
      if (search !== '') setSearch('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  prevLocation = locationRef.current;

  // Uncomment to add debouncing .3 seconds
  // Debounce reference:
  // https://dev.to/jasonnordheim/debounce-performance-and-react-4de1

  // useEffect(() => {
  // const timeout = setTimeout(() => {
  // if (tags.length > 0) {
  //   fetchProjects({
  //     search,
  //     tags,
  //   });
  // }
  // }, 300);
  // return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationRef.current !== '/') history.push('/');
    fetchProjects({ search, tags });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputBase
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          {...props}
        />
      </form>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
