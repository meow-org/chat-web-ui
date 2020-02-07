import React from 'react';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import { useSearchBarStyles } from './styles';
import { getUsersServer } from '../core/actions/server';

const SearchBar = ({ onSearchUser }) => {
  const classes = useSearchBarStyles();

  const handleSearch = throttle(onSearchUser, 300);

  const handleChange = e => handleSearch({ search: e.target.value });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </div>
  );
};

const mapDispatchToProps = {
  onSearchUser: getUsersServer,
};

export default connect(null, mapDispatchToProps)(SearchBar);
