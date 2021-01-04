import React from 'react';
import { connect } from 'react-redux';
import {
  InputBase,
  makeStyles,
  fade,
  Button,
  Typography,
} from '@material-ui/core';

import { sendMessage } from '../../actions/message_actions';
import * as COLORS from '../../colors';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    padding: '0 30px',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  baseInput: {
    width: '100%',
    margin: '0 2px',
    verticalAlign: 'center',
    fontSize: 16,
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& > input': {
      borderRadius: 4,
      backgroundColor: '#f1f1f1',
      border: '1px solid #ced4da',
      fontSize: 16,
      fontWeight: 100,
      height: '2rempx',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(COLORS.DEVBLUE, 0.25)} 0 0 0 0.2rem`,
        borderColor: COLORS.DEVBLUE,
      },
    },
  },
}));

const mapStateToProps = (state, _ownProps) => ({
  user: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessage(data)),
});

const MessageInput = ({ receiver, sendMessage }) => {
  const classes = useStyles();
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Body: ', e.currentTarget.value);
    sendMessage({ body: message, to: receiver._id });
    setMessage('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={classes.inputContainer}>
      <InputBase
        /* multiline={true} */
        placeholder="Aa…"
        rows={2}
        style={{ padding: '0' }}
        className={classes.baseInput}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <div style={{ width: 20 }}></div>
      <Button
        /* onClick={(e) => handleSubmit(e)} */
        variant="contained"
        type="submit"
        style={{
          padding: '8px',
          backgroundColor: COLORS.DEVBLUE,
          color: 'white',
        }}
      >
        <Typography>Send</Typography>
      </Button>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
