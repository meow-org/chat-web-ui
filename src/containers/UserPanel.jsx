import React, { useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '../components';
import Profile from './Profile';
import { useUserPanelStyles } from './styles';
import {useDataAPI} from "../core/hooks";
import Request from "../core/request";
import history from "../core/history";
import { URLS } from '../conf';

const ITEM_HEIGHT = 48;

const UserPanel = ({ username, id, img }) => {
  const classes = useUserPanelStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [_, requestLogout] = useDataAPI(Request.logout);
  const open = Boolean(anchorEl);
  const [openProfile, setProfileOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = async () => {
    await requestLogout();
    setAnchorEl(null);
    history.push(URLS.SIGN_IN)
  };

  const handleOpenProfile = () => {
    setProfileOpen(true);
    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  if (!id) return null;

  return (
    <div className={classes.root}>
      <Profile currentUserName = {username} open={openProfile} onClose={handleCloseProfile} />
      <Typography color="inherit" noWrap className={classes.text}>
        {username}
      </Typography>
      <Avatar  onClick={handleClick} src={img}>{username[0]}</Avatar>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem key='profile' onClick={handleOpenProfile}>
          Profile
        </MenuItem>
        <MenuItem key='logout' onClick={handleClickLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.users.current,
});

export default connect(mapStateToProps)(UserPanel);
