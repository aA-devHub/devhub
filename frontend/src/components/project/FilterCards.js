import React, { useState } from 'react';
import * as COLORS from '../../colors';
import { makeStyles, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

function FilterCards() {
  const [filter, setFilter] = useState('popularity');
  const handleFilter = (e) => setFilter(e.target.value);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter}
          onChange={handleFilter}
          label="Order by"
        >
          <MenuItem value="popularity">
            <em>Popularity</em>
          </MenuItem>
          <MenuItem value={'recency'}>Recency</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button className={classes.button}>Javascript</Button>
        <Button className={classes.button}>Ruby</Button>
        <Button className={classes.button}>Cpp</Button>
        <Button className={classes.button}>Python</Button>
        <Button className={classes.button}>Golang</Button>
        <Button className={classes.button}>Swift</Button>
        <Button className={classes.button}>Java</Button>
      </div>
    </div>
  );
}

export default FilterCards;
