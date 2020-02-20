import React, {useRef} from 'react';
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
import { useFilrUploaderModalStyles } from './styles';
import Request from '../core/request';
import trim from "lodash/trim";

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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

export default function CustomizedDialogs({ children, onLoading, onFinish, onError }) {
  const [open, setOpen] = React.useState(false);
  const [stateFiles, setFiles] = React.useState([]);
  const classes = useFilrUploaderModalStyles();
  const fileUploaderRef = React.useRef();
  const textRef = React.useRef();


  const handleClickOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files;

    if(files){
      Object.values(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log(e.target.result);
          stateFiles.push({ preview: e.target.result, file: file });
          setFiles([...stateFiles])
        };

        reader.readAsDataURL(file)
      });
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const removeFile = id => e => {
    const newState = stateFiles.filter((f, i) => i !== id);
    setFiles(newState);
  };

  const handleFileUploaderClick = () => {
    fileUploaderRef.current.click();
  };

  const clear = () => {
    textRef.current.value = '';
    setFiles([]);
  };

  const uploadFile = async () => {
    const files = stateFiles.map(({ file }) => file);
    const text = trim(textRef.current.value);
    onLoading(true);
    try {
      const response = await Request.uploadFileMessage(files);
      const data = await response.json();
      if (response.ok) {
        onFinish(data.urls, text);
        clear()
      }
    } catch (e) {
      onError(e.message)
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
        style={{display: "none"}}
        onChange={handleClickOpen}
      />
      {children(handleFileUploaderClick)}
      <MuiDialog fullWidth onClose={handleClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload file
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            {
              stateFiles.map(({ preview }, id) => (
                <Paper className={classes.paper}>
                  <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={removeFile(id)}>
                    <CloseIcon />
                  </IconButton>
                  <img src={preview} className={classes.img}/>
                </Paper>
              ))
            }
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
            placeholder="Set message"/>
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
