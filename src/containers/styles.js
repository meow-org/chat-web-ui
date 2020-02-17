import { makeStyles, fade } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

export const useUserCardStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  wrapper: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listItem: {
    textTransform: 'none',
  },
  inline: {
    display: 'inline',
  },
  online: {
    color: green[500],
    fontSize: 14,
  },
  offline: {
    color: grey[500],
    fontSize: 14,
  },
}));

export const useSearchBarStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const useMessageListStyles = makeStyles(() => ({
  root: {
    paddingRight: 20,
    paddingTop: 20,
    paddingLeft: 20,
    flexGrow: 1,
    display: 'flex',
    overflowY: 'auto',
    marginBottom: 2,
  },
  textHeader: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  secondTextHeader: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 13
  }
}));

export const useEditorStyles = makeStyles(() => ({
  root: {
    minHeight: 80,
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    height: '100%',
    fontSize: 16,
    border: 'none',
    padding: 20,
    flexGrow: 1,
    display: 'flex',
    outline: 'none',
    resize: 'none',
  },
  btn: {
    margin: 10,
  },
}));

export const useUserPanelStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    margin: '0 10px',
  },
  avatar: {
    margin: 10,
  },
}));
