import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as COLORS from '../../colors';
import { addTag, removeTag, clearTags } from '../../actions/tag_actions';
import { setOrder } from '../../actions/order_actions';

const mapStateToProps = (state) => ({
  tags: state.ui.tags,
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
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginRight: '2rem',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    color: COLORS.DEVDARKBLUE,
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

function FilterCards({ order, setOrder, addTag, removeTag, clearTags, tags }) {
  // const [filter, setFilter] = useState('popularity');
  // const handleFilter = (e) => {
  //   setFilter(e.target.value);
  // };
  const classes = useStyles();

  const toggleTag = (tag) => {
    // Uncomment to allow multiple tags in filtered query
    // if (tags.includes(tag)) removeTag(tag);
    // else addTag(tag);
    clearTags();
    addTag(tag);
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
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
      {/* TODO: */}
      {/* There should be a button here to clear all the tags, or some way */}
      {/* to show which one is active */}
      <div>
        {defaultTags.map((tag, idx) => (
          <Button
            key={idx}
            className={classes.button}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCards);
