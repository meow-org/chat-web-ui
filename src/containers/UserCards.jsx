import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  getUsersServer,
  getCurrentUserServer,
  getMessagesForUser,
  getNotificationsServer,
} from '../core/actions/server';
import { useUserCardStyles } from './styles';
import { Avatar } from '../components';

const UserCards = ({
  data,
  count,
  getUsers,
  connected,
  search,
  getCurrent,
  getMessages,
  selectedId,
  getNotifications,
  notifications,
  onUserClick,
}) => {
  const classes = useUserCardStyles();
  const listRef = useRef();

  useEffect(() => {
    const scrolled = () => {
      if (!listRef.current) return;
      if (
        listRef.current.offsetHeight + listRef.current.scrollTop >=
          listRef.current.scrollHeight &&
        data.length <= count
      ) {
        getUsers({ offset: data.length - 1, search });
      }
    };
    listRef.current.addEventListener('scroll', scrolled);
    return () => {
      listRef.current.removeEventListener('scroll', scrolled);
    };
  }, [count, data.length, getUsers, search]);

  useEffect(() => {
    if (connected) {
      getUsers();
      getCurrent();
      getNotifications();
    }
  }, [connected, getCurrent, getNotifications, getUsers]);

  const handleClick = id => () => {
    getMessages({ id });
    onUserClick();
  };

  return (
    <List className={classes.root} ref={listRef}>
      {data.map(({ id, username, online, bg, img }) => (
        <>
          <ListItem
            key={`key-${id}`}
            alignItems="flex-start"
            component={Button}
            selected={selectedId === id}
            className={classes.listItem}
            onClick={handleClick(id)}
          >
            <ListItemAvatar>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                color="secondary"
                invisible={!notifications[id]}
                badgeContent={notifications[id]}
              >
                <Avatar bg={bg} src={img}>{username[0].toUpperCase()}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={username}
              secondary={
                <div className={classes.wrapper}>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {online ? (
                      <Typography component="span" className={classes.online}>
                        Online
                      </Typography>
                    ) : (
                      <Typography component="span" className={classes.offline}>
                        Offline
                      </Typography>
                    )}
                  </Typography>
                </div>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

UserCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  getUsers: PropTypes.func,
  connected: PropTypes.bool,
};

UserCards.defaultProps = {
  data: [],
  count: 0,
  getUsers: () => {},
  connected: false,
};

const mapStateToProps = state => ({
  ...state.users,
  connected: state.socket.connected,
  selectedId: state.messages.selectedUserId,
});

const mapDispatchToProps = {
  getUsers: getUsersServer,
  getCurrent: getCurrentUserServer,
  getMessages: getMessagesForUser,
  getNotifications: getNotificationsServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCards);
