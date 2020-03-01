import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import trim from 'lodash/trim';
import { useFilrUploaderModalStyles } from './styles';
import Request from '../core/request';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function FileUploadModal({
  children,
  onLoading,
  onFinish,
  onError,
}) {
  const [open, setOpen] = React.useState(false);
  const [stateFiles, setFiles] = React.useState([]);
  const classes = useFilrUploaderModalStyles();
  const fileUploaderRef = React.useRef();
  const textRef = React.useRef();

  const handleClickOpen = e => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.target;

    if (files) {
      Object.values(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = e => {
          stateFiles.push({ preview: e.target.result, file });
          setFiles([...stateFiles]);
        };

        reader.readAsDataURL(file);
      });
      setOpen(true);
    }
  };

  const removeFile = id => e => {
    const newState = stateFiles.filter((f, i) => i !== id);
    setFiles(newState);
  };

  const handleFileUploaderClick = () => {
    fileUploaderRef.current.click();
  };

  const clearAndClose = () => {
    textRef.current.value = '';
    setFiles([]);
    setOpen(false);
  };

  const uploadFile = async () => {
    const files = stateFiles.map(({ file }) => file);
    const text = trim(textRef.current.value);
    onLoading(true);
    try {
      const response = await Request.uploadFileMessage(files);
      const data = await response.json();
      if (response.ok) {
        onFinish(data.files, text);
        clearAndClose();
      }
    } catch (e) {
      onError(e.message);
    }
    onLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        ref={fileUploaderRef}
        multiple
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleClickOpen}
      />
      {children(handleFileUploaderClick)}
      <MuiDialog
        fullWidth
        onClose={clearAndClose}
        maxWidth="sm"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={clearAndClose}>
          Upload file
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            {stateFiles.map(({ preview }, id) => (
              <Paper className={classes.paper}>
                <IconButton
                  size="small"
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={removeFile(id)}
                >
                  <CloseIcon />
                </IconButton>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={preview} className={classes.img} />
              </Paper>
            ))}
            <Paper className={classes.centerPaper}>
              <IconButton aria-label="close" onClick={handleFileUploaderClick}>
                <Add />
              </IconButton>
            </Paper>
          </div>
          <Typography variant="h6">Add description</Typography>
          <textarea
            ref={textRef}
            className={classes.description}
            placeholder="Set message"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={uploadFile} color="primary">
            Send
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
}

FileUploadModal.defaultProps = {
  children: null,
  onLoading: () => {},
  onFinish: () => {},
  onError: () => {},
};

export default FileUploadModal;
