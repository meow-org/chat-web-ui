import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import trim from 'lodash/trim';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons';
import { useEditorStyles } from './styles';
import { sendMessageServer } from '../core/actions/server';

const Editor = ({ selectedId, sendMessage }) => {
  const classes = useEditorStyles();
  const textRef = useRef();

  useEffect(() => {
    if (selectedId) {
      textRef.current.focus();
      textRef.current.value = '';
    }
  }, [selectedId]);

  const handleClick = () => {
    const text = textRef.current.value;
    if (trim(text)) {
      sendMessage({ id: selectedId, text });
      textRef.current.value = '';
    }
  };

  if (!selectedId) return null;

  return (
    <Paper className={classes.root}>
      <textarea
        className={classes.text}
        placeholder="Set message"
        ref={textRef}
      />
      <div className={classes.btn}>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={handleClick}
        >
          <Send />
        </IconButton>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  selectedId: state.messages.selectedUserId,
});

const mapDispatchToProps = {
  sendMessage: sendMessageServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
