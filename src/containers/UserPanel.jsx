import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '../components';
import { useUserPanelStyles } from './styles';

const UserPanel = ({ username, id, src }) => {
  const classes = useUserPanelStyles();

  if (!id) return null;

  return (
    <div className={classes.root}>
      <Typography color="inherit" noWrap className={classes.text}>
        {username}
      </Typography>
      <Avatar src={src}>{username[0]}</Avatar>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.users.current,
});

export default connect(mapStateToProps)(UserPanel);
