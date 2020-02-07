import React from 'react';
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
        backgroundColor: colors[key][400],
      },
    }),
    {},
  ),
}));

const Avatar = ({ children, src, bg }) => {
  const classes = useStyles();
  return (
    <BaseAvatar src={src} className={classes[bg]}>
      {children}
    </BaseAvatar>
  );
};

export default Avatar;
