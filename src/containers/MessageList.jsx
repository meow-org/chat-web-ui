import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useMessageListStyles } from './styles';
import { Avatar } from '../components';

const MessagesList = ({ data, users, selectedUserId }) => {
  const classes = useMessageListStyles();
  const listRef = useRef();
  const [isBottom, setBottomState] = useState(false);

  const scrollIsBottom = () => {
    const { offsetHeight, scrollTop, scrollHeight } = listRef.current;
    return offsetHeight + scrollTop >= scrollHeight;
  };

  const scrolledBottom = () => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  useEffect(() => {
    if (isBottom) {
      scrolledBottom();
    }
  }, [data, isBottom]);

  useEffect(() => {
    scrolledBottom();
    setBottomState(true);
  }, [selectedUserId]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const isBottomElem = scrollIsBottom();
      if (isBottomElem !== isBottom) {
        setBottomState(isBottomElem);
      }
    }, 300);
    listRef.current.addEventListener('scroll', handleScroll);
    return () => {
      listRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [isBottom]);

  return (
    <Paper className={classes.root} ref={listRef}>
      <List>
        {data &&
          // eslint-disable-next-line camelcase
          data.map(({ text, user_from_id }) => {
            const user = users[user_from_id];
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar bg={user.bg} src={user.src}>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={text} />
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
};

MessagesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.objectOf(PropTypes.any),
};

MessagesList.defaultProps = {
  data: [],
  users: null,
};

const mapStateToProps = state => ({
  ...state.messages,
});

export default connect(mapStateToProps)(MessagesList);
