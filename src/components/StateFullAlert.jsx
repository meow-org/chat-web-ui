import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const StateFullAlert = ({ text, severity }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [text]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Collapse>
    </div>
  );
};

StateFullAlert.propTypes = {
  text: PropTypes.string,
  severity: PropTypes.string,
};

StateFullAlert.defaultProps = {
  text: '',
  severity: 'error',
};

export default StateFullAlert;
