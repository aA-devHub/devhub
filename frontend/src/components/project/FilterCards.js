// import React, { useState } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { addTag, removeTag, clearTags } from '../../actions/tag_actions';
import { setOrder } from '../../actions/order_actions';

const mapStateToProps = (state) => ({
  selectedTags: state.ui.tags,
  order: state.ui.order,
});

const mapDispatchToProps = (dispatch) => ({
  removeTag: (tag) => dispatch(removeTag(tag)),
  addTag: (tag) => dispatch(addTag(tag)),
  clearTags: () => dispatch(clearTags()),
  setOrder: (order) => dispatch(setOrder(order)),
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2.25),
    display: 'flex',
    alignItems: 'center',
  },
  sortForm: {
    minWidth: 120,
    marginRight: '2rem',
  },
  toggleButtonGroup: {
    flexGrow: '1',
    display: 'flex',
    '& > *': {
      flexGrow: '1',
      borderColor: 'transparent',
    },
    '& > *:hover': {
      borderColor: `transparent`,
    },
  },
}));

const defaultTags = [
  'Javascript',
  'Ruby',
  'Cpp',
  'Python',
  'Golang',
  'Swift',
  'Java',
];

function FilterCards({
  order,
  setOrder,
  selectedTags,
  addTag,
  removeTag,
  clearTags,
}) {
  const classes = useStyles();

  const handleTags = (e) => {
    const tag = e.currentTarget.value;

    if (tag === 'All') {
      clearTags();
    } else {
      selectedTags.includes(tag) ? removeTag(tag) : addTag(tag);
    }
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.sortForm}>
        <InputLabel id="demo-simple-select-outlined-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          label="Order by"
        >
          <MenuItem value="popularity">
            <em>Popularity</em>
          </MenuItem>
          <MenuItem value={'recency'}>Recency</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={selectedTags.length ? selectedTags : 'All'}
        onChange={handleTags}
        className={classes.toggleButtonGroup}
      >
        <ToggleButton value="All" aria-label="All">
          All
        </ToggleButton>
        {defaultTags.map((tag) => (
          <ToggleButton
            value={tag}
            aria-label={tag}
            key={tag}
            className={classes.button}
          >
            {tag}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCards);
