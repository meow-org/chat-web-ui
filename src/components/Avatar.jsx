import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BaseAvatar from '@material-ui/core/Avatar';

import {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
} from '@material-ui/core/colors';

const colors = {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
};

export const colorKeys = Object.keys(colors);

export const useStyles = makeStyles(theme => ({
  ...colorKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        color: theme.palette.getContrastText(colors[key][400]),
        backgroundColor: colors[key][400]
      },
    }),
    {},
  ),
}));

const Avatar = ({ children, src, bg, onClick }) => {
  const classes = useStyles();
  return (
    <BaseAvatar
      src={src}
      className={classes[bg]}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </BaseAvatar>
  );
};

Avatar.propTypes = {
  children: PropTypes.node,
  src: PropTypes.string,
  bg: PropTypes.string,
  onClick: PropTypes.func,
};

Avatar.defaultProps = {
  onClick: () => {}
};

export default Avatar;
